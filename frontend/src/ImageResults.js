import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./ImageResults.css";

export default class ImageResults extends Component {

    render() {
        let data = this.props.data;
        let results = [];

        for (let d of data) {
            results.push(
                <div key={d.node.thumbnail_src} className="col-4">
                    <img src={d.node.thumbnail_src} alt={d.node.thumbnail_src}/>
                </div>);
        }
        return (
            <div className="row result-content">
                {results}
            </div>
        );
    }
}