
import React, {Component} from 'react';
import Sidebar from "../sidebar/sidebar";
import Table from "../table/table";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFs:null,
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
            <div className="row">
                <div className="col-sm-3 col-md-2">
                    <Sidebar selectedFs={this.state.selectedFs} onFsChange={this.handleFsChange} />
                </div>

                <div className="col-sm-8 col-md-10 main">
                    <h3 className="page-header">Path: {this.state.selectedFs}</h3>
                    <Table />
                </div>
            </div>
        );
    }
}


export default Container;
