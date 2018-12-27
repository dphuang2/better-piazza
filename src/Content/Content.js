import React, { Component } from 'react';
import './Content.css';

class Content extends Component {
    render() {
        return (
            <div className="Content">
                {this.props.content}
            </div>
        );
    }
}

export default Content;
