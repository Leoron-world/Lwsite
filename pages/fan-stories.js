

import { FeaturedPosts } from '../sections/index';
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services';
import { useState } from 'react';

export default function fanstories({posts}) {
  
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    return post.node.title.includes(searchQuery) || post.node.author.name.includes(searchQuery);
  });
  return (
    <div className="container mx-auto px-10 mb-8">
        <input
      type="text"
      placeholder="Search author or Title"
      className="w-full p-2 rounded-lg shadow-md mb-9"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <div className='text-4xl text-white py-4 mb-4'><h1 className='text-center'>Check Out Our Top Fan Stories</h1></div>
      {/* <FeaturedPosts /> */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          
            {filteredPosts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
           
          
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div> */}

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
      {filteredPosts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
      </div>

    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}
