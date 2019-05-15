import React, { Component } from 'react';
import './Home.css';
import Bookmark from './Bookmark';
import { connect } from "react-redux";
import { fetchAllBookmarks } from '../../store/actions/bookmarks';
import { fetchImportantBookmarks } from '../../store/actions/important';
import { fetchUnfinishedBookmarks } from '../../store/actions/unfinished';
import { fetchSearchBookmarks } from '../../store/actions/search';

class Bookmarks extends Component {

  componentDidMount() {
    const {label} = this.props;
    if(label==='all'){
      this.props.fetchAllBookmarks()
    } else if(label==='Important'){
      this.props.fetchImportantBookmarks();
    }else if (label==='Unfinished'){
      this.props.fetchUnfinishedBookmarks();
    } else if (label==='search'){
      const search = this.props.location.search.substring(1);
      const values = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
      console.log(values)
      this.props.fetchSearchBookmarks({tags:values.tag});
    }
  }

  // getBookmarksAPI = async () => {
  //   const label = this.props.label
  //   let path = null;
  //   if(label==='important'||label==='unfinished') { 
  //       path='homeBookmarks' 
  //     } else if (label==='all') {
  //       path='allBookmarks' 
  //     } else if (label==='search') {
  //       path='search'
  //     }

  //     let response = ''

  //     if(label==='important'||label==='unfinished'||label==='all'){
  //       response = await fetch(`/api/bookmarks/${path}`, {
  //         method: 'get',
  //         headers: {
  //           'Authorization': 'Bearer' + ' ' + window.sessionStorage.jwtToken
  //         }
  //       })
  //     } else if(label==='search') {
        // const search = this.props.location.search.substring(1);
        // const values = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })

  //       response = await fetch('/api/bookmarks/search', {
  //         method: 'post',
  //         headers: {
  //           'Accept': 'application/json, text/plain, */*',
  //           'Content-Type': 'application/json',
  //           'Authorization': 'Bearer' + ' ' + window.sessionStorage.jwtToken
  //         },
  //         body: JSON.stringify(values)
  //         }
  //       )
  //     }

  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message) 
  //   }
  //   return body;
  // }

  render() {
    if(this.props.isLoading) return null;
    const label = this.props.label;
    if(label==='Important'){
      return (
        <div>
          <h4 style={{marginLeft: 15+'px', marginTop: 5+'px'}}>Marked as {label}</h4>
          {
            this.props.important.map((bookmark, key)=>(
              <Bookmark bookmark={bookmark} key={key}/>
            ))
          }
        </div>
      )
    }
    else if(label==='Unfinished'){
      return (
        <div>
          <h4 style={{marginLeft: 15+'px', marginTop: 5+'px'}}>Marked as {label}</h4>
          {
            this.props.unfinished.map((bookmark, key)=>(
              <Bookmark bookmark={bookmark} key={key}/>
            ))
          }
        </div>
      )
    } else if(label==='all'){
      return (
        <div>
          <h4 style={{marginLeft: 15+'px', marginTop: 5+'px'}}>Marked as {label}</h4>
          {
            this.props.bookmarks.map((bookmark, key)=>(
              <Bookmark bookmark={bookmark} key={key}/>
            ))
          }
        </div>
      )
    } else if (label==='search') {
    console.log(this.props.search)

      return (
        <div>
          <h4 style={{marginLeft: 15+'px', marginTop: 5+'px'}}>Marked as {label}</h4>
          {(()=>{
            if(!this.props.search.length){
              return <h4>No bookmarks with the tags found</h4>
            } else {
              return (
                <div>
                {
                  this.props.search.map((bookmark, key)=>(
                    <Bookmark bookmark={bookmark} key={key}/>
                  ))
                }
                </div>
              )
            }
          })()}
        </div>
      )
    }

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBookmarks: function() {
      dispatch(fetchAllBookmarks());
    },
    fetchImportantBookmarks: function() {
      dispatch(fetchImportantBookmarks());
    },
    fetchUnfinishedBookmarks: function() {
      dispatch(fetchUnfinishedBookmarks());
    },
    fetchSearchBookmarks: function(tags) {
      dispatch(fetchSearchBookmarks(tags));
    }
  };
}

const mapStateToProps = state => ({
  bookmarks: state.bookmarks.bookmarks,
  isLoading: state.bookmarks.isLoading,
  important: state.important.important,
  unfinished: state.unfinished.unfinished,
  search: state.search.search
})

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);