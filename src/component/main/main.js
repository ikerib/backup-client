import React, {Component} from 'react';
import Server from "../servers/server";
import Sidebar from "../sidebar/sidebar";
import Table from "../table/table";
import { FormControl, ControlLabel } from 'react-bootstrap';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server: null,
            selectedFs: null,
        };
        this.handleFsChange = this.handleFsChange.bind(this);
        Main.handleServerChange = Main.handleServerChange.bind(this);
    }

    static handleServerChange(srv) {
        if ((srv!==null) && (srv!==undefined)) {
            this.setState({server: srv.item});
        }
    }

    handleFsChange(path) {
        if ((path!==null) && (path!==undefined)) {
            this.setState({selectedFs: path});
        }
    }

    render() {
        return (
            <body>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand">Project name</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <Server onServerChange={Main.handleServerChange} />
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
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
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
