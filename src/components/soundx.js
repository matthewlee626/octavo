import React from 'react';
import Sound from 'react-sound';
import "../css/sound.css"

const possibleIntervals = [12, 13, 14, 15, 16, 17, 18]

class SoundX extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          url: this.props.url,
          playing: this.props.playing,
          loop: this.props.loop,
          speed: this.props.speed,
          isPlaying: this.props.playing === Sound.status.PLAYING ? true : false,
          buttonValue: this.props.isPlaying ? "Pause" : "Play",
          interval: 12,
          score: this.props.score,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.onScoreChange(value);
    }

    render(){
        const score = this.props.score;
        return(
            <div class="soundcontainer">
                <div>
                    <h3>
                        Score: {score}
                    </h3>  
                </div>
                <div>
                    <button 
                        onClick = {() => this.state.isPlaying ? 
                        this.setState({playing: Sound.status.PAUSED, isPlaying: false, buttonValue: "Play"}) : 
                        this.setState({playing: Sound.status.PLAYING, isPlaying: true, buttonValue: "Pause"})}
                    >
                    {this.state.buttonValue}
                    </button>
                </div>
                <div>
                    <button 
                        onClick = {() => this.handleChange(score + 1)}
                    >
                    Change Score!
                    </button>
                </div>
                <div>
                    <button
                        onClick = {() => 
                        this.setState({
                            interval: possibleIntervals[Math.floor(Math.random()*possibleIntervals.length)],
                            url: "https://raw.githubusercontent.com/matthewlee626/listen/master/src/music/" + this.state.interval + ".mp3",
                        })
                        }
                    >
                    New Interval!
                    </button>
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