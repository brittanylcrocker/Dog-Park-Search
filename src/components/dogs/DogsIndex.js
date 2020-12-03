import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'https://sleepy-temple-85343.herokuapp.com/api/hello'

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
      <div className="container">
        <h1 className="m-2 p-2">A quick note from dogs around the world</h1>
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
        <div className="container-sm">
        <div className="form-group container-sm m-2">
        <label>Enter message here.</label>
        <textarea className="form-control m-2" placeholder="Text" onChange={ this._handleChange } value={ this.state.content }/>
        <input className="form-control m-2" placeholder="http://" onChange={this._handleUrlChange} value={ this.state.url } />
        <input className="form-control m-2" placeholder="Baker Park, Coogee, Sydney, AU" onChange={this._handleLocationChange}  value={ this.state.location } />
        <input className="btn btn-success m-2" type="submit" value="Post" />
        </div>
        </div>
      </form>
    );
  }
}

const PostsDisplay = (props) => {
  return (
    <div className="container">
    <div className="container">
      <div class="row">
      { console.log(props) }
      { props.dogPosts.map((p) => (
        <div class="col-sm">
        <div className="card">
        <img className="thumbnail card-img-top" src={p.url}/>
        <div className="card-body">
        <p className="card-text">{p.text}</p>
        <ul className="list-group list-group-flush">
        <li className="list-group-item">{p.locationText}</li>
        </ul>
        </div>
        </div>
        </div>

      ))}
    </div>
    </div>
  </div>
  )
}


export default DogsIndex;
