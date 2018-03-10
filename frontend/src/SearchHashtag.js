import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";


export default class SearchHashtag extends Component {

    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(event) {
        this.props.onTextChange(event.target.value);
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.onChange();
    }

    render() {
        return (
            <div className="row justify-content-around">
                <form onSubmit={this.handleSubmit} className="col-6 center-items">
                    <FormGroup controlId="search" bsSize="large">
                        <ControlLabel className="auth-text">Which hashtag would you like to search?</ControlLabel>
                        <FormControl
                            onChange={this.handleTextChange}
                            type="search"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        type="submit">
                        Search
                    </Button>
                </form>
            </div>
        );
    }
}