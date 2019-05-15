import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchSearchBookmarks } from '../../store/actions/search';

class Tag extends Component {

  onClickTag = (text) => {
    console.log(this.props.location)
    let q = ''
    if(!this.props.location.search) {
      q = text;
    } else {
      const search = this.props.location.search
      q = `${search.slice(5,search.length)}+${text}`;
    }
    this.props.history.push({
      pathname:'/bookmarks/search',
      search: `?tag=${q}`
    })
    this.props.fetchSearchBookmarks({tags: q})
  }

  render() {
    return <span className='name' onClick={()=>this.onClickTag(this.props.tag)}> {this.props.tag}</span>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchBookmarks: function(tags) {
      dispatch(fetchSearchBookmarks(tags));
    }
  };
}

export default connect(null, mapDispatchToProps)(Tag);
