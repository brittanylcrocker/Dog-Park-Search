import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/api/hello'
const SERVER_URL_POST = 'http://localhost:5000/api/world'

let urlText = '';
let locationText = '';

class DogsIndex extends Component {
  constructor(props){
    super(props)
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      dogPosts: [],
      url: '',
      location: ''
    }

    this.setUrl = this.setUrl.bind(this)
    this.setLocation = this.setLocation.bind(this)

    const fetchDogs = async() => {
        await axios.get(SERVER_URL).then((response) => {
          console.log("FETCH DOGS: ", response.data)
          let data = response.data
          console.log(data)
        this.setState({dogPosts: data})

      }
      )}

      fetchDogs()
  }

setUrl(url) {
  this.setState({url: url})
  urlText = url
}

setLocation(location) {
  this.setState({location: location})
  locationText = location
}
  savePost( content ){
    console.log("content", content, urlText, locationText)
    content = content.toString()
    console.log("CONTENT: ", content)
    axios.post(SERVER_URL, ({text: content, url: urlText, locationText: locationText}))
      .then((result) => {
        console.log("RESULT", result.config.data)
      // this.state.dogPosts.push(result.config.data)
    })
  }

  render () {
    return (
      <div>
        <h1>A quick not from dogs around the world</h1>
          <DogPostForm onSubmit={this.savePost} onChange={this.setUrl} onLocationChange={this.setLocation}/>
          <PostsDisplay  dogPosts={this.state.dogPosts} />
      </div>
    )
  }
}

class DogPostForm extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      url: '',
      location: ''
  };
    this._handleChange = this._handleChange.bind(this)
    this._handleUrlChange = this._handleUrlChange.bind(this)
    this._handleLocationChange = this._handleLocationChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleChange(event) {
    this.setState({content: event.target.value})
  }

  _handleUrlChange(event) {
    this.setState({url: event.target.value})
    this.props.onChange(event.target.value)
  }

  _handleLocationChange(event){
    this.setState({location: event.target.value})
    this.props.onLocationChange(event.target.value)
  }


  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.content);
    this.setState({content: ''})
  }

  render() {
    return(
      <form onSubmit={ this._handleSubmit }>
        <textarea placeholder="Text" onChange={ this._handleChange } value={ this.state.content }/>
        <input placeholder="http://" onChange={this._handleUrlChange} value={ this.state.url } />
        <input placeholder="Baker Park, Coogee, Sydney, AU" onChange={this._handleLocationChange}  value={ this.state.location } />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

const PostsDisplay = (props) => {
  return (
    <div>
      { console.log(props) }
      { props.dogPosts.map((p) => (
        <div>
        <img src={p.url}/>
        <p>{p.text}</p>
        <p>{p.locationText}</p>

        </div>
      ))}
    </div>
  )
}


export default DogsIndex;
