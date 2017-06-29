/**
 * Created by iibarguren on 6/29/17.
 */
import React, { Component } from 'react';
import './server.css';

class Server extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            response: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/servers')
            .then(response => response.json())
            .then((response) => { this.setState({ response }); });
    }

    render() {
        if (!this.state.response) {
            return <div>Loading</div>;
        }
        return (
            <ul className="nav nav-sidebar">

                {
                    this.state.response.map((y) => {
                        return (<li><a>{y}</a></li>);
                    })
                }
            </ul>
        );
    }
}

export default Server;
