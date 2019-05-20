import React from 'react';
import './Home.css';
import Bookmarks from './Bookmarks';

export default function BookmarkBox(props){
    return (
      <div className='bookmark-box'>
        <Bookmarks label={props.label} 
        history={props.history}
        location={props.location}/>
      </div>
    )
}