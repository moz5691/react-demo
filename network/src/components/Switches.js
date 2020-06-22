import React, { useState, useEffect } from 'react';
import useFetch from 'use-http'

const Switches = () => {

  const [switches, setSwitches] = useState();

  const { get, post, response, loading, error } = useFetch('http://localhost:3333');

  useEffect(() => { initializeSwitches() }, [])

  async function initializeSwitches() {
    const initialSwitches = await get('/switches')
    if (response.ok) {
      setSwitches(initialSwitches)
    }
  }

  return (

    <table style={{ margin: '20px' }}>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Port Type</th>
        <th>Eanbled</th>
        <th>Link</th>
        {/* <th>Edit</th> */}
      </tr>
      {switches ?
        switches.map((sw, i) => <tr key={i}>
          <td>{sw.name}</td>
          <td>{sw.description}</td>
          <td>{sw.portType}</td>
          <td>{sw.enabled ? 'True' : 'False'}</td>
          <td>{sw.link}</td>
          {/* <td>Edit button</td> */}
        </tr>)
        : null}
    </table>


  )
}

export default Switches;