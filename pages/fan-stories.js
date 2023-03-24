import { FeaturedPosts } from '../sections/index';
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services';
import { useState, useEffect } from 'react';

export default function fanstories({ posts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true); // new state variable

  const filteredPosts = posts.filter((post) => {
    return post.node.title.includes(searchQuery) || post.node.author.name.includes(searchQuery);
  });

  useEffect(() => {
    setIsLoading(false);
  }, []); // set isLoading to false after rendering the component

  return (
    <div className="container mx-auto px-10 mb-8">
      <input
        type="text"
        placeholder="Search author or Title"
        className="w-full p-2 rounded-lg shadow-md mb-9"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          <div className="text-4xl text-white py-4 mb-4">
            <h1 className="text-center">Check Out Our Top Fan Stories</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {filteredPosts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts,fallback: true },
    
  };
}