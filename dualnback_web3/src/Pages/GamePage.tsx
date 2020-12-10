import React  from "react";
import { cursorTo } from "readline";
import BoardComponent from "../Components/BoardComponent"
import PublishHighscoreModal from "../Components/PublishHighscoreModal"
import HighscoreApi from "../Apis/HighscoreApi"
import Highscores from "./HighscoresPage";
import Offline from "./Offline";

interface IProps {

}

interface IState {
    gameStarted: Boolean,
    currentScore: Number,
    currentHighscore: Number,
    showPublishHighscoreModal: boolean,
    Online: boolean
}

export default class GamePage extends React.Component<IProps, IState> {

    private username: string;

    constructor(props: IProps) {
        super(props);

        this.state = {
            gameStarted : false,
            currentScore : 0,
            currentHighscore : 0,
            showPublishHighscoreModal : false,
            Online : navigator.onLine
        }
        
        
        this.username = "";
        
        this.startGame = this.startGame.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.resetScore = this.resetScore.bind(this);
        this.incrementScore = this.incrementScore.bind(this);
        this.publishResult = this.publishResult.bind(this);
        this.showPublishHighscoreModal = this.showPublishHighscoreModal.bind(this);
        this.setUsername = this.setUsername.bind(this);
    };
    
    componentDidMount(): void {
        window.addEventListener('online',  () => {
            this.setState({Online: true})
        });
        window.addEventListener('offline',  () => {
            this.setState({Online: false})
        });
    }


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

    async showPublishHighscoreModal() {
        this.setState({
            showPublishHighscoreModal : true,
        })
    }

    async publishResult(){
        if(this.username.length > 0)
            await HighscoreApi.postHighscore(this.state.currentHighscore, this.username)
    }
    
    hideModal() {
        this.setState({
            showPublishHighscoreModal : false,
        })
    }

    setUsername(username: string){
        this.username = username;
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

    render() {
            return (
                <div id="GamePageWrapper">
                    <BoardComponent incementScore={this.incrementScore} resetScore={this.resetScore}
                                    startGame={this.state.gameStarted}/>
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
                        <button disabled={!this.state.Online} title={this.state.Online? "" : "This function is only available when connected to the internet"} onClick={this.showPublishHighscoreModal} className="ml-5 btn btn-primary">Publish
                            highscore</button>
                    </div>
                    <PublishHighscoreModal publishResult={this.publishResult}
                                           show={this.state.showPublishHighscoreModal} setUsername={this.setUsername}
                                           highScore={this.state.currentHighscore} hideModal={this.hideModal}/>
                </div>
            )
        }
}