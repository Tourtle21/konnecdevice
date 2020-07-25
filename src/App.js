import React from 'react';
// import Logo from './assets/logo.jpg';
import './App.scss';
import './reset.css';

import Nav from './Components/Nav/Nav';
import routes from './routes';
import Messages from './Components/Messages/Messages';

function App() {
  return (
    <div className='app'>
      <Nav />
      <div className='display'>
        <Messages />
        {routes}
      </div>
    </div>
  );
}

export default App;
