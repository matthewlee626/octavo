import React from 'react';
import './App.css';
import "./css/sound.css"

//import Header from './components/header.js'

import Sound from 'react-sound';
import SoundX from "./components/soundx.js"

//import Footer from './components/footer.js';

import firebase from "./firebase.js"

class Main extends React.Component{
  constructor(props) {
    super(props);
    //this.handleScoreChange = this.handleScoreChange.bind(this);
    this.state = {
      playing: Sound.status.PLAYING,
      renderWhich: 0,  /* 0 for the default, 1 for about*/ 
      score: 0,
      username: '',
      items: [],
    };
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleScoreChange(newScore){
    this.setState({score: newScore});
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const d = new Date();
    let time = d.getTime()
    const item = {
      score: this.state.score,
      username: this.state.username,
      date: time,
    }
    itemsRef.push(item);
    this.setState({
      score: 0,
      username: ''
    });
    window.location.reload();
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      // eslint-disable-next-line
      for (let item in items) {
        newState.push({
          id: item,
          score: items[item].score,
          username: items[item].username
        });
      }
      newState.sort(function(first, second) {
        return second.score - first.score;
       });
      this.setState({
        items: newState
      });
    });
  }

  returnMain(){
    const gameScore = this.state.score;

    return(      
      <div>
        <div className='app'>
          <header>
              <div className='wrapper'>
                <h1>Octavo</h1>
              </div>
          </header>
          <div className='container'>
            <div className='sound'>
              <SoundX
                  //url= {"https://raw.githubusercontent.com/matthewlee626/listen/master/src/music/12.mp3"}
                  playing = {this.state.playing} 
                  loop={true} 
                  speed={1}
                  score={gameScore}
                  onScoreChange={this.handleScoreChange}
              >
              </SoundX>
            </div>
            <section className='add-item'>
              <h3>Submit your score!</h3>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                  <button>Add Score</button>
                </form>
            </section>
            <section className="leaderboard">
              <h2>Leaderboard</h2>
              <ul className='list'>
                    <li key={"header"}>
                      <h3>Name</h3>
                      <h3 className="score">Score</h3>
                    </li>
                    {this.state.items.map((item) => {
                      return (
                        <li key={item.id}>
                          <p>{item.username === "" ? 'Anonymous' : item.username}</p>
                          <p>{item.score}</p>
                        </li>
                      )
                    })}
              </ul>
            </section>
          </div>
          <footer>
            <div className='wrapper'>
              <p>matthewlee.xyz © 2020</p>
            </div>
          </footer>
        </div>
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
