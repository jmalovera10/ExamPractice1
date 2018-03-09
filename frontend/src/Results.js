import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default class Results extends Component{

    render(){
        let data = this.props.data;
        let results = [];

        for(let d of data){
            results.push(
                <div key={d.node.display_url} className="col-3">
                    <img src={d.node.display_url} alt={d.node.display_url}/>
    </div>);
    }

        return(
            <div className="row">
                {results}
            </div>
        );
    }
}