import React from "react";
import Flags from "./components/Flags";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            topscore: 0
        }
        this.handleScoreChange = this.handleScoreChange.bind(this);
        this.handleTSChange = this.handleTSChange.bind(this);
    }
    
    handleScoreChange(score) {
        this.setState({score})
    }

    handleTSChange(topscore) {
        this.setState({topscore})
    }

    render () {
        return (
            <div>
                <Navbar score={this.state.score} ts={this.state.topscore}/>
                <Jumbotron />
                <Flags onScoreChange={this.handleScoreChange} onTSChange={this.handleTSChange} />
            </div>
        )
    }
}
export default App;
