import React, {Component} from 'react';
import styles from './styles';
import {Treebeard, decorators} from 'react-treebeard';
const axios = require('axios');

decorators.Header = ({style, node}) => {
    const iconType = node.children ? 'folder' : 'file-text';
    const iconClass = `fa fa-${iconType}`;
    const iconStyle = {marginRight: '5px'};

    return (
        <div style={style.base}>
            <div style={style.title}>
                <i className={iconClass} style={iconStyle}/>
                {node.name}
            </div>
        </div>
    );
}

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursor: {path:"/mnt/nfs/Aplik/.zfs/snapshot/"},
            selectedFs: this.props.selectedFs,
            myfs: []
        };
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:9000/lsdir?dir=/mnt/nfs/Aplik';
        axios.get(url)
            .then(res => {
                const myfs = res.data;
                this.setState({ myfs });
            });
    }

    onToggle(node, toggled) {
        if (this.state.cursor) {
            this.setState({cursor: {active: false}});
            // this.state.cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({cursor: node});
        if ((node!==null)&&(node!==undefined)) {
            this.props.onFsChange(node.path);
        }

    }

    render() {
        const {cursor} = this.state;
        return (
            <div>
                <Treebeard data={this.state.myfs} onToggle={this.onToggle} style={styles} />
            </div>

        );
    }
}

export default Sidebar;
