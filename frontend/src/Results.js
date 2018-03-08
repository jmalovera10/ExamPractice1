import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default class Results extends Component{

    render(){
        let data = this.props.data;
        let results = [];
        data.forEach((d)=>{
           results.push(<div className="col-3">{d.name}</div>);
        });

        return(
            <div className="row">
                {results}
            </div>
        );
    }
}