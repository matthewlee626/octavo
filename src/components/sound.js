import React from 'react';
import Sound from 'react-sound';
import "../css/sound.css"

class SoundX extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          url: this.props.url,
          playing: this.props.playing,
          loop: this.props.loop,
          speed: this.props.speed,
          isPlaying: this.props.playing === Sound.status.PLAYING ? true : false,
          buttonValue: this.props.isPlaying ? "Pause" : "Play"
        };
    }

    render(){
        return(
            <div>
                <button className = "special"
                    onClick = {() => this.state.isPlaying ? 
                    this.setState({playing: Sound.status.PAUSED, isPlaying: false, buttonValue: "Play"}) : 
                    this.setState({playing: Sound.status.PLAYING, isPlaying: true, buttonValue: "Pause"})}
                >
                {this.state.buttonValue}
                </button>
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