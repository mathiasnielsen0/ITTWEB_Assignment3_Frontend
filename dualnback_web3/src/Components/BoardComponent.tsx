import React from 'react';
import { getJSDocAugmentsTag } from 'typescript';
import Tile from "./TileComponent"

interface IProps {
    startGame: Boolean,
    incementScore: any,
    resetScore: any,
}

interface IState {
    currentHighlight: Number[],
    tileHistory:Number[][],
    gameStarted: Boolean,
}

export default class BoardComponent extends React.Component<IProps, IState> {

    private currentTileHistory: Number[][];
    private userCurrentClickedHistory: Number[][];

    constructor(props: IProps) {
        super(props);

        this.state = {
            currentHighlight : [],
            tileHistory : [[]],
            gameStarted : false,           
        }
        this.currentTileHistory = [[]];
        this.userCurrentClickedHistory = [[]];

        this.tileWasClicked = this.tileWasClicked.bind(this);
    };

    componentWillReceiveProps(props: IProps) {
        console.log(props);
        if (props.startGame) {
            this.setState({
                gameStarted: true,
            });
            this.addRandomHighlight();
        }
    }

    tileWasClicked(correctTile: Boolean, row: Number, col : Number){

        if (correctTile) {
            let newTileHistory = this.state.tileHistory;
            newTileHistory.push([row, col])
            
            this.setState({
                tileHistory : newTileHistory,
            })
            console.log(newTileHistory);
            this.addRandomHighlight();
            this.currentTileHistory = this.state.tileHistory;
            this.runHighlightSequence();
            this.props.incementScore();
        }
        else {
            this.props.resetScore();
        }

    }

    runHighlightSequence() {
        console.log("highlight sequence")
        setTimeout(() => {
            console.log("currentTilehi length", this.currentTileHistory.length)
            this.setState({
                currentHighlight : this.currentTileHistory[0]
            });
            this.currentTileHistory = this.currentTileHistory.slice(1);
            if(this.currentTileHistory.length > 0) {
                this.runHighlightSequence();
            }
        }, 2000);
    }


    componentDidMount() {
        
    }

    addRandomHighlight(){
        var rowNo = Math.floor(Math.random() * 3);
        var colNo = Math.floor(Math.random() * 3);
        var newCurreHightlight = [rowNo, colNo];
        this.setState({
            currentHighlight : newCurreHightlight
        })
    }
    

    render() {
        const rows = [0, 1, 2]
        const rowNo = this.state.currentHighlight[0];
        const colNo = this.state.currentHighlight[1];

        return(
            <div className="board">
                { rows.map((row, index) => (
                    <div className="board-row">
                        <Tile TileClicked={this.tileWasClicked} key={"row" + row + "col" + 1} Row={rowNo} Col={0} Highlight={(rowNo == row && colNo == 0).valueOf()}></Tile>
                        <Tile TileClicked={this.tileWasClicked} key={"row" + row + "col" + 2} Row={rowNo} Col={1} Highlight={(rowNo == row && colNo == 1).valueOf()}></Tile>
                        <Tile TileClicked={this.tileWasClicked} key={"row" + row + "col" + 3} Row={rowNo} Col={2} Highlight={(rowNo == row && colNo == 2).valueOf()}></Tile>
                    </div>
                    )
                )}
            </div>
        )
    }
}
