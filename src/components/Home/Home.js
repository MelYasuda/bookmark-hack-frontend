import React, { Component } from 'react';
import Tags from './Tags';
import BookmarkSide from './BookmarkSide';

export default class Home extends Component {
  render() {
    return (
    <div className='Home'>
      <div className='row'>
        <Tags />
        <BookmarkSide />
      </div>
    </div>
    )
  }
}