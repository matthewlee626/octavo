import React from 'react';
import './App.css';
import Header from './components/header.js'

import Sound from 'react-sound';
import SoundX from "./components/sound.js"

import Footer from './components/footer.js';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      playing: Sound.status.PAUSED,
      renderWhich: 0  /* 0 for the default, 1 for about*/ 
    };
  }

  returnMain(){
    return(      
      <div>
        <Header></Header>
        <div className="App">
          <header className="App-header">
            <p>
              What interval is this?
            </p>          
            <SoundX 
                url= "https://raw.githubusercontent.com/matthewlee626/listen/master/src/music/12.mp3?token=AEU5WHQ46M4HVVZSENOSQLK5NN2SS"
                playing = {this.state.playing} 
                loop={true} 
                speed={1}
              >
            </SoundX>
          </header>
        </div>
        <Footer></Footer>
      </div>
    )
  }

  render(){      
    if (this.state.renderWhich === 0){
      return (
        this.returnMain()
      );
    }
  }
}

export default App;
