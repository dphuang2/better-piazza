import React, { Component } from 'react';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ""
        }
        this.API_URL = "http://localhost:5000";
        this.refreshData()
    }

    refreshData() {
        // Save scoped reference to myself
        let _self = this;

        // Fetch the data please
        fetch(this.API_URL)
            .then(function(response){
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: '
                        + response.status);
                    return;
                }
                // Examine the text in the response
                response.text().then(function(data) {
                    _self.setState({text: data})
                });
            })
    }

    render() {
        return (
            <div className="App">
                <Header text={this.state.text}/>
                <Posts />
            </div>
        );
    }
}

export default App;
