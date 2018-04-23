import React, {
    Component
} from 'react';
import './App.css';
import MatchCard from './MatchCard.js';

const api = "https://api.overwatchleague.com/"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stages: [],
            matches: [],
            page: 0,
            stage: 0
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
                        stages: this.state.stages.concat(res.data.stages)
                    });
                    console.log(res);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log("\nerror\n")
                    console.log(error);
                }
            );
    };

    setStage(e) {
        console.log(e.target.id)
        this.setState({
            stage: e.target.id
        });
    }

    render() {
        return ( 
            <div className = "App">
                <ul className="navbar">
                    {
                        this.state.stages.map( (stage) => 
                            <li id={stage.id} key={stage.id} className="nav-item" onClick={this.setStage}>{stage.name}</li>
                        )
                    }
                </ul>
                <div className="stage-header"></div>
                <div className="page-body">
                    <div className="matches-list">
                    <ul className="matches-list">
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