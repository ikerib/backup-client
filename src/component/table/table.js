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
        this.handleChecked = this.handleChecked.bind(this)
    }

    handleChecked(item) {
        console.log(item);
    }

    handleDownload(file) {
        console.log("Table - handleDownload");
        // Fitxategia karpeta bada, zuhaitza eguneratu edo ez egin ezer
        if ( file.item.type === "file") {
            const BASEURL = config.API_URL + "download?dir=";
            window.location.href =BASEURL + file.item.path + "/" + file.item.file;
        } else {
            // this.props.onFolderClick(file.item.path+"/"+file.item.name);
            if ( file.item.name === '..') {
                this.props.onFolderClick(file.item.path);
            } else {
                this.props.onFolderClick(file.item.path+"/"+file.item.name);
            }

        }
    }

    updateTable(srv) {
        console.log("Table - updateTable");
        this.setState({loading: true});
        let url = null;
        if ( srv === null) {
            url = config.API_URL + 'dirlist?dir=' + config.INIT_PATH;
            this.props.sele
        } else {
            url = config.API_URL + 'dirlist?dir=' + srv;
        }
        let that = this;
        axios.get(url)
            .then(res => {
                const myfs = res.data;
                this.setState({ myfs });
                this.setState({loading: false});
            })
            .catch(function (error) {
                that.setState({loading: false});
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
        console.log("Table - updateSnapshoots");
        let url = null;
        let that = this;
        if ( srv === null) {
            return;
        } else {
            url = config.API_URL + 'lsSnapshoot?dir=' + srv;
        }
        axios.get(url)
            .then(res => {
                console.log(res);
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
        console.log("Table - componentDidMount");
        this.updateTable(this.props.selectedFs);
    }

    componentWillReceiveProps(nextProps) {
        console.log("Table - componentWillReceiveProps22");
        console.log(this.props.selectedFs);
        console.log(nextProps.selectedFs);
        if(JSON.stringify(this.props.selectedFs) !== JSON.stringify(nextProps.selectedFs)) // Check if it's a new user, you can also use some unique, like the ID
        {
            this.updateTable(nextProps.selectedFs);
        }
    }

    render() {
        const lastDir = this.props.selectedFs.slice(0,this.props.selectedFs.lastIndexOf('/'));
        const item = {
                path: lastDir,
                name: "..",
                children: [],
                size: 0,
                atime: "2017-07-12T11:03:07.580Z",
                mtime: "2011-07-12T12:02:38.000Z",
                ctime: "2017-06-28T05:59:59.563Z",
                birthtime: "2017-06-28T05:59:59.563Z",
                mode: "0770",
                type: "directory"

        } ;


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
                        <table className="table table-condensed table-bordered table-hover table-striped tableNoFiles">
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

                            <tr>
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

                            </tr>
                            <tr><td colSpan={6}>Ez dago daturik</td></tr>

                            </tbody>
                        </table>
                    )
                }
            } else {
                return (
                    <table className="table table-condensed table-bordered table-hover table-striped tableNoFilesElse">
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

                            <tr>
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

                            </tr>
                            <tr><td colspan="6">Ez dago daturik</td></tr>

                        </tbody>
                    </table>
                )
            }
            return (
                <table className="table table-condensed table-bordered table-hover table-striped">
                    <thead>
                    <tr>
                        <th>
                            <button id="cmdDownloadFolder" className="btn btn-xs btn-primary" onClick={() => this.downloadFolder({ item })}>
                                <i className="fa fa-download" aria-hidden="true" />
                            </button>
                        </th>
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
                                    <td><input type="checkbox" onChange={() => this.handleChecked({item})}/></td>
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
                                </tr>
                            );

                        })
                    }
                    </tbody>
                </table>
            )
        }
    }
}

export default Table;