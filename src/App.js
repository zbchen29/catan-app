import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import Board from './components/Board';

// let arr = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
let arr = [["M","M","M","M","M"],["M","M","M","P","M"],["M","M","M","M","M"],["M","M","M","M","D"]]

// class App extends Component {
//     componentDidMount() {
//         axios.get('/generator')
//             .then((res) => {
//                 arr = JSON.parse(res)
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }
//
//     render() {
//         return (
//             <div>
//                 <Board hexArray={arr}/>
//             </div>
//         )
//     }
// }

class App extends Component {
    componentDidMount() {
        axios.get('/generator')
            .then((res) => {
                arr = JSON.parse(res)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                Hi
            </div>
        )
    }
}

export default App;

// return (
//     <div className="">
//         <div className="normal">
//             <div className="d-flex flex-row">
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//             </div>
//             <div className="d-flex flex-row">
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//             </div>
//             <div className="d-flex flex-row">
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//             </div>
//             <div className="d-flex flex-row">
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//             </div>
//             <div className="d-flex flex-row">
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//             </div>
//             <div className="d-flex flex-row">
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//             </div>
//         </div>
//         <div className="offset">
//             <div className="d-flex flex-row">
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//             </div>
//             <div className="d-flex flex-row">
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//             </div>
//             <div className="d-flex flex-row">
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//             </div>
//             <div className="d-flex flex-row">
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//             </div>
//             <div className="d-flex flex-row">
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//             </div>
//             <div className="d-flex flex-row">
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//                 <Hex hex={0}/>
//             </div>
//         </div>
//     </div>
// )
