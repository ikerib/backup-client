import React, {Component} from 'react';
import Moment from 'moment';

const axios = require('axios');


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myfs: [],
            snapshoots: [],
        };
        this.handleDownload = this.handleDownload.bind(this);
    }

    handleDownload(file) {
        // Fitxategia karpeta bada, zuhaitza eguneratu edo ez egin ezer
        if ( file.item.type === "file") {
            const BASEURL = "http://localhost:9000/download?dir=";
            // window.open(BASEURL + file.item.path);
            window.location.href =BASEURL + file.item.path;
        } else {
            console.log("karpetan click click click");
            console.log(file);
            this.props.onFolderClick(file.item.path);
        }
    }

    updateTable(srv) {
        let url = null;
        if ( srv === null) {
            url = 'http://localhost:9000/ls?dir=/tmp/'
        } else {
            url = 'http://localhost:9000/ls?dir=' + srv;
        }
        axios.get(url)
            .then(res => {
                const myfs = res.data;
                this.setState({ myfs });
            });
    }

    updateSnapshoots(srv) {
        let url = null;
        if ( srv === null) {
            return;
        } else {
            url = 'http://localhost:9000/lsSnapshoot?dir=' + srv;
        }
        axios.get(url)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
    }

    componentDidMount() {
        this.updateTable(this.props.selectedFs);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.selectedFs) !== JSON.stringify(nextProps.selectedFs)) // Check if it's a new user, you can also use some unique, like the ID
        {
            this.updateTable(nextProps.selectedFs);
            this.updateSnapshoots(nextProps.selectedFs);
        }
    }


    render() {
        const nirefs = this.state.myfs.children;
        let newdir = "";
        if ( (this.props.selectedFs !== undefined) && (this.props.selectedFs !== null)) {
            // newdir = this.props.selectedFs.split("/").pop();
            const s = this.props.selectedFs;
            newdir = s.substring(0, s.lastIndexOf('/'));

            console.log("newdir newdir newdir");
            console.log(newdir);
        }

        console.log("NIREFS NIREFS NIREFS");
        console.log(nirefs);
        console.log("NIREFS2 NIREFS2 NIREFS2");
        if ( nirefs !== undefined) {
            if ( nirefs[0].name === "..") {

                nirefs[0]={
                    path: newdir,
                    name: "..",
                    children: [],
                    size: 0,
                    atime: "2017-07-12T11:03:07.580Z",
                    mtime: "2011-07-12T12:02:38.000Z",
                    ctime: "2017-06-28T05:59:59.563Z",
                    birthtime: "2017-06-28T05:59:59.563Z",
                    mode: "0770",
                    type: "directory"
                };
            } else {
                nirefs.unshift({
                    path: newdir,
                    name: "..",
                    children: [],
                    size: 0,
                    atime: "2017-07-12T11:03:07.580Z",
                    mtime: "2011-07-12T12:02:38.000Z",
                    ctime: "2017-06-28T05:59:59.563Z",
                    birthtime: "2017-06-28T05:59:59.563Z",
                    mode: "0770",
                    type: "directory"
                });
            }

        }

        const BASEURL = "http://localhost:9000/download?dir=";
        if (nirefs === undefined) {
            return (
                <h5>No data.</h5>
            )
        }
        return (
            <table className="table table-condensed table-bordered table-hover table-striped">
                <thead>
                <tr>
                    <th>Fitxategia</th>
                    <th>Mota</th>
                    <th>Tamaina</th>
                    <th>Baimenak</th>
                    <th>Sortua</th>
                    <th>Aldatua</th>
                </tr>
                </thead>

                <tbody>
                {
                    nirefs.map((item, i) => {
                        return (
                            <tr key={i} >
                                <td>
                                    <a href="javascript:void(0)" onClick={() => this.handleDownload({item})}>
                                        <i className={item.type==="directory" ? "fa fa-folder" : "fa fa-file-text" } style={{marginRight: '5px'}} />
                                        {item.name}
                                    </a>
                                </td>
                                <td>
                                    {item.type}
                                </td>
                                <td>
                                    { (item.size/1024).toFixed(2) } Kb
                                </td>
                                <td>
                                    { item.mode }
                                </td>
                                <td>
                                    {Moment(item.birthtime).format("YYYY-MM-DD HH:mm:ss")}
                                </td>
                                <td>
                                    {Moment(item.mtime).format("YYYY-MM-DD HH:mm:ss")}
                                </td>

                            </tr>);
                    })
                }
                </tbody>
            </table>
        );
    }
}

export default Table;