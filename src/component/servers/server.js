/**
 * Created by iibarguren on 6/29/17.
 */
import React, { Component } from 'react';
import './server.css';

const axios = require('axios');

class Server extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            response: [],
        };
    }

    componentDidMount() {
        const url = 'http://localhost:9000/servers';
        axios.get(url)
            .then(res => {
                const response = res.data.map(obj => obj);
                this.setState({ response });
            });
    }

    render() {
        if (!this.state.response) {
            return <div>Loading</div>;
        }
        return (
            <ul className="nav navbar-nav navbar-right">

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
