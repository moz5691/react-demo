import React from 'react';

const Header = ({ subtitle, title, style, setTitle }) => {
  return (
    <div style={style}>
      <h2> Switch Info !!! {title}</h2>
      <h3> Switch Info !!! {subtitle}</h3>
      <button onClick={() => setTitle('New title')}>Title change</button>
    </div>
  )
}




export default Header;


// const Header = ({ title, style, setTitle }) => {

//   return (<div style={style} >
//     <h2> Switch Info: {title} </h2>
//     <button onClick={() => setTitle('GENERAL ELECTRIC')} >
//       Click to change title </button> </div>

//   )
// }
