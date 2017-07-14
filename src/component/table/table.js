import React, {Component} from 'react';
import Moment from 'moment';

const axios = require('axios');
const config = require('../../config');

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            myfs: [],
            snapshoots: [],
        };
        this.handleDownload = this.handleDownload.bind(this);
    }

    handleDownload(file) {
        // Fitxategia karpeta bada, zuhaitza eguneratu edo ez egin ezer
        if ( file.item.type === "file") {
            const BASEURL = config.API_URL + "download?dir=";
            // window.open(BASEURL + file.item.path);
            window.location.href =BASEURL + file.item.path;
        } else {
            console.log("karpetan click click click");
            console.log(file);
            this.props.onFolderClick(file.item.path);
        }
    }

    updateTable(srv) {
        this.setState({loading: true});
        let url = null;
        if ( srv === null) {
            url = config.API_URL + 'ls?dir=' + config.MOUNT_POINT;
        } else {
            url = config.API_URL + 'ls?dir=' + srv;
        }
        let that = this;
        axios.get(url)
            .then(res => {
                const myfs = res.data;
                this.setState({ myfs });
                this.setState({loading: false});
            })
            .catch(function (error) {
                this.setState({loading: false});
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    if (error.response.status === 500) {
                        alert("Adi!! Akats bat gertatu da datuak eskuratzerakoan.");
                        that.setState.nirefs = undefined;
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
    }

    updateSnapshoots(srv) {
        let url = null;
        let that = this;
        if ( srv === null) {
            return;
        } else {
            url = config.API_URL + 'lsSnapshoot?dir=' + srv;
        }
        axios.get(url)
            .then(res => {
                // TODO: Zuhaitza + Taula birkargatu snapshoot relative izateko
                console.log("TODO: Zuhaitza + Taula birkargatu snapshoot relative izateko");
            }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if (error.response.status === 500) {
                    // alert("Adi!! Akats bat gertatu da datuak eskuratzerakoan.");
                    that.props.onError("Akats bat egonda snapshoot-ak irakurtzerakoan");
                    that.setState.nirefs = undefined;
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
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
        let content;

        if (this.state.loading) {
            return (
                <div>Datuak eskuratzen...</div>
            );
        } else {
            const nirefs = this.state.myfs.children;
            let newdir = "";
            if ( (this.props.selectedFs !== undefined) && (this.props.selectedFs !== null)) {
                // newdir = this.props.selectedFs.split("/").pop();
                const s = this.props.selectedFs;
                newdir = s.substring(0, s.lastIndexOf('/'));
            }

            let resp="";
            if ( nirefs !== undefined){
                if (nirefs.length > 0) {
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
                } else {
                    return (
                        <h5>Ez dago daturik.</h5>
                    )
                }
            } else {
                return (
                    <h5>Ez dago daturik.</h5>
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
}

export default Table;