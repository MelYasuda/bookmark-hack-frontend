import React, { Component } from 'react';
import Tag from './Tag';
import './Home.css';

export default class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tags: null
    }
  }

  componentDidMount() {
    this.callBackendAPI().then((res)=> {
      this.setState((prevState, props)=>{
        return { tags: res, isLoading: !prevState.isLoading}
      })
    }).catch(error => console.log(error))
  }

  callBackendAPI = async () => {
    const response = await fetch('/api/home', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer' + ' ' + window.sessionStorage.jwtToken
      }
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }

  render(){
    if(this.state.isLoading) return null;
    return(
      <div className='tag-list col-3'>
        {this.state.tags.map((tag, key) => (
          <Tag
            name={tag.name}
            key={tag.key}
          />
        ))}</div>
    )
  }
}