import React, { Component } from 'react';

import Example from "../libs/crudgen/Example.jsx";

class Home extends Component {
    render() {
        return (
            <div>
                {this.props.match.url}
                <hr/>
                <Example />
            </div>
        );
    }
}

export default Home;