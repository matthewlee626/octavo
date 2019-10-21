import React from 'react';
import Sound from 'react-sound';
import "../css/sound.css"

const key = {
    0: "C4",
    1: "C4#",
    2: "D4",
    3: "D4#",
    4: "E4",
    5: "F4",
    6: "F4#",
    7: "G4",
    8: "G4#",
    9: "A4",
    10: "A4#",
    11: "B4",
    12: "C5",
    13: "C5#",
    14: "D5"
}

const availible = [0,2,4,5,7,9,11,12,14]

const intervals ={
    0: "P1",
    1: "m2",
    2: "M2",
    3: "m3",
    4: "M3",
    5: "P4",
    6: "d5",
    7: "P5",
    8: "m6",
    9: "M6",
    10: "m7",
    11: "M7",
    12: "P8",
    13: "m9",
    14: "M9",
}

const options = 6;

let candidates = Object.values(intervals);

class SoundX extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          url: "https://raw.githubusercontent.com/matthewlee626/Music/master/octavo/C4C4.mp3",
          playing: this.props.playing,
          loop: this.props.loop,
          speed: this.props.speed,
          isPlaying: this.props.playing === Sound.status.PLAYING ? true : false,
          buttonValue: this.props.isPlaying ? "Pause" : "Play",
          first: 0,
          second: 0,
          interval: 0,
          score: this.props.score,
          correct: "Start!",
        };
        this.handleChange = this.handleChange.bind(this);
        //this.changeInterval = this.changeInterval.bind(this);
        this.returnbuttons = this.returnbuttons.bind(this);
    }

    handleChange(value, isCorrect) {
        if(isCorrect){
            this.setState({correct: "Correct!"})
        }else{
            this.setState({correct: "Incorrect!"})
        }
        this.props.onScoreChange(value);
        candidates = Object.values(intervals);
        console.log("Hello!");
        let floor = availible[Math.floor(Math.random()*availible.length)];
        let ceiling = availible[Math.floor(Math.random()*availible.length)];
        this.setState({
            first: floor,
            second: ceiling,
            interval: Math.abs(floor-ceiling),
            url: "https://raw.githubusercontent.com/matthewlee626/Music/master/octavo/" + key[floor] + key[ceiling] + ".mp3",
        })
    }

    returnbuttons(amount, correct){
        let toAdd = [];
        if (correct !== 0) candidates.splice(this.state.interval, 1);
        let incorrect = "";
        for(let i = 0; i < amount; i++){
            incorrect = Math.floor(Math.random()*candidates.length);
            let toDisplay = candidates[incorrect];
            candidates.splice(incorrect, 1);
            toAdd.push(
                <button 
                    onClick = {() => this.handleChange(this.props.score, false)}
                    className = "option"
                >{toDisplay}</button>
            )
        }
        return toAdd;
    }

    render(){
        const score = this.props.score;
        const intervalToDisplay = intervals[this.state.interval];
        const location = Math.floor(Math.random()*(options));
        return(
            <div className="soundcontainer">
                <div>
                    <h2>
                        Score: {score}
                    </h2>  
                </div>
                <div>
                    <h4>
                        {this.state.correct}
                    </h4>  
                </div>
                <div>
                    {this.returnbuttons(location, intervalToDisplay)}
                    <button 
                        onClick = {() => this.handleChange(score + 1, true)}
                        className = "option"
                    >
                    {intervalToDisplay}
                    </button>
                    {this.returnbuttons(options-location, 0)}
                </div>
                <Sound
                    url= {this.state.url}
                    playStatus={this.state.playing}
                    loop={this.state.loop}
                    playbackRate={this.state.speed}
                />
            </div>
        )
    }
}

export default SoundX;