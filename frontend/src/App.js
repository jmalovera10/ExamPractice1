import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Results from "./Results";
import SearchHashtag from "./SearchHashtag";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue : null,
            data : []
        }
        this.getInfo = this.getInfo.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    getInfo(){
        fetch("/API/frequent/"+this.state.searchValue)
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                this.setState({data:data.edges});
            })
            .catch((err)=> console.log(err));
    }

    onTextChange(e) {
        this.setState({
            searchValue: e
        });
    }

    render() {
        return (
            <div className="App container-fluid">
                <h1>Welcome to the Boilerplate</h1>
                <SearchHashtag onChange={this.getInfo} onTextChange={this.onTextChange}
                               searchValue={this.state.searchValue}/>
                <Results data={this.state.data}/>
            </div>
        );
    }
}

export default App;
