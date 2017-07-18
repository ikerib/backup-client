/**
 * Created by iibarguren on 6/29/17.
 */
import React, {Component} from 'react';
import './server.css';
const config = require('../../config');
const axios = require('axios');

class Server extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            response: [],
            server: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const url = config.API_URL + 'servers';
        axios.get(url)
            .then(res => {
                const response = res.data.map(obj => obj);
                this.setState({response});
            });
    }

    handleClick(srv) {
        this.setState({server: srv.item});
        this.props.onServerChange(srv);
    }

    render() {
        if (!this.state.response) {
            return <div>Loading</div>;
        }

        return (
            <ul className="nav navbar-nav navbar-right">ª
                {
                    this.state.response.map((item, i) => {
                        let className = this.state.server === item ? 'active' : 'inactive';
                        return (
                            <li key={i} className={className}>
                                <a href="javascript:void(0)" data-id={item}
                                   onClick={() => this.handleClick({item})}>{item}</a>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}

export default Server;
