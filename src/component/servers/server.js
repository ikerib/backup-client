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
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:9000/servers';
        axios.get(url)
            .then(res => {
                const response = res.data.map(obj => obj);
                this.setState({ response });
            });
    }

    handleClick(e) {
        console.log("click! click! click!");
        console.log(e);
        this.props.onServerChange(e);
    }

    render() {
        if (!this.state.response) {
            return <div>Loading</div>;
        }
        return (
            <ul className="nav navbar-nav navbar-right">

                {
                    this.state.response.map((y) => {
                        console.log("***********");
                        console.log({y});
                        return (<li><a href="#" id={y} onClick={this.handleClick}>{y}</a></li>);
                    })
                }
            </ul>
        );
    }
}

export default Server;
