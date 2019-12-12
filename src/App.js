import React from 'react';
import Routes from './utils/routes';
import Welcome from './pages/Welcome';

const App = () => {
  return (
    <div>
      <Routes>
        <Welcome />
      </Routes>
    </div>
  )
}

export default App;