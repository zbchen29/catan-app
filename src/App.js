import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import Board from './components/Board';

class App extends Component {
    render() {
        return (
            <div>
                <Board />
            </div>
        )
    }
}

// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             arr : [["-","-","-","-","-","-","-","-","-"],
//             ["-","-","-","-","-","-","-","-","-"],
//             ["-","-","-","-","-","-","-","-","-"],
//             ["-","-","-","-","-","-","-","-","-"],
//             ["-","-","-","-","-","-","-","-","-"],
//             ["-","-","-","-","-","-","-","-","-"],
//             ["-","-","-","-","-","-","-","-","-"],
//             ["-","-","-","-","-","-","-","-","-"],
//             ["-","-","-","-","-","-","-","-","-"],
//             ["-","-","-","-","-","-","-","-","-"]],
//             val : 0
//         };
//
//         this.handleClick = this.handleClick.bind(this);
//     }
//
//     componentDidMount() {
//         axios.get('/generator')
//             .then((res) => {
//                 console.log(this.state.arr);
//                 this.setState({
//                     arr : res.data
//                 });
//                 console.log(this.state.arr);
//                 console.log("Success");
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }
//
//     handleClick() {
//         console.log("hi");
//         this.setState({
//             arr : [["M","M","M","M","M"],["M","M","M","M","M"],["M","M","M","M","M"],["M","M","M","M","D"]],
//             val : this.state.val+1
//         })
//     }
//
//     render() {
//         return (
//             <div>
//                 <div onClick={this.handleClick}>Here</div>
//                 <Board val={this.state.val} hexes={this.state.arr}/>
//             </div>
//         )
//     }
// }

export default App;
