import React, { useEffect,useState } from 'react'
import PostCar from '../../components/Poooost'
import supabase from '../../lib'
import Link from 'next/link'
import cover from '../../public/bg.jpg'
import Image from 'next/image'
export default function Everything() {

  const [posts,setPosts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchIndex, setSearchIndex] = useState("");
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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


  const handleGoToIndex = () => {
    const index = parseInt(searchIndex, 10) - 1; // subtracting 1 as array index starts from 0
    if (index >= 0 && index < posts.length) {
      setCurrentIndex(index);
      setSearchIndex("");
    } else {
      alert("Invalid index");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-4">
        <label className='text-white px-3'>Which Page Do You Want To Go ?</label>
        <input
          type="number"
          value={searchIndex}
          placeholder={currentIndex + 1 }
          onChange={(e) => setSearchIndex(e.target.value)}
          className="border border-gray-400 px-2 py-1 mr-2 rounded my-5"
        />
        <button
          onClick={handleGoToIndex}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Go
        </button>
      </div>
    
    {posts?.length > 0 && (
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-green-500 text-white px-4 py-1 mx-2 rounded-xl"
          >
           Prev
          </button>
       
        
          <PostCar
            key={posts[currentIndex].created_at}
            content={posts[currentIndex].content}
            name={posts[currentIndex].profiles.username}
            fan={posts[currentIndex].profiles.club}
            photos={posts[currentIndex].photos}
            id={posts[currentIndex].id}
            authorid={posts[currentIndex].profiles.id}
            heading={posts[currentIndex].title}
          />
          <button
            onClick={handleNext}
            disabled={currentIndex === posts.length - 1}
            className="bg-green-500 text-white px-4 py-1 mx-2 rounded-xl"
          >
            Next
          </button>
         
        </div>
      )}
 <span className='text-white text-center flex place-content-center py-24 '>
         Create Your Own Magazine Page!     <Link href='/CreatePage' className='text-green-500 underline italic px-2'>    Click Here</Link></span>
    </div>
  )
}

