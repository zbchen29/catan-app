import React, { Component } from 'react';
import Hex from './Hex';

import "./Board.css";
// let tiles = ["desert", "field", "forest", "hill", "mountain", "pasture", "sea"];

let tiles = {
    "D" : 0,
    "W" : 1,
    "F" : 2,
    "H" : 3,
    "M" : 4,
    "P" : 5,
    "-" : 6
}

class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            hexes : this.props.hexArray
        }
    }

    render () {
        // Arrays for objects
        let shifted = [];
        let normal = [];
        let shifted_buffer = [];
        let normal_buffer = [];

        // Iteratively build the rendered object
        for (var i = 0; i < this.state.hexes.length; i++)
        {
            for (var j = 0; j < this.state.hexes[0].length; j++)
            {
                if (i % 2 === 0)
                {
                    shifted_buffer.push(
                        <Hex key={i*(this.state.hexes[0].length) + j} hex={tiles[this.state.hexes[i][j]]}/>
                    );
                }
                else
                {
                    normal_buffer.push(
                        <Hex key={i*(this.state.hexes[0].length) + j} hex={tiles[this.state.hexes[i][j]]}/>
                    );
                }
            }

            if (i % 2 === 0)
            {
                shifted.push(
                    <div key={this.state.hexes.length * this.state.hexes[0].length + i} className="d-flex flex-row">
                        {shifted_buffer}
                    </div>
                )
            }
            else {
                normal.push(
                    <div key={this.state.hexes.length * this.state.hexes[0].length + i} className="d-flex flex-row">
                        {normal_buffer}
                    </div>
                )
            }

            shifted_buffer = [];
            normal_buffer = [];
        }

        return (
            <div>
                <div className="shifted">
                    {shifted}
                </div>
                <div className="normal">
                    {normal}
                </div>
            </div>
        )
    }
}

export default Board;
