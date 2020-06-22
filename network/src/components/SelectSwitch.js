import React, {
  useState,
  useEffect
} from 'react';
import useFetch from 'use-http'

const SelectSwitch = () => {

  const [term, setTerm] = useState('');
  const [switch1, setSwitch1] = useState(null);

  const {
    get,
    post,
    response,
    loading,
    error
  } = useFetch('http://localhost:3333');

  async function findSwitch() {
    const foundSwitch = await get(`/switches/?name=${term}`)
    if (response.ok) {
      setSwitch1(foundSwitch)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    findSwitch();
    setTerm('');
  }

  return (<div style={{ margin: "20px" }} >
    <form onSubmit={handleSubmit} >
      <h3> Enter name of switch </h3>
      <input type='text' value={term}
        onChange={
          (e) => setTerm(e.target.value)
        } />
    </form>
    <div> {
      switch1 ?
        <div >
          <p> ID : {switch1[0].id} </p>
          <p> Name: {switch1[0].name} </p>
          <p> Description: {switch1[0].description} </p>
          <p> PortType: {switch1[0].portType} </p>
          <p > Enabled: {switch1[0].enabled ? 'True' : 'False'} </p>
          <p> Link: {switch1[0].link} </p>
        </div> : null
    } </div>

  </div>

  )
}

export default SelectSwitch;