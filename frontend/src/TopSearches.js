import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./TopSearches.css";

export default class TopSearches extends Component {

    render(){
        let data = this.props.data;
        let results = [];

        for (let d of data) {
            results.push(
                <div className="col-4">

                </div>);
        }
        return (
            <div className="row">

            </div>
        );
    }
}