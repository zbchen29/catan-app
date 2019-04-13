import React, { Component } from 'react';

import "./Hex.css";

import desert from "../images/desert.png";
import field from "../images/field.png";
import forest from "../images/forest.png";
import hill from "../images/hill.png";
import mountain from "../images/mountain.png";
import pasture from "../images/pasture.png";
import sea from "../images/sea.png";

// let tilesNum = {
//     "desert" : 0,
//     "field" : 1,
//     "forest" : 2,
//     "hill" : 3,
//     "mountain" : 4,
//     "pasture" : 5,
//     "sea" : 6
// };

let tiles = [desert, field, forest, hill, mountain, pasture, sea];

class Hex extends Component {
    constructor (props) {
        super(props);
        this.state = {
            // activeTile : parseInt(Math.floor(Math.random()*7))
            activeTile : this.props.hex
        };

        this.changeTile = this.changeTile.bind(this);
    }

    changeTile() {
        this.setState({
            activeTile : (this.state.activeTile + 1) % 7
        })
    }

    render () {
        return (
            <div className="hex" onClick={this.changeTile}>
                <img src={tiles[this.state.activeTile]} className="hex-image" alt="desert"/>
            </div>
        )
    }
}

export default Hex;
