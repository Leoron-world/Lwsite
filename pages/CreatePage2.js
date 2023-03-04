import supabase from "../lib";
import React from "react";
import Creationtwo from '../components/CreatePage2'
import { useState } from "react";

  export default function CreatePage() {

    const [posts,setPosts] = useState([])

  function fetchPosts() {
    supabase.from('posts')
      .select('id, content, created_at, photos, title ,profiles(id,username,club)')
      .is('parent', null)
      .order('created_at', {ascending: false})
      .then(result => {
        console.log('posts', result);
        setPosts(result.data);
      })
  }



    return(
        <>
         <Creationtwo  onPost = {fetchPosts}/> 
        </>
    );
  }