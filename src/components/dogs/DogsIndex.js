import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/api/hello'
const SERVER_URL_POST = 'http://localhost:5000/api/world'

class DogsIndex extends Component {
  constructor(){
    super()
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      dogPosts: []
    }

    const fetchDogs = async() => {
        await axios.get(SERVER_URL).then((response) => {
        this.setState({dogPosts: response.data.posts })
        console.log(response.data)

      }
      )}

      fetchDogs()
  }

  savePost( content ){
    console.log("content", {text: content})
    axios.post(SERVER_URL, {text: content})
      .then((result) => {
        console.log("RESULT", result.config.data)
      // this.state.dogPosts.push(result.config.data)
    })
  }

  render () {
    return (
      <div>
        <h1>A quick not from dogs around the world</h1>
          <DogPostForm onSubmit={this.savePost}/>

          <p>{this.state.dogPosts}</p>
      </div>
    )
  }
}

class DogPostForm extends Component {
  constructor() {
    super();
    this.state = {content: ''};
    this._handleChange = this._handleChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleChange(event) {
    this.setState({content: event.target.value})
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.content);
    this.setState({content: ''})

  }

  render() {
    return(
      <form onSubmit={ this._handleSubmit }>
        <textarea onChange={ this._handleChange } value={ this.state.content }/>
        <input type="submit" value="Tell" />
      </form>
    );
  }
}


export default DogsIndex;
