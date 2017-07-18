import React, {Component} from 'react';
import Server from "../servers/server";
import Sidebar from "../sidebar/sidebar";
import Table from "../table/table";
import Errorea from "./errorea"
import {FormControl, ControlLabel} from 'react-bootstrap';
const axios = require('axios');
const config = require('../../config');

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server: null,
            selectedFs: null,
            snapshoots: [],
            erroreTextua: ""
        };
        this.handleFsChange = this.handleFsChange.bind(this);
        this.handleServerChange = this.handleServerChange.bind(this);
        this.handleFolderClik = this.handleFolderClik.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleError(text) {
        this.setState({erroreTextua: text});
    }

    handleFolderClik(path) {
        this.setState({erroreTextua: ""});
        const url = config.API_URL + 'lsdir?dir=' + path;
        axios.get(url)
            .then(res => {
                const myfs = res.data;
                myfs.active = true;
                myfs.toggled = false;
                // this.refs.child.setState({ cursor:myfs });
                this.refs.child.onToggle(myfs, false);
            });
    }

    handleServerChange(srv) {
        this.setState({erroreTextua: ""});
        this.setState({snapshoots: []});
        if ((srv !== null) && (srv !== undefined)) {
            this.setState({server: srv.item});
            this.setState({selectedFs: null});
        }
    }

    handleFsChange(path) {
        this.setState({erroreTextua: ""});
        if ((path !== null) && (path !== undefined)) {
            this.setState({selectedFs: path});
            const url = config.API_URL + 'lssnapshoot?dir=' + path;
            axios.get(url)
                .then(res => {
                    let response = null;
                    if ((res.data !== null) && (res.data !== undefined)) {
                        response = res.data.map(obj => obj);
                    } else {
                        response = [];
                    }
                    this.setState({snapshoots: response});
                })
                .catch(function (error) {
                    console.log("Ez dago snapshoot-ik");
                });
            ;
        }
    }

    handleSelect(option) {
        let selectedPath = option.target.value;
        let selectedData = option.target[option.target.selectedIndex].getAttribute('data-dir')
        let selectedCompletePath = selectedData + "/.zfs/snapshot/" + selectedPath;

        this.setState({selectedFs: selectedCompletePath})
    }

    render() {
        if (!this.state.snapshoots) {
            this.setState({snapshoots: []});
        }
        let divCombo;

        if (this.state.snapshoots && this.state.snapshoots.length > 0) {
            divCombo = (
                <div className="col-md-6">
                    <ControlLabel>Spanshoot: </ControlLabel>
                    <FormControl componentClass="select" placeholder="Type" onChange={this.handleSelect.bind(this)}>
                        <option key="-1" value="Aukeratu bat" selected={true}>Aukeratu bat</option>
                        {
                            this.state.snapshoots.map((option, index) => {
                                return (<option key={index} data-dir={option.dir}
                                                value={option.fs}>{option.dt}</option>)
                            })
                        }
                    </FormControl>
                </div>
            );
        } else {
            divCombo = (
                <div className="col-md-6">

                </div>
            );
        }

        return (
            <body>

            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand">Backup Kudeatzailea</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <Server server={this.state.server}
                                    onServerChange={this.handleServerChange}
                                    onError={this.handleError}/>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">
                        <Sidebar ref="child" server={this.state.server}
                                 selectedFs={this.state.selectedFs}
                                 onFsChange={this.handleFsChange}
                                 onError={this.handleError}/>
                    </div>
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

                        {
                            this.state.erroreTextua.length > 0 ? <Errorea erroreTextua={this.state.erroreTextua}/> : null
                        }

                        <div className="row">
                            <div className="col-md-6">
                                <ControlLabel>Path: </ControlLabel>
                                <FormControl
                                    readOnly
                                    type="text"
                                    value={this.state.selectedFs}
                                />
                            </div>
                            { divCombo }
                        </div>
                        <div className="row">&nbsp;</div>

                        <div className="table-responsive">
                            <Table selectedFs={this.state.selectedFs}
                                   onFolderClick={this.handleFolderClik}
                                   onError={this.handleError}/>
                        </div>
                    </div>
                </div>
            </div>
            </body>
        );
    }
}


export default Main;
