import React from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import Data from "../Data";

const Dashboard = () => {

  const data = Data;

  let history = useHistory();

  function routeChange() {
    let path = `/`;
    history.push(path)
  }

  return (
    <div style={{ margin: 20 }}>
      <h1>Dashboard...</h1>
      {data.map((d, i) => <Link key={i} to={`/device/${d.id}`}><h3 style={{ color: d.color }}
      >{d.title} --- </h3></Link>)}
      <button onClick={routeChange}>Go Home</button>
    </div>
  )
}

export default Dashboard;