import React, {RefObject} from "react";

interface IProps {
    username: string,
    score: number,
    index: number,
    date: Date
}

interface IState {
    firstMount: boolean
    class: string
}

export default class ScoreCard extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            firstMount: true,
            class: "scale-1"
        };
    }

    componentDidMount(): void {
        if (this.state.firstMount) {
            this.setState({firstMount: false});
            this.setState({class: "scale-0 h-0"});
            setTimeout(() => {
                requestAnimationFrame(() => {
                    console.log("animating");
                    this.setState({class: "scale-1 h-10"});
                });
            }, 10);
        }
    }

    render() {
        return (
            <div className={"row animate score pt-3 pb-3 " + this.state.class}>
                <div className={"col-2"}>
                    {this.props.index}
                </div>
                <div className={"col-4"}>
                    <p>
                        {this.props.username}
                    </p>
                </div>
                <div className={"col-4"}>
                    <p>
                        {this.props.score}
                    </p>
                </div>
                <div className={"col-2"}>
                    <p>
                        {this.props.date.toDateString()}
                    </p>
                </div>
            </div>
        )
    }
}