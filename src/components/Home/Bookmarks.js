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
    const label = this.props.label
    let path = null;
    if(label==='important'||label==='unfinished') { 
        path='homeBookmarks' 
      } else if (label==='all') {
        path='allBookmarks' 
      } else if (label==='search') {
        path='search'
      }

      let response = ''

      if(label==='important'||label==='unfinished'||label==='all'){
        response = await fetch(`/api/bookmarks/${path}`, {
          method: 'get',
          headers: {
            'Authorization': 'Bearer' + ' ' + window.sessionStorage.jwtToken
          }
        })
      } else if(label==='search') {
        const search = this.props.location.search.substring(1);
        const values = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })

        response = await fetch('/api/bookmarks/search', {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + ' ' + window.sessionStorage.jwtToken
          },
          body: JSON.stringify(values)
          }
        )
      }

    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }

  handleLabel = (label) => {
    if(label==='important') {
      return {bookmarks: this.state.bookmarks.selectedImportant, label: 'Important'}
    } else if (label==='unfinished') {
      return {bookmarks: this.state.bookmarks.selectedUnfinished, label: 'Unfinished'}
    } else if(label==='all') {
      return {bookmarks: this.state.bookmarks, label: 'All Bookmarks'}
    } else if(label==='search') {
      return {bookmarks: this.state.bookmarks, label: ''}
    }
  }

  render() {
    if(this.state.isLoading) return null;
    const {bookmarks, label} = this.handleLabel(this.props.label)
    return (
      <div>
        <h4 style={{marginLeft: 15+'px', marginTop: 5+'px'}}>Marked as {label}</h4>
        {
          bookmarks.map((bookmark, key)=>(
            <Bookmark bookmark={bookmark} key={key}/>
          ))
        }
      </div>
    )
  }
}