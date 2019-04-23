import React, { Component } from 'react';
import './Welcome.css'

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: ['JavaScript', 'React', 'ReactNative', 'Redux', 'Angular', 'Python', 'Java', 'C#', 'SQL', 'Swift', 'Go', 'HTML', 'CSS', 'FrontEnd', 'BackEnd', 'node.js', 'library', 'framework', 'database', 'Firebase', 'AWS', 'Azure', 'API', 'git', 'testing'],
      selectedTags: []
    }
  }

  addTags = (tag, index) => {
    const newtagList = [...this.state.tagList];
    newtagList.splice(index, 1);
    const newSelectedTags = [...this.state.selectedTags];
    newSelectedTags.push(tag)
    this.setState((prevState, props) => {
      return {
        tagList: newtagList,
        selectedTags: newSelectedTags
      }
    })
  }

  removeTags = (tag, index) => {
    console.log(tag, index)
    const newSelectedTags = [...this.state.selectedTags];
    newSelectedTags.splice(index, 1);
    const newtagList = [...this.state.tagList];
    newtagList.push(tag)
    this.setState((prevState, props) => {
      return {
        tagList: newtagList,
        selectedTags: newSelectedTags
      }
    })
  }

  render() {
    return (
      <div className='Welcome'>
        <h3>Welcome to Bookmark Hack!</h3>
          <div className='tags'>
            <ul className='row'>
              {this.state.tagList.map((tag, index) => (
                <li className='col-md-3'><div className='tag' onClick={() => this.addTags(tag, index)}>{tag}</div></li>
              ))}
            </ul>
          </div>
        
          <div className='tags'>
            <ul className='row'>
              {this.state.selectedTags.map((tag, index) => (
                <li className='col-md-3' onClick={() => this.removeTags(tag, index)}><div className='tag'>{tag}</div></li>
              ))}
            </ul>
          </div>
      </div>
    )}
}