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
            selectedFs: config.INIT_PATH,
            snapshoots: [],
            erroreTextua: ""
        };
        this.handleError = this.handleError.bind(this);
        this.handleFolderClik = this.handleFolderClik.bind(this);
        this.handleServerChange = this.handleServerChange.bind(this);
        this.handleFsChange = this.handleFsChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleError(text) {
        this.setState({erroreTextua: text});
    }

    handleFolderClik(path) {
        console.log("Main - handleFolderClik");
        console.log("Main - path: " + path);
        this.setState({erroreTextua: ""});
        this.setState({selectedFs: path});
        this.handleFsChange(path);
    }

    handleServerChange(srv) {
        console.log("Main - handleServerChange");
        this.setState({erroreTextua: ""});
        this.setState({snapshoots: []});
        if ((srv !== null) && (srv !== undefined)) {
            this.setState({server: srv.item});
            this.setState({selectedFs: config.MOUNT_POINT + srv.item});
        }
    }

    handleFsChange(path) {
        console.log("Main - handleFsChange");
        this.setState({erroreTextua: ""});
        if ((path !== null) && (path !== undefined)) {
            this.setState({selectedFs: path});
            const url = config.API_URL + 'lssnapshoot?dir=' + path;
            console.log("Table - HandleFS - Snapshoot");
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
        console.log("Main - handleSelect");
        let selectedPath = option.target.value; //auto-20170810.1058-1d/
        let selectedData = option.target[option.target.selectedIndex].getAttribute('data-dir'); //mnt/nfs/Donibane/Grupos
        let selectedCompletePath = selectedData + "/.zfs/snapshot/" + selectedPath;

        let newDir =selectedCompletePath ;

        // 1-. Check snapshoot duen lehendik
        if ( this.state.selectedFs.indexOf('/.zfs/snapshot/') !== -1 ) {
            // Demagun: /mnt/nfs/Donibane/Grupos/.zfs/snapshot/auto-20170810.1258-1d/Artxiboa
            const aPath = this.state.selectedFs.split('/.zfs/snapshot/');
            // Orain:
            // aPath[0] => /mnt/nfs/Donibane/Grupos
            // aPath[1] => auto-20170810.1258-1d

            // 2-. Bilatu azpikarpeta den ala snapshoot raiz
            const subPathIndexOf = aPath[1].indexOf('/');
            if ( subPathIndexOf !== -1 ) {
                const subPath = aPath[1].substring(subPathIndexOf);
                newDir = aPath[0] + "/.zfs/snapshot/" + selectedPath + subPath;
            } else {
                newDir = selectedCompletePath;
            }
        } else {
            // Zailagoa oraindik! PAth base, snapshoot sartu eta zegoen tokian utzi.
            // Demagun gaudela: /mnt/nfs/Donibane/Grupos/Artxiboa
            // Lortu behar da : /mnt/nfs/Donibane/Grupos/.zfs/snapshot/auto-20170810.1258-1d/Artxiboa
            // path horretatik, lehen 4 karpetak izango dira, basea eta ondorengoa karpetak
            // BASE => /mnt/nfs/Donibane/Grupos
            // KARPETA => /Artxiboa

            let indices = [];
            for(let i=0; i< this.state.selectedFs.length;i++) {
                if ( this.state.selectedFs[i] === "/") indices.push(i);
            }

            const KARPETA = this.state.selectedFs.substring(indices[4]);
            const BASE = this.state.selectedFs.split(KARPETA)[0];

            newDir = BASE + "/.zfs/snapshot/" + selectedPath + KARPETA;
        }

        this.setState({selectedFs: newDir})
    }

    render() {
        if (!this.state.snapshoots) {
            this.setState({snapshoots: []});
        }
        let divCombo;

        if (this.state.snapshoots && this.state.snapshoots.length > 0) {
            divCombo = (
                <div className="col-md-3">
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
                <div className="col-md-3">

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
                    {/*<div className="col-sm-3 col-md-2 sidebar">*/}
                    {/*</div>*/}
                    {/*<div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">*/}
                    <div className="col-sm-12 col-md-12  main">

                        {
                            this.state.erroreTextua.length > 0 ? <Errorea erroreTextua={this.state.erroreTextua}/> : null
                        }

                        <div className="row">
                            <div className="col-md-9">
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
