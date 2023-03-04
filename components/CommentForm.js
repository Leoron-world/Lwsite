import React from 'react';
import { useState } from 'react';
import supabase from '../lib';

export default function CommentForm(){
  const [commentText,setCommentText] = useState('')


  async function postComment(){
   const {data} =  supabase.from('commentss').select(`comment`)
   if(data){
    
   }
  }

  return(
    <>
    <form onSubmit={postComment}>
    <input
    value={commentText}
    onChange={e => setCommentText(e.target.value)}
    className="block w-full p-3 px-4 overflow-hidden text-black bg-white py-2"
    placeholder='Enter a comment' />
    </form>
    </>

  );
}