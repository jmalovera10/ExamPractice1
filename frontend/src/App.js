import React, {Component} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Results from "./Results";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
        this.getInfo = this.getInfo.bind(this);
    }

    getInfo(){
        fetch("/API/food/rice")
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                this.setState({data:data});
            })
            .catch((err)=> console.log(err));
    }

    render() {
        return (
            <div className="App container-fluid">
                <h1>Welcome to the Boilerplate</h1>
                <button onClick={()=>this.getInfo()}>GET INFO</button>
                <Results data={this.state.data}/>
            </div>
        );
    }
}

export default App;
