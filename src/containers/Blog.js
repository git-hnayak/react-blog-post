import React, { Component } from 'react';
import NewPost from './NewPost';
import Post from '../components/Post';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        selectedPostDetails: null
    }

    addPosthandler = (postData) => {
        this.setState({
            //use concat instead push method to update array immutably. (array concat() method does not change the existing arrays, but instead returns a new array.)
            posts: this.state.posts.concat(postData) 
        })
    }

    updatePosthandler = (postData) => {
        //Updating immutably
        const posts = this.state.posts.map(post => {
            if (post.id == postData.id) {
                post = postData
            }
            return post
        });

        this.setState({
            posts,
            selectedPostDetails: null
        })

    }

    deletePostHandler = (postId) => {
        //removing elements from array in immutable way by using array filter() method
        const filteredPost = this.state.posts.filter(post => {
            return post.id !== postId
        });

        this.setState({
            posts: filteredPost
        })
    }

    editPostHandler = (postData) => {
        this.setState({
            selectedPostDetails: postData
        })
    }

    render() {
        console.log("Rendering - Blog");
        let postList = null;
        if (this.state.posts.length > 0) {
            postList = (
                <ul>
                    {this.state.posts.map(post => {
                        return <Post key={post.id} postData={post} deletPost={this.deletePostHandler} editPost={this.editPostHandler}/>
                    })}
                </ul>
            )
        }

        return (
            <div>
                <div className="Blog">
                    <div>
                        <NewPost addPost={this.addPosthandler} updatePost={this.updatePosthandler} postDetails={this.state.selectedPostDetails}/>
                    </div>
                    <div className="post-list">
                        {postList}
                    </div>
                </div>
            </div>
        )
    }
}

export default Blog;