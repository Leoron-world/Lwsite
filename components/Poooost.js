import { useContext, useEffect, useState } from "react";
import supabase from '../lib'
import Link from "next/link";
import { useUser, useSession } from "@supabase/auth-helpers-react";
import editIcon from '../public/editcomment.jpeg'
import Image from "next/image";
import deleteIcon from '../public/trash.png'


export default function PostCard({ content, name, fan, photos, id, authorid, heading }) {
  const session = useSession();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [editing, setEditing] = useState('');
  const [deleting, setDeleting] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);
 
  function fetchComments() {
    supabase
      .from('posts')
      .select('*,profiles(*)')
      .eq('parent', id)
      .then(result => setComments(result.data));

  }

  function deleteComments(){
 
  
    supabase
    .from('posts')
    .delete()
    .eq('id',deleting)
    .then((result) => {
      setDeleting('');
      alert("comment deleted successfully");
      fetchComments();
    })
    .catch((error) => {
      console.log(error);
    })
  }
  function editComment(e) {
    e.preventDefault();
    supabase
      .from("posts")
      .update({
        content: newCommentText
      })
      .eq("id", editing)
      .then((result) => {
        setEditing('');
        alert("Comment updated successfully.");
        fetchComments();
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }




  function postComment(ev) {
    ev.preventDefault();
    supabase
      .from('posts')
      .insert([
        {
          content: commentText,
          author: session.user.id,
          parent: id,
        },
      ])
      .then((result) => {
        console.log(result);
        alert('posted');
        fetchComments();
        setCommentText('');
      })
      .catch((error) => {
        console.error(error);
      });
  }


 
  const currentPost = (
    <div className="w-full p-4">
      <div className={`${fan} rounded-lg shadow-lg p-6 h-full flex `}>
        <div className=''>
          <p className="text-lg font-medium mb-2">Post title: {heading} </p>
          <p className="text-white text-sm mb-2">Name of Author: {name}</p>
          <p className="text-white text-sm mb-4">Club of Author: {fan}</p>
          <div className="mb-4">
            <p>Post Content : {content}</p>
          </div>
          {photos?.length > 0 && (
            <div className="flex gap-4">
              {photos.map((photo) => (
                <div key={photo} className="">
                  <img src={photo} className="rounded-md w-full" alt="" />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center ">
        <div className="w-1/2 overflow-auto">{currentPost}</div>
        <div className="w-1/2 commentsection py-5 my-5 mx-5 flex flex-col justify-between overflow-auto">
          <div className="overflow-hidden">
            <h1 className='text-xl text-white tracking-wide px-3 mb-5 italic'>
              {comments.length} <span className="italic bold"> Comments </span>
            </h1>
            {comments.length > 0 &&
              comments.map((comment) => (
                <div key={comment.id} className="mt-2 flex gap-1 items-center ">
                  <div className={`py-2 px-4 rounded-3xl ${comment.profiles.club} mx-3`}>
                    <div>
                      <span className={`logo${comment.profiles.club} px-3 mr-1`}></span>
                      <span className={`hover:underline font-thin font-serif mr-1 u${comment.profiles.club}`}>
                        {comment.profiles.username}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>


                    {/* --------------------------------------------------------- */}

                    {
                      comment.author == session.user.id &&
                      <div>
                      <button onClick={() => setEditing(comment.id)} className="px-3"><Image src={editIcon} alt='edit comment' height={25} width={25}/></button>
                      <button onClick={() => setDeleting(comment.id)}><Image src ={deleteIcon} height = {17} width={17} className="py-1"/></button>
                      </div>
                    }
                    {editing == comment.id &&
                      <>
                        <input type="text" placeholder="Enter new" onChange={(e) => setNewCommentText(e.target.value)} />
                        <button onClick={editComment}>Update</button>
                      </>
                    }
                    {deleting == comment.id && deleteComments()}
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-4">
            <form onSubmit={postComment} className="flex">
              <input
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                className="w-full p-2 rounded-lg border-gray-300 bg-white ml-3"
                placeholder="Write a comment..."
              />
              <button
                onClick={postComment}
                className="bg-green-500 text-white rounded-lg px-4 mx-2 py-2 ml-4 focus:outline-none"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}



