import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./HashtagResults.css";

export default class HashtagResults extends Component {
    constructor(props) {
        super(props)
        this.calculateFrequence = this.calculateFrequence.bind(this);
    }

    calculateFrequence(hashtags) {
        let results = [];
        if (hashtags !== []) {
            let freqHash = {};
            for (let d of hashtags) {
                let text = d.node.edge_media_to_caption.edges[0].node.text.split(" ");
                for (let hash of text) {
                    if (hash.startsWith("#") && hash !== "#" + this.props.searchValue) {
                        if (!freqHash[hash]) {
                            freqHash[hash] = 1;
                        } else {
                            freqHash[hash]++;
                        }
                    }
                }
            }

            console.log(freqHash);
            var top = [];

            for (let hash in freqHash) {
                top.push([hash, freqHash[hash]]);
            }

            top.sort((first, second) => {
                return second[1] - first[1];
            });

            let i = 0;

            for (let val of top) {
                if (i >= 10) break;
                results.push(
                    <div key={val[0]} className="list-group-item">
                        <h4>{val[0] + ": " + val[1]}</h4>
                    </div>
                );
                i++;
            }
        }
        return results
    }

    render() {
        let data = this.props.data;
        let results = this.calculateFrequence(data);

        return (
            <div className="row results-all">
                <div className="card col-12 card-top">
                    <div className="card-header bg-info">
                        <h2>Frequently paired hashtags</h2>
                    </div>
                    <ul className="list-group list-group-flush top-searches">
                        {results}
                    </ul>
                </div>

            </div>
        );
    }
}