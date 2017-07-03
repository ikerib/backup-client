import React, {Component} from 'react';
import styles from './styles';
import {Treebeard} from 'react-treebeard';
const axios = require('axios');

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myfs: []
        };

        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:9000/lsdir';
        axios.get(url)
            .then(res => {
                const myfs = res.data;
                this.setState({ myfs });
            });
    }

    onToggle(node, toggled) {
        if (this.state.cursor) {
            this.setState({ cursor: {active : false } })
            // this.state.cursor.active = false;
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

export default Sidebar;
