import React, { Component } from 'react';
import Tags from './Tags';
import BookmarkSide from './BookmarkSide';

export default class Home extends Component {
  render() {
    return (
    <div className='Home'>
      <div className='row body'>
        <Tags 
          history={this.props.history}
          location={this.props.location}/>
        <BookmarkSide label={'home'}/>
      </div>
    </div>
    )
  }
}