// import React, { useEffect,useState } from 'react'
// import PostCar from '../components/Poooost'

// import supabase from '../lib'
// import { useSession } from '@supabase/auth-helpers-react'
// import Creation from '../components/CreatePoost'


// export default function Everything() {
//   const [posts,setPosts] = useState([])
//   useEffect(() => {
//     fetchPosts();
//   }, []);
//   function fetchPosts() {
//     supabase.from('posts')
//       .select('id, content, created_at, photos, profiles(id,username,club)')
//       .is('parent', null)
//       .order('created_at', {ascending: false})
//       .then(result => {
//         console.log('posts', result);
//         setPosts(result.data);
//       })
//   }

//   return (
//     <>
//     <Creation  onPost = {fetchPosts}/><h1 className='text-white text-2xl items-center font-bold place-content-center flex my-5'>List of Posts</h1>
//     {posts?.length > 0 && posts.map(post =>(
      
//       <PostCar key={post.created_at} content={post.content} name={post.profiles.username} fan = {post.profiles.club} photos={post.photos} id={post.id} authorid={post.profiles.id} />
//     ))}
//     </>
//   )
// }

import Account from '../components/Account'

export default function Profile(){ 


    return(<Account />)
}