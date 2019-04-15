import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

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


export default App;
