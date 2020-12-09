import React, {RefObject} from "react";

interface IProps {
    username: string,
    score: number,
    index: number
}

interface IState {
    firstMount: boolean
    class: string
}

export default class ScoreCard extends React.Component<IProps, IState> {
    divRef: RefObject<HTMLDivElement>;

    constructor(props: IProps) {
        super(props);
        this.state = {
            firstMount: true,
            class: "scale-1"
        };
        this.divRef = React.createRef<HTMLDivElement>();
    }

    class: string = "";

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
            <div className={"row relative animate " + this.state.class}>
                <div className={"absolute col-12"}>
                    <div className={"row"}>
                        <div className={"col-2"}>
                                {this.props.index}
                        </div>
                        <div className={"col-4"}>
                            <p>
                                {this.props.username}
                            </p>
                        </div>
                        <div className={"col-6"}>
                            <p>
                                {this.props.score}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}