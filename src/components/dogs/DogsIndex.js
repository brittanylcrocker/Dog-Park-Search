import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/api/hello'
const SERVER_URL_POST = 'http://localhost:5000/api/world'

let urlText = ''

class DogsIndex extends Component {
  constructor(props){
    super(props)
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      dogPosts: [],
      url: ''
    }

    this.setUrl = this.setUrl.bind(this)

    const fetchDogs = async() => {
        await axios.get(SERVER_URL).then((response) => {
          console.log("FETCH DOGS: ", response.data)
        this.setState({dogPosts: response.data.posts })
        console.log(response.data)

      }
      )}

      fetchDogs()
  }

setUrl(url) {
  this.setState({url: url})
  urlText = url
}
  savePost( content ){
    console.log("content", content, urlText)
    content = content.toString()
    console.log("CONTENT: ", content)
    axios.post(SERVER_URL, ({text: content, url: urlText}))
      .then((result) => {
        console.log("RESULT", result.config.data)
      // this.state.dogPosts.push(result.config.data)
    })
  }

  render () {
    return (
      <div>
        <h1>A quick not from dogs around the world</h1>
          <DogPostForm onSubmit={this.savePost} onChange={this.setUrl}/>

          <p>{this.state.dogPosts}</p>
      </div>
    )
  }
}

class DogPostForm extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      url: ''
  };
    this._handleChange = this._handleChange.bind(this)
    this._handleUrlChange = this._handleUrlChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleChange(event) {
    this.setState({content: event.target.value})
  }

  _handleUrlChange(event) {
    this.setState({url: event.target.value})
    this.props.onChange(event.target.value)
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
        <textarea onChange={this._handleUrlChange}  value={ this.state.url } />
        <input type="submit" value="Tell" />
      </form>
    );
  }
}

const PostDisplay = (props) => {
  return (
    <div>
    </div>
  )
}


export default DogsIndex;
