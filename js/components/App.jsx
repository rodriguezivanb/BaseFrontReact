import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Home from './Home.jsx'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                    </ul>
                    <div>
                        <Route exact path="/" component={Home}/>
                    </div>
                </div>
            </Router>  
        );
    }
}

export default App;