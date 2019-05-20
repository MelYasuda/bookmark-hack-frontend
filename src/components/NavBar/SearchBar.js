import React, { Component } from 'react';
import { connect } from "react-redux";
import { WithContext as ReactTags } from 'react-tag-input';
import { fetchSearchBookmarks } from '../../store/actions/search';
import Alert from 'react-s-alert';

const KeyCodes = {
  SPACE: 32,
  COMMA: 188,
  ENTER: 13,
};

const delimiters = [KeyCodes.SPACE, KeyCodes.COMMA, KeyCodes.ENTER];

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tags: [],
      suggestions: []
    }
  }

  componentDidMount(){
    this.getTagSuggestions().then((tags)=>{
      const tempTags = [];
      tags.map(tag =>{
        tempTags.push({id: tag, text: tag})
      })
      this.setState((prev, props)=>{
        return {
          suggestions: [...tempTags]
        }
      })
    })
  }

  getTagSuggestions = async () => {
    const response = await fetch('/api/tags/', {
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

  handleAddition = (text) => {
    let q = ''
    if(!this.props.location.search) {
      q = text.text;
    } else {
      const search = this.props.location.search;
      const pervQs = search.slice(5,search.length).split('+');
      if(pervQs.includes(text.text)) {
        return Alert.warning('You alredy have the tag in the search',{
          position:'bottom-left',
          timeout: 9000
        });
      }
      q = `${search.slice(5,search.length)}+${text.text}`;
    }
    this.props.history.push({
      pathname:'/bookmarks/search',
      search: `?tag=${q}`
    })
    const searchTags = q.split("+");
    this.props.fetchSearchBookmarks({tags: searchTags})
}

  render() {
    const {tags, suggestions} = this.state;
    return(
    <ReactTags 
      suggestions={suggestions}
      handleAddition={this.handleAddition}
      handleDelete={this.handleDelete}
      delimiters={delimiters} 
      />)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchBookmarks: function(tags) {
      dispatch(fetchSearchBookmarks(tags));
    }
  };
}

export default connect(null, mapDispatchToProps)(SearchBar);