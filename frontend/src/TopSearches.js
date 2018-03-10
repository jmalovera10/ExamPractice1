import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./TopSearches.css";

export default class TopSearches extends Component {

    render(){
        let data = this.props.data;
        let results = [];

        for (let d of data) {
            results.push(
                <li key={d.search} className="list-group-item">
                    <h4>{d.search+": "+d.count}</h4>
                </li>);
        }
        return (
            <div className="row top-all">
                <div className="card col-12 card-top">
                    <div className="card-header bg-info">
                        <h2>Top Searches</h2>
                    </div>
                    <ul className="list-group list-group-flush top-searches">
                        {results}
                    </ul>
                </div>
            </div>
        );
    }
}