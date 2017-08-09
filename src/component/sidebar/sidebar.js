import React, {Component} from 'react';
import styles from './styles';
import {Treebeard, decorators} from 'react-treebeard';
const axios = require('axios');
const config = require('../../config');

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
};

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            cursor: {path:"/mnt/nfs/Aplik/.zfs/snapshot/"},
            selectedFs: this.props.selectedFs,
            server: this.props.server,
            myfs: []
        };
        this.onToggle = this.onToggle.bind(this);
    }

    updateTree(srv) {
        console.log("Sidebar - updateTree");
        let url = null;
        let that = this;
        if ( srv === null) {
            url = config.API_URL + 'lsdir?dir=' + config.MOUNT_POINT;
        } else {
            url = config.API_URL + 'lsdir?dir='+ config.MOUNT_POINT + srv;
        }
        this.setState({loading: true});
        axios.get(url)
            .then(res => {
                const myfs = res.data;
                this.setState({loading: false});
                this.setState({ myfs });
                this.setState({selectedFs: config.MOUNT_POINT + srv});
                if (this.state.myfs !== []) {
                    // this.onToggle(this.state.myfs, true);
                }
            }).catch(error => {
                that.props.onError("Akats bat egonda zuhaitza eratzerakoan. Baliteke karpeta guztiak ez azaltzea");
                console.log(error);
            });
    }

    componentDidMount() {
        console.log("Sidebar - componentDidMount");
        this.updateTree(null);
    }

    componentWillReceiveProps(nextProps) {
        console.log("Sidebar - componentWillReceiveProps1");
        if(JSON.stringify(this.props.server) !== JSON.stringify(nextProps.server)) // Check if it's a new user, you can also use some unique, like the ID
        {
            this.updateTree(nextProps.server);
        }
    }

    onToggle(node, toggled) {
        console.log("Sidebar - onToggle");
        if (this.state.cursor) {
            this.setState({cursor: {active: false}});
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

    render () {
        let content;

        if (this.state.loading) {
            content = <div>Datuak eskuratzen...</div>;
        } else {
            return(
                <div>
                    <Treebeard ref="nireTree" data={this.state.myfs} onToggle={this.onToggle} style={styles} />
                </div>
            );
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}

export default Sidebar;
