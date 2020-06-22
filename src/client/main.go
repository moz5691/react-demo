package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"reflect"
	"runtime"
	"strings"

	"com.oauth.client/model"
)

var config = struct {
	appID               string
	appSecret           string
	authURL             string
	logout              string
	afterLogoutRedirect string
	authCodeCallback    string
	tokenEndpoint       string
}{
	appID:               "demoApp",
	appSecret:           "990063ae-188c-4a34-aefc-d59de53c7120",
	authURL:             "http://localhost:8088/auth/realms/OAuthDemo/protocol/openid-connect/auth",
	logout:              "http://localhost:8088/auth/realms/OAuthDemo/protocol/openid-connect/logout",
	afterLogoutRedirect: "http://localhost:8080",
	authCodeCallback:    "http://localhost:8080/authCodeRedirect",
	tokenEndpoint:       "http://localhost:8088/auth/realms/OAuthDemo/protocol/openid-connect/token",
}

//
var t = template.Must(template.ParseFiles("template/index.html"))

//AppVar: global variable
type AppVar struct {
	AuthCode     string
	SessionState string
	AccessToken  string
	RefreshToken string
	Scope        string
	ExpiresIn    int
}

var appVar = AppVar{}

func init() {
	log.SetFlags(log.Ltime)
}

func main() {
	fmt.Println("hello")
	http.HandleFunc("/", enableLog(home))
	http.HandleFunc("/login", enableLog(login))
	http.HandleFunc("/exchangeToken", enableLog(exchangeToken))
	http.HandleFunc("/logout", enableLog(logout))
	http.HandleFunc("/authCodeRedirect", enableLog(authCodeRedirect))
	http.ListenAndServe(":8080", nil)
}

func enableLog(handler func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		handlerName := runtime.FuncForPC(reflect.ValueOf(handler).Pointer()).Name()
		log.Println("--->" + handlerName)
		log.SetPrefix(handlerName + " ")
		log.Printf("req :  %+v\n", r.RequestURI)
		handler(w, r)
		log.Println("<---" + handlerName)
	}
}

func home(w http.ResponseWriter, r *http.Request) {
	t.Execute(w, appVar)
}

func login(w http.ResponseWriter, r *http.Request) {
	// t := template.Must(template.ParseFiles("template/index.html"))
	// t.Execute(w, nil)
	// // fmt.Fprintf(w, "Hello")
	req, err := http.NewRequest("GET", config.authURL, nil)
	if err != nil {
		log.Print(err)
		return
	}
	//?session_state=bf6fbe3d-82e3-480a-8332-c9997b132f0f&code=e63966ff-f78a-403d-976a-9bf2278dacf2.bf6fbe3d-82e3-480a-8332-c9997b132f0f.71245e2d-ae24-43a5-9dca-03e356ddea12
	qs := url.Values{}
	qs.Add("state", "123456")
	qs.Add("client_id", config.appID)
	qs.Add("response_type", "code")
	qs.Add("redirect_uri", config.authCodeCallback)

	// req.URL.RawQuery = "client_id=demoApp&response_type=code"
	req.URL.RawQuery = qs.Encode()
	http.Redirect(w, r, req.URL.String(), http.StatusFound)
}

func exchangeToken(w http.ResponseWriter, r *http.Request) {
	form := url.Values{}
	form.Add("grant_type", "authorization_code")
	form.Add("code", appVar.AuthCode)
	form.Add("redirect_uri", config.authCodeCallback)
	form.Add("client_id", config.appID)

	req, err := http.NewRequest("POST", config.tokenEndpoint, strings.NewReader(form.Encode()))

	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	if err != nil {
		log.Print(err)
		return
	}

	req.SetBasicAuth(config.appID, config.appSecret)

	c := http.Client{}
	res, err := c.Do(req)

	if err != nil {
		log.Println("Could not get access token", err)
		return
	}

	byteBody, err := ioutil.ReadAll(res.Body)
	defer res.Body.Close()
	if err != nil {
		log.Println(err)
		return
	}

	accessTokenResponse := &model.AccessTokenResponse{}
	json.Unmarshal(byteBody, accessTokenResponse)

	appVar.AccessToken = accessTokenResponse.AccessToken
	appVar.RefreshToken = accessTokenResponse.RefreshToken
	appVar.Scope = accessTokenResponse.Scope
	appVar.ExpiresIn = accessTokenResponse.ExpiresIn

	// appVar.AccessToken = string(byteBody)
	log.Println(string(byteBody))
	t.Execute(w, appVar)
}

func authCodeRedirect(w http.ResponseWriter, r *http.Request) {
	// fmt.Printf("Request queries : %v", r.URL.Query())
	// fmt.Fprintf(w, "handling auth code redirection")
	appVar.AuthCode = r.URL.Query().Get("code")
	appVar.SessionState = r.URL.Query().Get("session_state")
	r.URL.RawQuery = ""
	fmt.Printf("Request queries : %+v\n", appVar)

	// t.Execute(w, nil)
	http.Redirect(w, r, "http://localhost:8080", http.StatusFound)
}

// http://localhost:8080/authCodeRedirect?state=123456&session_state=bf6fbe3d-82e3-480a-8332-c9997b132f0f&code=582e5bc7-c323-496e-942e-77d0a3e6c0be.bf6fbe3d-82e3-480a-8332-c9997b132f0f.71245e2d-ae24-43a5-9dca-03e356ddea12

func logout(w http.ResponseWriter, r *http.Request) {
	q := url.Values{}
	q.Add("redirect_uri", config.afterLogoutRedirect)

	logoutURL, err := url.Parse(config.logout)

	if err != nil {
		log.Println(err)
	}
	logoutURL.RawQuery = q.Encode()
	appVar = AppVar{}

	http.Redirect(w, r, logoutURL.String(), http.StatusFound)
}
