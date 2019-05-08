import React from 'react';
import BookmarkBox from './BookmarkBox';

export default function BookmarkSide() {
  return <div className='col-8'><BookmarkBox label={"important"} /><BookmarkBox label={"unfinished"}/></div>
}