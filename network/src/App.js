import React, { useState } from 'react';
import Header from './components/Header';
import Switches from './components/Switches';
import SelectSwitch from './components/SelectSwitch';

function App() {

  // const title = 'GE swtich stuff';

  const [title, setTitle] = useState('GE Company')

  return (<div >
    <Header title={title}
      setTitle={setTitle} /> <Switches />
    <SelectSwitch />
  </div>
  );
}

export default App;