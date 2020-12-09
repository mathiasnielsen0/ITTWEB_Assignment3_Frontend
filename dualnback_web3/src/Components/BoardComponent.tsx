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
    gameStarted: Boolean,
}

export default class BoardComponent extends React.Component<IProps, IState> {
    private tileHistory : Number[][];

    private currentTileHistory: Number[][];
    private tilesAreClickable: Boolean;

    private userClickedCountInSequence: Number;

    constructor(props: IProps) {
        super(props);

        this.state = {
            currentHighlight : [],
            gameStarted : false,           
        }

        this.tileHistory = [];
        this.currentTileHistory = [];
        this.tilesAreClickable = false;
        this.userClickedCountInSequence = 0;

        this.tileWasClicked = this.tileWasClicked.bind(this);
        this.addRandomTileToHistory = this.addRandomTileToHistory.bind(this);
        this.runHighlightSequence = this.runHighlightSequence.bind(this);
        this.checkIfCorrectTileClicked = this.checkIfCorrectTileClicked.bind(this);
    };

    componentWillReceiveProps(props: IProps) {
        if (props.startGame && !this.props.startGame) {
            this.setState({
                gameStarted: true,
            });
            this.addRandomTileToHistory();
            this.currentTileHistory = this.tileHistory;
            this.runHighlightSequence();
        }
        else if (!props.startGame){
            this.setState({
                gameStarted: false,
            });
        }
    }

    tileWasClicked(row: Number, col : Number){
        if (this.tilesAreClickable){
            if (this.checkIfCorrectTileClicked(row, col)) {
                this.userClickedCountInSequence = +this.userClickedCountInSequence + 1;
                
                if (this.userClickedCountInSequence == this.tileHistory.length){
                    this.addRandomTileToHistory();
                    this.currentTileHistory = this.tileHistory;
                    this.runHighlightSequence();
                    this.props.incementScore();
                    this.userClickedCountInSequence = 0;
                }
            }
            else {
                this.props.resetScore();
                this.tileHistory = [];
                this.currentTileHistory = [];
                this.userClickedCountInSequence = 0;
            }
        }
    }

    checkIfCorrectTileClicked(row: Number, col : Number) : Boolean {
        let currentTileSpot = this.tileHistory[this.userClickedCountInSequence as number];
        if (currentTileSpot !== undefined && currentTileSpot[0] == row && currentTileSpot[1] == col){
            return true;
        }
        return false;
    }

    runHighlightSequence() {
        setTimeout(() => {
            if (this.currentTileHistory.length > 0 ){
                this.setState({
                    currentHighlight : this.currentTileHistory[0]
                });

                this.currentTileHistory = this.currentTileHistory.slice(1);
                this.runHighlightSequence();
            }
            else
            {
                this.tilesAreClickable = true;
                setTimeout(() => {
                    this.setState({
                        currentHighlight : [9,9]
                    });
                }, 1000)
            }
        }, 1000);
    }


    addRandomTileToHistory(){
        var rowNo = Math.floor(Math.random() * 3);
        var colNo = Math.floor(Math.random() * 3);
        let newTileHistory = this.tileHistory;
        newTileHistory.push([rowNo, colNo]);
        this.tileHistory = newTileHistory
    }
    

    render() {
        const rows = [0, 1, 2]
        const rowNo = this.state.currentHighlight[0];
        const colNo = this.state.currentHighlight[1];

        return(
            <div className="board">
                { rows.map((row, index) => (
                    <div className="board-row" key={"row" + row}>
                        <Tile TileClicked={this.tileWasClicked} key={"row" + row + "col" + 1} Row={row} Col={0} Highlight={(rowNo == row && colNo == 0).valueOf()}/>
                        <Tile TileClicked={this.tileWasClicked} key={"row" + row + "col" + 2} Row={row} Col={1} Highlight={(rowNo == row && colNo == 1).valueOf()}/>
                        <Tile TileClicked={this.tileWasClicked} key={"row" + row + "col" + 3} Row={row} Col={2} Highlight={(rowNo == row && colNo == 2).valueOf()}/>
                    </div>
                    )
                )}
            </div>
        )
    }
}
