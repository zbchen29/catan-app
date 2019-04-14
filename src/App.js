import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import Board from './components/Board';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr : [["M","M","M","M","M","M","M","M","M"],
            ["M","M","M","M","M","M","M","M","M"],
            ["M","M","M","M","M","M","M","M","M"],
            ["M","M","M","M","M","M","M","M","M"],
            ["M","M","M","M","M","M","M","M","M"],
            ["M","M","M","M","M","M","M","M","M"],
            ["M","M","M","M","M","M","M","M","M"],
            ["M","M","M","M","M","M","M","M","M"],
            ["M","M","M","M","M","M","M","M","M"],
            ["M","M","M","M","M","M","M","M","M"]],
            val : 0
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get('/generator')
            .then((res) => {
                console.log(this.state.arr);
                this.setState({
                    arr : res.data
                });
                console.log(this.state.arr);
                console.log("Success");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleClick() {
        console.log("hi");
        this.setState({
            arr : [["M","M","M","M","M"],["M","M","M","M","M"],["M","M","M","M","M"],["M","M","M","M","D"]],
            val : this.state.val+1
        })
    }

    // componentWillUnmount() {
    //     clearTimeout(this.timerID);
    // }

    render() {
        return (
            <div>
                <div onClick={this.handleClick}>here</div>
                <Board val={this.state.val} hexes={this.state.arr}/>
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
