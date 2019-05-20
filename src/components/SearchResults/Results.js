import React, { Component } from 'react';
import Tags from '../Home/Tags';
import BookmarkSide from '../Home/BookmarkSide';

export default class Results extends Component {
  render(){
    return (
      <div className='row body'>
        <Tags 
          history={this.props.history}
          location={this.props.location}
          />
        <BookmarkSide label={'search'} 
        location={this.props.location}
        history={this.props.history}/>
      </div>
    )
  }
}