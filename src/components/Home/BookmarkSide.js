import React from 'react';
import BookmarkBox from './BookmarkBox';

export default function BookmarkSide(props) {
  return (()=>{
    if(props.label==='home') {
      return (
        <div className='col-8'>
          <BookmarkBox label={"Important"} />
          <BookmarkBox label={"Unfinished"}/>
        </div>
        )
      } else if(props.label==='all' || props.label==='search') {
      return (
        <div className='col-8'>
          <BookmarkBox label={props.label} location={props.location}/>
        </div>
        )
        } 
  })()
}