import React, { Component } from 'react';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import Content from '../Content/Content';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: "",
            posts: [],
            currentPost: 0
        }
        this.GET_POSTS = "/posts"
        this.GET_HEADER = "/header"
        this.refreshData()
        this.onPostClick = this.onPostClick.bind(this)
    }

    onPostClick(index) {
        this.setState({currentPost: index})
    }

    status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    refreshData() {
        let _self = this;

        // Get the header data
        var header = fetch(this.GET_HEADER)
            .then(this.status)
            .then((res) => res.text())
            .then(function(data) {
                _self.setState({text: data})
            });

        // Get all the posts
        var posts = fetch(this.GET_POSTS)
            .then(this.status)
            .then((res) => res.json())
            .then(function(data) {
                _self.setState({posts: data})
            });

        var all = Promise.all([header, posts])
        all.then(([header, posts]) => {
            console.log("refreshData")
            console.log(_self.state);
        })
    }

    render() {
        let content = (this.state.posts.length === 0) ? "No Content" :
            this.state.posts[this.state.currentPost].about
        return (
            <div className="App">
                <Header text={this.state.text}/>
                <Posts 
                    posts={this.state.posts}
                    onPostClick={this.onPostClick}
                />
                <Content content={content}/>
            </div>
        );
    }
}

export default App;
