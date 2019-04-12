import React, { Component } from 'react';

import "./Hex.css";

import desert from "../images/desert.png";
import field from "../images/field.png";
import forest from "../images/forest.png";
import hill from "../images/hill.png";
import mountain from "../images/mountain.png";
import pasture from "../images/pasture.png";
import sea from "../images/sea.png";

class Hex extends Component {
    // constructor (props) {
    //     super(props);
    // }

    render () {
        return (
            <div>
                <img src={desert} alt="desert"/>
            </div>
        )
    }
}

export default Hex;
