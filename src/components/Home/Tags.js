import React, { Component } from 'react';
import Tag from './Tag';
import './Home.css';
import { connect } from "react-redux";

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tags: null
    }
  }

  componentDidMount() {
    this.callBackendAPI().then((res)=> {
      this.setState((prevState, props)=>{
        return { tags: res, isLoading: !prevState.isLoading}
      })
    }).catch(error => console.log(error))
  }

  callBackendAPI = async () => {
    const response = await fetch('/api/tags', {
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

  render(){
    if(this.state.isLoading) return null;
    if(this.props.label==='search') {
      return(
        <div className='col-7'>
          {this.props.searchTags.map((tag, key) => (
            <Tag
              label={this.props.label}
              location={this.props.location}
              history={this.props.history}
              tag={tag}
              key={key}
            />
          ))}
        </div>
      )
    }
    return(
      <div className='tag-list col-3'>
        {this.state.tags.map((tag, key) => (
          <Tag
            location={this.props.location}
            history={this.props.history}
            tag={tag}
            key={key}
          />
        ))}</div>
    )
  }
}

const mapStateToProps = state => ({
  searchTags: state.search.searchTags
})

export default connect(mapStateToProps)(Tags);