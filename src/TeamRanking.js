import React, {
    Component
} from 'react';
import './Stats.css';

export default class TeamRanking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maxWins: 0
        }

        
    }

    componentDidMount() {
        this.calculateRankings();
    }

    calculateRankings() {
        let _maxWins = this.state.maxWins;
        let rankingArr = []
        Object.entries(this.props.teams).forEach( ([key, team]) => {
            if ( team.wins > _maxWins) {
                _maxWins = team.wins;
            }
            let index = 0
            while (index < rankingArr.length) {
                let currTeam = rankingArr[index];
                if (team.wins > currTeam.wins) {
                    break;
                } else if (team.wins === currTeam.wins) {
                    if (team.mapDiff > currTeam.mapDiff) {
                        break;
                    }
                }
                index++;
            }
            rankingArr.splice(index, 0, team)
        });
        // this.setState({
        //     maxWins: _maxWins
        // });
        console.log(rankingArr);
        return rankingArr;
    }

    render() {
        return (
            <div className="team-ranking">
                <ul>
                    <li className="ranking-key ranked-team">
                        <div className="team-info">
                            <div className="key-title rank-key">Rank</div>
                            <div className="key-title team-key">Team</div>
                        </div>
                        <div className="team-stats">
                            <div className="key-title win-key">Wins</div>
                            <div className="key-title diff-key">Map Diff</div>
                        </div>
                    </li>
                    {
                        this.calculateRankings().map( (team, index) =>
                            <li className="ranked-team" key={team.id}>
                                <div className="team-info">
                                    <div className="rank">{index + 1}</div>
                                    <img src={team.icon}/>
                                    <div className="team-name">{team.name}</div>
                                </div>
                                <div className="team-stats">
                                    <div className="team-wins">{team.wins}</div>
                                    <div className="team-diff">{team.mapDiff}</div>
                                </div>
                                
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}