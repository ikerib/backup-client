import React, {Component} from 'react';
import Server from "../servers/server";
import Sidebar from "../sidebar/sidebar";
import Table from "../table/table";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFs: null,
        };
        this.handleFsChange = this.handleFsChange.bind(this);
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
                        <a className="navbar-brand" href="#">Project name</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <Server/>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">
                        <Sidebar selectedFs={this.state.selectedFs} onFsChange={this.handleFsChange} />
                    </div>
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

                        <h4 className="sub-header">Path: {this.state.selectedFs}</h4>

                        <div className="table-responsive">
                            <Table />
                        </div>
                    </div>
                </div>
            </div>
            </body>
        );
    }
}


export default Main;
