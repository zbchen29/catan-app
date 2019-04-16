import React, { Component } from 'react';
import Hex from './Hex';
import axios from 'axios';

import "./Board.css";
// let tiles = ["desert", "field", "forest", "hill", "mountain", "pasture", "sea"];

const tiles = {
    "D" : 0,
    "W" : 1,
    "F" : 2,
    "H" : 3,
    "M" : 4,
    "P" : 5,
    "-" : 6
};

const tileTypeCount = 7;

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height : 10,
            width : 9,
            hexArray : [[6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6]],
            loading : false
        }

        this.generateBoard = this.generateBoard.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.incrementHex = this.incrementHex.bind(this);
        this.createBoardElement = this.createBoardElement.bind(this);
        this.incrementHex = this.incrementHex.bind(this);
    }

    componentWillMount () {
        this.generateBoard();
    }

    // Gets a new random board from generator endpoint
    generateBoard () {
        this.setState({loading : true});
        axios.get('/generator')
            .then((res) => {
                let arr = res.data;

                for (var i = 0; i < arr.length; i++)
                {
                    for (var j = 0; j < arr[i].length; j++)
                    {
                        arr[i][j] = tiles[arr[i][j]]
                    }
                }

                this.setState({
                    height : arr.length,
                    width : arr[0].length,
                    hexArray : arr,
                    loading : false
                });
                console.log(arr);
                console.log("Successful board generation.");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Clears board with sea tiles
    clearBoard () {
        this.setState({
            hexArray : [[6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6],
                        [6, 6, 6, 6, 6, 6, 6, 6, 6]],
            loading : false
        })
    }

    // Used in Hex child to change tile on click
    incrementHex (row, col) {
        let board = this.state.hexArray;
        board[row][col] = (board[row][col] + 1) % tileTypeCount;
        this.setState({
            hexArray : board
        });
    }

    createBoardElement () {
        let shifted = [];
        let normal = [];
        let shifted_buffer = [];
        let normal_buffer = [];

        // Iteratively build the rendered object
        for (var i = 0; i < this.state.height; i++)
        {
            for (var j = 0; j < this.state.width; j++)
            {
                if (i % 2 === 0)
                {
                    shifted_buffer.push(
                        <Hex
                            key={i*(this.state.width) + j}
                            hex={this.state.hexArray[i][j]}
                            row={i}
                            col={j}
                            updateFunc={this.incrementHex}/>
                    );
                }
                else
                {
                    normal_buffer.push(
                        <Hex
                            key={i*(this.state.width) + j}
                            hex={this.state.hexArray[i][j]}
                            row={i}
                            col={j}
                            updateFunc={this.incrementHex}/>
                    );
                }
            }

            if (i % 2 === 0)
            {
                shifted.push(
                    <div key={this.state.height * this.state.width + i} className="d-flex flex-row">
                        {shifted_buffer}
                    </div>
                )
            }
            else {
                normal.push(
                    <div key={this.state.height * this.state.width + i} className="d-flex flex-row">
                        {normal_buffer}
                    </div>
                )
            }

            shifted_buffer = [];
            normal_buffer = [];
        }

        return (
            <div className="board-container mx-auto">
                <div className="shifted">
                    {shifted}
                </div>
                <div className="normal">
                    {normal}
                </div>
                <div>{this.props.value}</div>
            </div>
        )
    }

    render () {
        return (
            <div>
                { this.createBoardElement() }
                <div className="d-flex flex-row mx-auto button-row justify-content-around">
                    <button className="btn btn-secondary" disabled>Settings</button>
                    <button className="btn btn-secondary" disabled>Shuffle Nums</button>
                    <button className="btn btn-secondary" onClick={this.clearBoard}>Clear</button>
                    { (this.state.loading) ? (
                        <button className="btn btn-success" disabled>Waiting...</button>
                    ) : (
                        <button className="btn btn-success" onClick={this.generateBoard}>Generate</button>
                    )}
                </div>
            </div>
        )
    }
}

export default Board;
