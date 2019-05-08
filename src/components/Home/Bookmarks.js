import React, { Component } from 'react';
import './Home.css';
import Bookmark from './Bookmark';

export default class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bookmarks: null
    }
  }

  componentDidMount() {
    this.getBookmarksAPI().then((res)=>{
      this.setState((prevState, props)=>{
        return {
          bookmarks: res,
          isLoading: !prevState.isLoading
        }
      })
    })
  }

  getBookmarksAPI = async () => {
    const response = await fetch('/api/bookmarks', {
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

  render() {
    if(this.state.isLoading) return null;
    return (
      <div>
        <h4 style={{marginLeft: 15+'px', marginTop: 5+'px'}}>Marked as {(this.props.label==='important')? 'Important': 'Unfinished'}</h4>
        {
          this.state.bookmarks.map((bookmark, key)=>(
            <Bookmark bookmark={bookmark} key={key}/>
          ))
        }
      </div>
    )
  }
}