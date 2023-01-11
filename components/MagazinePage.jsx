import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MagazinePage= ( {book} ) => (

  <div className="relative h-96">
    
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72" style={{ backgroundImage: `url('${book.image[0].url}')` }} />
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      
      <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">{book.title}</p>
      <div className="flex items-center absolute bottom-5 w-full justify-center">
      
        
      </div>
    </div>
    <Link href={`/book/${book.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link>


    </div>

);

export default MagazinePage;