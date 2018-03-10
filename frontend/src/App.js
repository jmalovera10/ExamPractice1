import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import ImageResults from "./ImageResults";
import SearchHashtag from "./SearchHashtag";
import HashtagResults from "./HashtagResults";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: null,
            data: []
        }
        this.getInfo = this.getInfo.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    getInfo() {
        fetch("/API/frequent/" + this.state.searchValue)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({data: data.edges});
            })
            .catch((err) => console.log(err));
    }

    onTextChange(value) {
        this.setState({
            searchValue: value
        });
    }

    render() {
        return (
            <div className="App container-fluid">
                <h1>Lets see which IG hashtag is common!</h1>
                <SearchHashtag onChange={this.getInfo} onTextChange={this.onTextChange}
                               searchValue={this.state.searchValue}/>
                <div className="row justify-content-around">
                    <div className="col-9">
                        <ImageResults data={this.state.data}/>
                    </div>
                    <div className="col-3">
                        <HashtagResults data={this.state.data} searchValue={this.state.searchValue}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;