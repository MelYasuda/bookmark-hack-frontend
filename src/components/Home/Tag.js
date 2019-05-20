import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchSearchBookmarks } from '../../store/actions/search';
import { IoIosCloseCircleOutline } from "react-icons/io";
import Alert from 'react-s-alert';

class Tag extends Component {

  onClickTag = (text) => {
    let q = ''
    if(!this.props.location.search) {
      q = text;
    } else {
      const search = this.props.location.search;
      const pervQs = search.slice(5,search.length).split('+');
      if(pervQs.includes(text)) {
        return Alert.warning('You alredy have the tag in the search',{
          position:'bottom-left',
          timeout: 9000
        });
      }
      q = `${search.slice(5,search.length)}+${text}`;
    }
    this.props.history.push({
      pathname:'/bookmarks/search',
      search: `?tag=${q}`
    })
    const searchTags = q.split("+");
    this.props.fetchSearchBookmarks({tags: searchTags})
  }

  onClickCloseButoon = (text) => {
    const search = this.props.location.search;
    let q = search.slice(5,search.length).split('+');
    console.log(q)
    const index = q.indexOf(text);
    q.splice(index, 1);
    if(q.length){
      this.props.fetchSearchBookmarks({tags: q});
      const joinedQ = q.join('+')
      this.props.history.push({
        pathname:'/bookmarks/search',
        search: `?tag=${joinedQ}`
      })
    } else {
      this.props.history.push('/home')
    }
  }

  render() {
    if(this.props.label==='search'){
      return <span className='name'>   {this.props.tag}<IoIosCloseCircleOutline onClick={()=>this.onClickCloseButoon(this.props.tag)}/>   </span>
    }
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
