import React from 'react';
import YouTube from 'react-youtube';

class Player extends React.Component {
    _onReady(event) {
        event.target.pauseVideo();
    }

    render() {
        const opts = {
        height: '400',
        width: '700',
        playerVars: {
            autoplay: 1,
        },
        };
        
    return <YouTube videoId={this.props.videoId} onEnd={this.props.next} opts={opts} onReady={this._onReady} onPlay={this.props.mixpanel}/>;
  }
}

export default Player;
