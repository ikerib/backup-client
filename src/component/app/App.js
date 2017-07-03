import React, {Component} from 'react';
import './App.css';
import {Treebeard} from 'react-treebeard';
import styles from './styles';

const axios = require('axios');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myfs: []
        };

        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:9000/ls';
        axios.get(url)
            .then(res => {
                const myfs = res.data
                this.setState({ myfs });
            });
    }

    onToggle(node, toggled) {
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({cursor: node});
    }

    render() {
        return (
            <Treebeard data={this.state.myfs} onToggle={this.onToggle} style={styles} />
        );
    }
}

export default App;
