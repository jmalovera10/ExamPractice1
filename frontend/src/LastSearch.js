import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default class LastSearch extends Component {

    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.props.onClick(this.props.value);
    }

    render(){
        let val = this.props.value;
        let last = ((val===undefined)||(val===null))?"":this.props.value;
        return(
            <div className="row">
                <div className="col-12">
                    {"Last search: "+last}
                </div>
                <div className="col-12">
                    <button className="btn btn-dark" onClick={this.onClick} disabled={!this.props.value}>GO TO PREVIOUS SEARCH</button>
                </div>
            </div>
        );
    }
}