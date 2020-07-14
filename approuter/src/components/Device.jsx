import React from 'react';
import { useParams, useHistory } from 'react-router-dom';


const Device = () => {

  let { id } = useParams();

  let history = useHistory();

  function routeChange() {
    let path = `/dashboard`;
    history.push(path)
  }

  return (
    <div style={{ margin: 20 }}>
      <h1>Device Board</h1>
      <h2>Clicked ID is {id}</h2>
      <p>Using ID = {id},  API request to get more detail info.</p>
      <button onClick={routeChange}>Go to Dashboard</button>
    </div>

  )
}

export default Device;