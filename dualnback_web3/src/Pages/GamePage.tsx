import React  from "react";
import { cursorTo } from "readline";
import BoardComponent from "../Components/BoardComponent"


interface IProps {

}

interface IState {
    gameStarted: Boolean,
    currentScore: Number,
    currentHighscore: Number,
}

export default class GamePage extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            gameStarted : false,
            currentScore : 0,
            currentHighscore : 0,
        }
        
        this.startGame = this.startGame.bind(this);
        this.resetScore = this.resetScore.bind(this);
        this.incrementScore = this.incrementScore.bind(this);
    };


    startGame() {
        this.setState({
            gameStarted : true,
        })
    }

    resetScore() {
        let highScore = this.state.currentHighscore;
        if(this.state.currentHighscore < this.state.currentScore)
            highScore = this.state.currentScore;
        this.setState({
            currentHighscore : highScore,
            currentScore : 0,
            gameStarted : false,
        })
    }

    incrementScore() {
        let highScore = this.state.currentHighscore;
        if(this.state.currentHighscore < (+this.state.currentScore + 1))
            highScore = +this.state.currentScore + 1;
        this.setState({
            currentScore : +this.state.currentScore + 1,
            currentHighscore : highScore,
        })
    }

    render(){
        return (
            <div id="GamePageWrapper">
                <BoardComponent incementScore={this.incrementScore} resetScore={this.resetScore} startGame={this.state.gameStarted}></BoardComponent>
                <div className="game-controls">
                    {!this.state.gameStarted &&
                        <a onClick={this.startGame} className="btn btn-primary">Start game</a>
                    }
                    <div className="game-stats">
                        {this.state.gameStarted &&
                            <div className="mr-2">Game started</div>
                        }
                        <b className="mr-2 ml-5">Currentscore:</b> {this.state.currentScore}
                        <b className="ml-5 mr-2">Highscore:</b> {this.state.currentHighscore}
                    </div>
                </div>

            </div>
      )
    }
}