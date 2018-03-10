import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./TopSearches.css";

export default class TopSearches extends Component {

    render(){
        let data = this.props.data;
        let results = [];

        for (let d of data) {
            results.push(
                <div key={d.search} className="col-12">
                    <h3>{d.search+": "+d.count}</h3>
                </div>);
        }
        return (
            <div className="row">
                <div className="col-12">
                    <h1>Top Searches</h1>
                </div>
                {results}
            </div>
        );
    }
}