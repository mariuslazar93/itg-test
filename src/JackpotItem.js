import React, { Component } from 'react';

class JackpotItem extends Component{
  render(){
    return (
      <li className="jackpot-item">
        <a className="jackpot-link" href={this.props.api.gamePageURL}>
          <img className="jackpot-img" src={this.props.api.gameImage} alt={this.props.api.gameName} />
        </a>
        <div>
          <h2 className="jackpot-title">{this.props.api.gameName}</h2>
          <button onClick={this.props.onClick}>
            <span className="jackpot-value hidden">&pound;{this.props.api.gameJackpot}</span>
            <span className="jackpot-show">Show Jackpot</span>
          </button>
        </div>
      </li>
    );
  }
}

export default JackpotItem;
