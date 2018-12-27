import React, { Component } from 'react';
import './Posts.css';

class Post extends Component {
    handleClick = () => {
        this.props.onPostClick(this.props.index)
    }

    render() {
        return (
            <div className="Post"
                onClick={this.handleClick}
            >
                {this.props.index}
            </div>
        )
    }

}

class Posts extends Component {

    constructor(props) {
        super(props)
        this.PostList = this.PostList.bind(this)
    }

    PostList(props) {
        return props.posts.map((post, index) =>  {
            return <Post 
                onPostClick={this.props.onPostClick}
                key={post.guid}
                index={index}
            />
        }, this)
    }

    render() {
        return (
            <div className="Posts">
                <this.PostList 
                    posts={this.props.posts}
                />
            </div>
        );
    }
}

export default Posts;
