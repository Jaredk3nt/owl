import React, {
    Component
} from 'react';
import './Match.css';

export default class MatchCard extends Component {

    mapName(map) {
        let nameArr = map.split('');
        nameArr = nameArr.map( (letter) => {
            if (letter === '-') {
                return ' ';
            } else {
                return letter.toUpperCase();
            }
        })
        return nameArr.join('');
    }

    gameList() {
        const games = this.props.games;
        const team0 = this.props.team0;
        const team1 = this.props.team1;
        const listItems = games.map((game) => {
            return (
                <li key={game.id} className="game-item">
                    <div className="game-team-score">
                        <div className="game-team-id team-left">
                            <img src={team0.icon} alt={team0.name} className="team-icon"/>
                            <p>{team0.abbreviatedName}</p>
                        </div>
                        <h4>{game.points ? game.points[0] : '-'}</h4>
                    </div>
                    <div className="game-map">
                        <h3>{ this.mapName(game.attributes.map) }</h3>
                    </div>
                    <div className="game-team-score">
                        <h4>{game.points ? game.points[1] : '-'}</h4>
                        <div className="game-team-id team-right">
                            <p>{team1.abbreviatedName}</p>
                            <img src={team1.icon} alt={team1.name} className="team-icon"/>
                        </div>
                    </div>
                </li>
            )
        });
        return (
            <ul>{listItems}</ul>
        );
    }

    render() {
        return (
            <div className="game-list">
                { this.gameList() }
            </div>
        )
    }
}
