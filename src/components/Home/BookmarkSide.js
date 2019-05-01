import React, { Component } from 'react';
import Unfinished from './Unfinished';
import Important from './Important';

export default function BookmarkSide() {
  return <div className='col-7'><Important /><Unfinished /></div>
}