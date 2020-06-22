import React from 'react';
import Header1 from './components/Header1';
import Switches1 from './components/Switches1';
import SelectSwitch1 from './components/SelectSwitch1';

function App1() {

  const title = 'GE swtich stuff';

  return (
    <div >
      <Header1 title={title} />
      <Switches1 />
      <SelectSwitch1 />
    </div>
  );
}

export default App1;