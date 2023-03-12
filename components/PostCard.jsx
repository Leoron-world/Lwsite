import React from 'react';
import Image from 'next/image';

import Link from 'next/link';

import { grpahCMSImageLoader } from '../util';

const PostCard = ({ post }) => (
  <div className="bg-white shadow-lg rounded-lg p-0 lg:p-4 pb-7 ">
   
    <div className="relative overflow-hidden shadow-md pb-64 mb-6">
      <img src={post.featuredImage.url} alt="" className="object-top absolute h-72 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
    </div>
    
    <p className="text-lg text-center text-gray-700 font-normal px-4 lg:px-7 mb-2">
      {post.excerpt}
    </p>
    <div className="text-center">
      <Link href={`/post/${post.slug}`}>
        <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-3 cursor-pointer">Read Complete Story</span>
      </Link>
    </div>
    <div className="block lg:flex text-center items-center justify-center mb-2 w-full">
    <div className="flex justify-center mb-4 lg:mb-0 w-full lg:w-auto items-center mt-4">
        <Image
          unoptimized
          loader={grpahCMSImageLoader}
          alt={post.author.name}
          height="30"
          width="30"
          className="align-middle rounded-full"
          src={post.author.photo.url}
        />
        <p className="inline align-middle text-gray-700 font-medium text-lg">{post.author.name}</p>
      </div>
      </div>
  </div>
);

export default PostCard;