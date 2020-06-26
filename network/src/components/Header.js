import React from 'react';

const Header = ({
  title,
  style,
  setTitle
}) => {

  return (<div style={style} >
    <h2> Switch Info: {title} </h2>
    <button onClick={() => setTitle('GENERAL ELECTRIC')} >
      Click to change title </button> </div>

  )
}

export default Header;