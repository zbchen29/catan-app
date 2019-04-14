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
        // this.state = {
        //     hexes : this.props.hexes
        // }
    }

    // refreshBoard() {
    //     console.log("by");
    //     this.setState({
    //         hexes : [["M","M","M","M","M"],["M","M","M","P","M"],["M","M","M","D","D"],["M","M","M","M","D"]]
    //     });
    //     this.forceUpdate();
    // }
    //
    // componentDidMount() {
    //     this.timerID = setTimeout(
    //         () => {this.refreshBoard()},
    //         4000
    //     );
    // }

    render () {
        // Arrays for objects
        let shifted = [];
        let normal = [];
        let shifted_buffer = [];
        let normal_buffer = [];

        // Iteratively build the rendered object
        for (var i = 0; i < this.props.hexes.length; i++)
        {
            for (var j = 0; j < this.props.hexes[0].length; j++)
            {
                if (i % 2 === 0)
                {
                    shifted_buffer.push(
                        <Hex key={i*(this.props.hexes[0].length) + j} hex={tiles[this.props.hexes[i][j]]}/>
                    );
                }
                else
                {
                    normal_buffer.push(
                        <Hex key={i*(this.props.hexes[0].length) + j} hex={tiles[this.props.hexes[i][j]]}/>
                    );
                }
            }

            if (i % 2 === 0)
            {
                shifted.push(
                    <div key={this.props.hexes.length * this.props.hexes[0].length + i} className="d-flex flex-row">
                        {shifted_buffer}
                    </div>
                )
            }
            else {
                normal.push(
                    <div key={this.props.hexes.length * this.props.hexes[0].length + i} className="d-flex flex-row">
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
                <div>{this.props.value}</div>
            </div>
        )
    }
}

export default Board;
