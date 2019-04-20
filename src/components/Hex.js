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

import clear from "../images/clear.png";
import num2 from "../images/chip_2.png";
import num3 from "../images/chip_3.png";
import num4 from "../images/chip_4.png";
import num5 from "../images/chip_5.png";
import num6 from "../images/chip_6.png";
import num8 from "../images/chip_8.png";
import num9 from "../images/chip_9.png";
import num10 from "../images/chip_10.png";
import num11 from "../images/chip_11.png";
import num12 from "../images/chip_12.png";

// let tilesNum = {
//     "desert" : 0,
//     "field" : 1,
//     "forest" : 2,
//     "hill" : 3,
//     "mountain" : 4,
//     "pasture" : 5,
//     "sea" : 6
// };

const tilesName = ["desert", "field", "forest", "hill", "mountain", "pasture", "sea"];
const tiles = [desert, field, forest, hill, mountain, pasture, sea];
const nums = [clear, clear, num2, num3, num4, num5, num6, clear, num8, num9, num10, num11, num12]

class Hex extends Component {
    constructor(props) {
        super(props);
        this.changeHex = this.changeHex.bind(this);
        this.changeNum = this.changeNum.bind(this);
    }

    changeHex () {
        this.props.updateHexFunc(this.props.row, this.props.col);
    }

    changeNum () {
        this.props.updateNumFunc(this.props.row, this.props.col);
    }

    render () {
        return (
            <div className="hex">
                <img src={nums[this.props.num]} className="hex-num" onClick={this.changeNum} alt={this.props.num}/>
                <img src={tiles[this.props.hex]} className="hex-image" onClick={this.changeHex} alt={tilesName[this.props.hex]}/>
            </div>
        )
    }
}

export default Hex;
