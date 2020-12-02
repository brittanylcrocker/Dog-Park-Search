import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/api/hello'

class DogsIndex extends Component {
  constructor(){
    super()
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
    }

    const fetchDogs = async() => {
        await axios.get(SERVER_URL).then((response) =>
        this.setState({response: response.data })
      )}

      fetchDogs()
  }







  render () {
    return (
      <div>
        <h1>A quick not from dogs around the world</h1>

      </div>
    )
  }
}


export default DogsIndex;
