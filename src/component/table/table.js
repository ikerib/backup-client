import React, {Component} from 'react';

const axios = require('axios');

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myfs: []
        };
    }

    // componentDidMount() {
    //
    // }


    render() {
        return (
            <table className="table table-condensed table-bordered table-hover table-striped">
                <thead>
                <tr>
                    <th>Month</th>
                    <th>Savings</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>January</td>
                    <td>$100</td>
                </tr>
                <tr>
                    <td>February</td>
                    <td>$80</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default Table;