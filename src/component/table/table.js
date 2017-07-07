import React, {Component} from 'react';
const axios = require('axios');


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myfs: []
        };
    }

    updateTable(srv) {
        let url = null;
        if ( srv === null) {
            url = 'http://localhost:9000/ls?dir=/tmp/'
        } else {
            url = 'http://localhost:9000/ls?dir=' + srv;
        }
        console.log(url);
        axios.get(url)
            .then(res => {
                const myfs = res.data;
                console.log(myfs);

                this.setState({ myfs });

                this.state.myfs.children.map((item, i) => {
                    console.log(i);
                    console.log(item);
                })

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
        console.log("nirefs da:");
        console.log(nirefs);
        console.log(typeof(nirefs));
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
                    <th>Tamaina</th>
                </tr>
                </thead>

                <tbody>
                {
                    nirefs.map((item, i) => {
                        return (
                            <tr key={i} >
                                <td>
                                    <i className={item.type==="directory" ? "fa fa-folder" : "fa fa-file-text" } style={{marginRight: '5px'}} />
                                    {item.name}
                                    </td>
                                <td>
                                    { (item.size/1024).toFixed(2) } Kb
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