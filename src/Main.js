import React from 'react';
import './App.css';

import Header from './components/header.js'

import Sound from 'react-sound';
import SoundX from "./components/soundx.js"

import Footer from './components/footer.js';

const pStyle = {
  color: 'black',
};

class Main extends React.Component{
  constructor(props) {
    super(props);
    //this.handleScoreChange = this.handleScoreChange.bind(this);
    this.state = {
      playing: Sound.status.PAUSED,
      renderWhich: 0,  /* 0 for the default, 1 for about*/ 
      score: 0,
    };
    this.handleScoreChange = this.handleScoreChange.bind(this);
  }

  handleScoreChange(newScore){
    this.setState({score: newScore});
  }

  returnMain(){
    const gameScore = this.state.score;

    return(      
      <div>
        <Header></Header>
        <div className="App">
          <header className="App-header">
            <p style={pStyle}>
              What interval is this?
            </p>        
            <SoundX 
                url= {"https://raw.githubusercontent.com/matthewlee626/listen/master/src/music/12.mp3"}
                playing = {this.state.playing} 
                loop={true} 
                speed={1}
                score={gameScore}
                onScoreChange={this.handleScoreChange}
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

export default Main;
