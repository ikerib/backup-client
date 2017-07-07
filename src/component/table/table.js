import React, {Component} from 'react';
import Moment from 'moment';

const axios = require('axios');


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myfs: []
        };
        this.handleDownload = this.handleDownload.bind(this);
    }

    handleDownload(file) {
        console.log("handleDownload")
        console.log(file.item.path);
        const BASEURL = "http://localhost:9000/download?dir=";
        // Fitxategia karpeta bada, zuhaitza eguneratu edo ez egin ezer
        if ( file.item.type === "file") {
            // window.open(BASEURL + file.item.path);
            window.location.href =BASEURL + file.item.path;
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

    componentDidMount() {
        this.updateTable(this.props.selectedFs);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.selectedFs) !== JSON.stringify(nextProps.selectedFs)) // Check if it's a new user, you can also use some unique, like the ID
        {
            console.log("path aldatu da!!");
            this.updateTable(nextProps.selectedFs);
        }
    }


    render() {
        const nirefs = this.state.myfs.children;
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
                                    <a onClick={() => this.handleDownload({item})}>
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