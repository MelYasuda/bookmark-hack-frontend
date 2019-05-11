import React from 'react';
import BookmarkBox from './BookmarkBox';

export default function BookmarkSide(props) {
  return (()=>{
    if(props.label==='home') {return (<div className='col-8'><BookmarkBox label={"important"} /><BookmarkBox label={"unfinished"}/></div>)} else if(props.label==='all') {
      return (<div className='col-8'><BookmarkBox label={props.label}/></div>)
    }
  })()
}