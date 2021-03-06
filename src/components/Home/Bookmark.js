import React from 'react';
import { IoIosStar } from "react-icons/io";
import { IoIosContrast } from "react-icons/io";
import { IoIosTimer } from "react-icons/io";
import DefaultImage from "../../assets/img/programming.png";
import DetailsModal from "./DetailsModal";

export default function Bookmark(props){
  const bookmark = props.bookmark;
  const image = bookmark.image?bookmark.image:DefaultImage;

  const openLink = () => {
    window.open(bookmark.url)
  }

  return (
    <div className='bookmark row'>
      <span>
        {(()=>{if(bookmark.important) return <span><IoIosStar size={25} style={{color: '#e5f02e'}}/><br /></span>})()}
        {(()=>{if(bookmark.unfinished) return <span><IoIosContrast size={25} style={{color: '#c0d6e4'}}/><br /></span>})()}
        {(()=>{if(bookmark.remind) return <IoIosTimer size={25} style={{color: '#88a6f6'}}/>})()}
      </span>
      <div className='text-wrapper col-8' onClick={openLink}>
        {bookmark.title}
        <div className='bookmark-tags'>
          {bookmark.tags.map((tag, key)=>(
            <span className='name'>{tag.text}</span>
          ))
          }
        </div>
        <p className='note'>
          {bookmark.note}
        </p>
      </div>
      <div className='col-1'><DetailsModal details={bookmark}/></div>
      <div className='col-2' onClick={openLink} style={{
        backgroundImage: 'url(' + image + ')',
        backgroundSize:'contain',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        height: 90 + 'px',
        marginLeft:20 + 'px',
        marginTop:5+'px'
        }} alt={bookmark.title}/>
    </div>
  )
}