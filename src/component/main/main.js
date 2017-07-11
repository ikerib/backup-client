import React, {Component} from 'react';
import Server from "../servers/server";
import Sidebar from "../sidebar/sidebar";
import Table from "../table/table";
import { FormControl, ControlLabel } from 'react-bootstrap';
const axios = require('axios');

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server: null,
            selectedFs: null,
            snapshoots:[],
        };
        this.handleFsChange = this.handleFsChange.bind(this);
        this.handleServerChange = this.handleServerChange.bind(this);
    }

    handleServerChange(srv) {
        if ((srv!==null) && (srv!==undefined)) {
            this.setState({server: srv.item});
        }
    }

    handleFsChange(path) {
        if ((path!==null) && (path!==undefined)) {
            this.setState({selectedFs: path});
            const url = 'http://localhost:9000/lssnapshoot?dir='+path;
            console.log("URL: ");
            console.log(url);
            axios.get(url)
                .then(res => {
                    let response =null;
                    if ((res.data!==null) && (res.data!==undefined)) {
                        console.log(res.data);
                        console.log("ZER DUGUUUUUUUUUUUUUUUUUU");
                        response = res.data.map(obj => obj);
                    } else {
                        response = [];
                    }
                    console.log("response:");
                    console.log(response);
                    this.setState({ snapshoots:response });
                    console.log("state snapshoots");
                    console.log(this.state.snapshoots);
                })
                .catch(function (error) {
                    console.log("Ez dago snapshoot-ik");
                });
            ;
        }
    }

    render() {
        if (!this.state.snapshoots) {
            this.setState({snapshoots:[]});
        }
        return (
            <body>

            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand">Project name</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <Server onServerChange={this.handleServerChange} />
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">
                        <Sidebar server={this.state.server} selectedFs={this.state.selectedFs} onFsChange={this.handleFsChange} />
                    </div>
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

                        <div className="row">
                            <div className="col-md-6">
                                <ControlLabel>Path: </ControlLabel>
                                <FormControl
                                    readOnly
                                    type="text"
                                    value={this.state.selectedFs}
                                />
                            </div>
                            <div className="col-md-6">
                                <ControlLabel>Spanshoot: </ControlLabel>
                                <FormControl componentClass="select" placeholder="Type">
                                    <option key="-1" value="Aukeratu bat" selected={true}>Aukeratu bat</option>
                                    {
                                        this.state.snapshoots.map((option, index) => {
                                            return (<option key={index} data-dir={option.dir} value={option.fs}>{option.dt}</option>)
                                        })
                                    }
                                </FormControl>
                            </div>
                        </div>
                        <div className="row">&nbsp;</div>

                        <div className="table-responsive">
                            <Table selectedFs={this.state.selectedFs} />
                        </div>
                    </div>
                </div>
            </div>
            </body>
        );
    }
}


export default Main;
