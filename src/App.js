import React, {
    Component
} from 'react';
import './App.css';
import MatchCard from './MatchCard.js';
import TeamRanking from './TeamRanking.js';

const api = "https://api.overwatchleague.com/"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stages: [],
            stage: 0,
            statsArr: []
        }

        this.setStage = this.setStage.bind(this);
    }

    componentDidMount() {
        this.fetchMatches();
    }

    fetchMatches() {
        fetch(api + "schedule")
            .then( res => res.json() )
            .then( (res) => {
                    this.setState({
                        stages: this.state.stages.concat(res.data.stages),
                        statsArr: new Array(res.data.stages.length)
                    });
                    this.runStats();
                },
                (error) => {
                    console.log("\nerror\n")
                    console.log(error);
                }
            );
    };

    runStats() {
        let _statsArr = this.state.statsArr;
        this.state.stages.forEach( (stage) => {
           
            _statsArr[stage.id] = {
                stageName: stage.name,
                teams: {}
            }

            let stageStats = _statsArr[stage.id]
            stage.matches.forEach( (match) => {
                let winningTeam = match.competitors[0];
                let losingTeam = match.competitors[1];
                let winAdv = match.scores[0].value;
                let loseAdv = match.scores[1].value;

                if (!(winningTeam === null || losingTeam === null)) {
                    if (winAdv < loseAdv) {
                        //team1 wins swap values
                        winningTeam = match.competitors[1];
                        losingTeam = match.competitors[0];
                        let temp = winAdv;
                        winAdv = loseAdv;
                        loseAdv = temp;
                    }
                    // create team obj if not exist
                    if (!(winningTeam.id in stageStats.teams)) {
                        stageStats.teams[winningTeam.id] = {
                            id: winningTeam.id,
                            name: winningTeam.name,
                            abvName: winningTeam.abbreviatedName,
                            primaryColor: winningTeam.primaryColor,
                            icon: winningTeam.icon,
                            wins: 0,
                            losses: 0,
                            mapDiff: 0
                        }
                    }
                    // create team obj if not exist
                    if (!(losingTeam.id in  stageStats.teams)) {
                        stageStats.teams[losingTeam.id] = {
                            id: losingTeam.id,
                            name: losingTeam.name,
                            abvName: losingTeam.abbreviatedName,
                            primaryColor: losingTeam.primaryColor,
                            icon: losingTeam.icon,
                            wins: 0,
                            losses: 0,
                            mapDiff: 0
                        }
                    }
    
                    stageStats.teams[winningTeam.id].wins++;
                    stageStats.teams[winningTeam.id].mapDiff += (winAdv - loseAdv);
    
                    stageStats.teams[losingTeam.id].losses++;
                    stageStats.teams[losingTeam.id].mapDiff += (loseAdv - winAdv);
                }
            });
        });

        this.setState({
            statsArr: _statsArr
        });
    }

    setStage(e) {
        this.setState({
            stage: e.target.id
        });
    }

    render() {
        return ( 
            <div className = "App">
                <div className="header">
                    OWL Stats
                </div>
                <ul className="navbar">
                    {
                        this.state.stages.map( (stage) => 
                            <li id={stage.id} key={stage.id} className="nav-item" onClick={this.setStage}>{stage.name}</li>
                        )
                    }
                </ul>
                <div className="stage-header"></div>
                <div className="page-body">
                    <div className="stats-panel">
                        { 
                            this.state.statsArr[this.state.stage] ? <TeamRanking teams={this.state.statsArr[this.state.stage].teams}/> : <span></span>
                        }
                    </div>
                    <div className="matches-list">
                        <ul>
                            {
                                this.state.stages.length > 0 ? this.state.stages[this.state.stage].matches.map( (match) => 
                                    <MatchCard match={match} key={match.id}/>
                                ) : []
                            }
                        </ul> 
                    </div>
                </div>
            </div>
        );
    }
}

export default App;