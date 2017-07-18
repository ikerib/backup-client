/**
 * Created by iibarguren on 6/29/17.
 */
import React, {Component} from 'react';

class Errorea extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-3">&nbsp;</div>
                <div className="col-md-6">
                    <div className="alert alert-danger" role="alert">{this.props.erroreTextua}</div>
                </div>
                <div className="col-md-3">&nbsp;</div>
            </div>
        );
    }
}

export default Errorea;
