import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import ImageResults from "./ImageResults";
import SearchHashtag from "./SearchHashtag";
import HashtagResults from "./HashtagResults";
import TopSearches from "./TopSearches";
import LastSearch from "./LastSearch";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: null,
            data: [],
            searches: [],
            history: []
        }
        this.getInfo = this.getInfo.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.getFrequentSearches = this.getFrequentSearches.bind(this);
        this.getPreviousInfo = this.getPreviousInfo.bind(this);
        this.getFrequentSearches();
    }

    getInfo() {
        fetch("/API/frequent/" + this.state.searchValue)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                let history = this.state.history.slice();
                history.push(this.state.searchValue);
                this.setState({data: data.edges, history: history});
                this.getFrequentSearches();
            })
            .catch((err) => console.log(err));
    }

    getPreviousInfo(){
        let history = this.state.history.slice();
        history.pop()
        let request = history.pop();
        this.setState({history:history});
        fetch("/API/frequent/" + request)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                let history = this.state.history.slice();
                history.push(this.state.searchValue);
                this.setState({data: data.edges, history: history});
                this.getFrequentSearches();
            })
            .catch((err) => console.log(err));
    }

    getFrequentSearches() {
        fetch("/API/frequent_searches")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({searches: data});
            })
            .catch((err) => console.log(err));
    }

    onTextChange(value) {
        this.setState({
            searchValue: value
        });
    }

    render() {
        let history = this.state.history;
        return (
            <div className="App container-fluid">
                <h1>Let's see which IG hashtag is frequent with the one you choose!</h1>
                <SearchHashtag onChange={this.getInfo} onTextChange={this.onTextChange}
                               searchValue={this.state.searchValue}/>
                <div className="row justify-content-around app-content">
                    <div className="col-9">
                        <ImageResults data={this.state.data}/>
                    </div>
                    <div className="col-3">
                        <LastSearch value={history[history.length-2]} onClick={this.getPreviousInfo}/>
                        <HashtagResults data={this.state.data} searchValue={this.state.searchValue}/>
                        <TopSearches data={this.state.searches}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
