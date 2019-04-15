import React, { Component } from 'react';

import "./Hex.css";

// import desert from "../images/desert.png";
// import field from "../images/field.png";
// import forest from "../images/forest.png";
// import hill from "../images/hill.png";
// import mountain from "../images/mountain.png";
// import pasture from "../images/pasture.png";
// import sea from "../images/sea.png";

import desert from "../images/desert_r.png";
import field from "../images/field_r.png";
import forest from "../images/forest_r.png";
import hill from "../images/hill_r.png";
import mountain from "../images/mountain_r.png";
import pasture from "../images/pasture_r.png";
import sea from "../images/sea_r.png";

// let tilesNum = {
//     "desert" : 0,
//     "field" : 1,
//     "forest" : 2,
//     "hill" : 3,
//     "mountain" : 4,
//     "pasture" : 5,
//     "sea" : 6
// };

let tilesName = ["desert", "field", "forest", "hill", "mountain", "pasture", "sea"];
let tiles = [desert, field, forest, hill, mountain, pasture, sea];

class Hex extends Component {
    constructor(props) {
        super(props);
        this.changeHex = this.changeHex.bind(this);
    }

    changeHex () {
        this.props.updateFunc(this.props.row, this.props.col);
    }

    render () {
        return (
            <div className="hex" onClick={this.changeHex}>
                <img src={tiles[this.props.hex]} className="hex-image" alt={tilesName[this.props.hex]}/>
            </div>
        )
    }
}

export default Hex;
