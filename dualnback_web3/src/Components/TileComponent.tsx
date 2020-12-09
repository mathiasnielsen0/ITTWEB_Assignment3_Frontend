import React from 'react';


interface IProps {
    Highlight: Boolean,
    TileClicked: any,
    Row: Number,
    Col: Number
}

interface IState {

}

export default class TileComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            highlight: props.Highlight,
        }
        
        this.tileClicked = this.tileClicked.bind(this);
    };
    
    tileClicked() {
        this.props.TileClicked(
            this.props.Highlight,
            this.props.Row,
            this.props.Col
        );
    }

    componentWillReceiveProps(props: IProps){
        this.setState({
            highlight: props.Highlight,
        });
    }

    render() {
        return(
            <div onClick={this.tileClicked}  className={"tile" + (this.props.Highlight ? " highlight" : "")}>
                {/* {this.state.highlight &&
                } */}
            </div>
        )
    }
}
