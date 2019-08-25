import React from 'react';
import './App.css';
import Header from './components/header.js'
import Sound from 'react-sound';

function App() {
  return (
    <div>
      <Header></Header>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Sound
            url="12.mp3"
            playStatus={Sound.status.PLAYING}
          />
        </header>
      </div>
    </div>
  );
}

export default App;
