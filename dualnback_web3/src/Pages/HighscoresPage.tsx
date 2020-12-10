import React from "react";
import ScoreCard from "../Components/ScoreCard";
import WebSocket from "../WebSocket/HighscoreWebSocket"


interface IProps {

}

interface IState {
    scorecard:any[]
}

export default class HighscoresPage extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);
        this.state = {
            scorecard : []
        }
    }

    componentDidMount(): void {

        WebSocket.start(this.websocketResponse)
    }

    websocketResponse = (message:any) => {
        let sc:any = [];
        let index = 1;
        message.forEach((element:any) => {
            let d: Date = new Date(element.date);
            sc.push(<ScoreCard key={element._id} index={index} username={element.name} score={element.score} date={d}/>)
            index++;
        });
        this.setState({scorecard: sc});
    };
    
    render() {
        return (
            <div id="HomepageWrapper">
                {/* <p>
                    THIS IS Highscore
                </p>
                <div>
                    <button onClick={this.addScore}>Click me</button>
                </div> */}
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-2"}>
                            #
                        </div>
                        <div className={"col-4"}>
                            <p>
                                Username:
                            </p>
                        </div>
                        <div className={"col-4"}>
                            <p>
                                Score:
                            </p>
                        </div>
                        <div className={"col-2"}>
                            Date:
                        </div>
                    </div>
                    {this.state.scorecard.map((card: any) => {
                        return card
                    })}
                </div>
            </div>
        )
    }
}