import React, { Component } from 'react';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        auther: 'A',
        id: null
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps - NewPost - nextProps", nextProps);
        if (nextProps.postDetails) {
            const editablePost = {...nextProps.postDetails};
            this.setState({
                title: editablePost.title,
                content: editablePost.content,
                auther: editablePost.auther,
                id: editablePost.id
            })
        }
    }

    onAddUpdatePost = (caption) => {
        const data = {
            title: this.state.title,
            content: this.state.content,
            auther: this.state.auther,
            id: caption == "Add" ? new Date() : this.state.id
        }

        if (!data.title) {
            alert("Add Title");
            return false;
        }

        if (caption == "Add") {
            this.props.addPost(data);
        } else {
            this.props.updatePost(data);
        }
        
        this.clearPostHandler();
    }

    clearPostHandler = () => {
        this.setState({
            title: '',
            content: '',
            auther: 'A',
            id: null
        })
    }

    componentDidUpdate() {
        
    }

    render() {
        let titleCaption = 'Add';
        if (this.props.postDetails) {
            titleCaption = 'Update'
        }

        return (
            <div className="new-post">
                <h2>{titleCaption} a New Post</h2>
                <p>
                    <label>Title: </label>
                    <input type="text" value={this.state.title} onChange={(ev) => this.setState({title: ev.target.value})} />
                </p>
                <p>
                    <label>Content: </label>
                    <textarea value={this.state.content} onChange={(ev) => this.setState({content: ev.target.value})} />
                </p>
                <p>
                    <label>Auther: </label>
                    <select value={this.state.auther} onChange={(ev) => this.setState({auther: ev.target.value})}>
                        <option value="A">Default Author</option>
                        <option value="B">Author 2</option>
                        <option value="C">Author 3</option>
                    </select>
                </p>
                <button onClick={this.clearPostHandler}>Clear</button>
                <button onClick={() => this.onAddUpdatePost(titleCaption)}>{titleCaption} Post</button>
            </div>
        )
    }
}

export default NewPost;