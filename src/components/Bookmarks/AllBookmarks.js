import React, { Component } from 'react';
import Tags from '../Home/Tags';
import BookmarkSide from '../Home/BookmarkSide'

export default class AllBookmarks extends Component {
  render(){
    return (
      <div className='row'>
        <Tags/>
        <BookmarkSide label={'all'}/>
      </div>
    )
  }
}