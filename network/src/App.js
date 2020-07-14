import React, { useState } from 'react';
import Header from './components/Header';
import Switches from './components/Switches';
import SelectSwitch from './components/SelectSwitch';

function App() {

  // const title = 'GE swtich stuff !!!!!';

  const subtitle = "this is sub title."

  const [title, setTitle] = useState('GE Company')


  const styleHeader = { color: "red" };

  return (
    <div >
      <Header title={title} subtitle={subtitle} style={styleHeader}
        setTitle={setTitle}
      />
      <Switches />
      <SelectSwitch />
    </div>
  );
}

export default App;

{/* <Header title={title}
      setTitle={setTitle} style={style} />  */}