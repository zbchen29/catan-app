import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Hex from './components/Hex'

class App extends Component {
    render() {
        return (
            <div>
                <Hex/>
                <Hex/>
            </div>
        )
    }
}

export default App;
