import React from 'react';

const Header = ({ title, style }) => {
  return (
    <div style={style}>
      <h2>Switch Info: {title}</h2>
    </div>

  )
}

export default Header;