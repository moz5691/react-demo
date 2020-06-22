import React from 'react';
import Header from './components/Header';
import Switches from './components/Switches';
import SelectSwitch from './components/SelectSwitch';

function App() {

  const title = 'GE swtich stuff';

  return (
    <div >
      <Header title={title} />
      <Switches />
      <SelectSwitch />
    </div>
  );
}

export default App;