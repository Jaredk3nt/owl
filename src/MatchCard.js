import React, {
    Component
} from 'react';
import './App.css';
import GameList from './GameList.js';

export default class MatchCard extends Component {
    render() {
        return (
            <div className="match-card">
                <div className="match-header">
                    <div className="team-header header-left" style={ {backgroundColor: '#' + this.props.match.competitors[0].primaryColor}}>
                        <h1>{this.props.match.competitors[0].name}</h1>
                        <div className="header-score">{this.props.match.scores[0].value}</div>
                    </div>
                    <div className="team-header header-right" style={ {backgroundColor: '#' + this.props.match.competitors[1].primaryColor}}>
                        <div className="header-score">{this.props.match.scores[1].value}</div>
                        <h1>{this.props.match.competitors[1].name}</h1>
                    </div>
                </div>
                <GameList games={this.props.match.games} team0={this.props.match.competitors[0]} team1={this.props.match.competitors[1]}/>
            </div>
        )
    }
}