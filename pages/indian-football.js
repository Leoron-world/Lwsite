import React, { useState, useEffect } from "react";
import supabase from "../lib";
import { useSession } from "@supabase/auth-helpers-react";
import Link from "next/link";
import loadingImage from '../public/bg.jpg'
import Image from "next/image";

export default function ifootball() {
    const session = useSession();
    const [ideas, setIdeas] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [headLine , setHeadLine] = useState('');
    const [uploads , setUploads] = useState([]);
    const [isUploading, setIsUploading] = useState('');

    useEffect(() => {
        fetchIdeas();
    }, []);


    async function fetchIdeas() {
      setIsLoading(true); // set isLoading to true before making the API call
      await supabase
        .from("idealist")
        .select("*,profiles(*)")
        // .is("parent", null) 
        // .is("photos", null)
        .then((result) => {
          setIdeas(result.data);
          setIsLoading(false); // set isLoading to false once the API call is complete
        });
    }
 
    async function addPhotos(e) { 

        const files = e.target.files;
        if(files.length > 0){
          setIsUploading(true);
        for( const file of files ) {
          const newName = Date.now() + file.name;
          const result = await supabase.storage.from('photos')
          .upload(newName, file)
          if(result.data) {
              const url = process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/photos/' + result.data.path
              setUploads(prevUploads => [...prevUploads,url]);
      }
           else {
          console.log(result);
          }  
        }
        setIsUploading(false);
       }
      }

    function postIdea(ev) {
        ev.preventDefault();
        supabase
            .from('idealist')
            .insert([
                {
                    author: session.user.id,
                    title: headLine,
                    photo: uploads,
                },
            ])
            .then((result) => {
                console.log(result);
                
                alert('posted');
                fetchIdeas();
                
                setHeadLine('');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    if (isLoading) { // if isLoading is true, render the loading animation
      return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
    </div>;
    }

    return (
        <div>
            { ideas && ( 
    <div className="mx-11">
    <div className="shadow-lg rounded-lg  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-11 justify-between">
    {ideas.map((idea) => (
        
      <div className='bg-white rounded-xl' key={idea.id}>
        <div className="overflow-hidden shadow-lg  ">
          <img src={idea.photo} alt="" className="object-top object-fit shadow-lg rounded-t-lg lg:rounded-lg rounded-full" />
        </div>
        <div className="pt-11 items-center text-center">
          <Link href={`/idea/${idea.id.toString()}`}>
            <span className="transition duration-500 ease transform hover:-translate-y-1  bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-3 cursor-pointer">Read More</span>
          </Link>
        </div>
        <div className=" mb-4 lg:mb-0 w-full lg:w-auto items-center mt-4 text-center">
        <p className=" align-middle text-gray-700 font-medium text-lg">{idea.title}</p>
          <p className=" align-middle text-gray-700 font-medium text-lg">Written By: {idea.profiles.username}</p>
        </div>
      </div>
      
    ))}
  </div>
  </div>
)}
    <form onSubmit={postIdea} className="flex flex-col place-content-center items-center mb-10 py-2 mt-48">
              
               
    <input type="text" placeholder="Enter title of your idea" onChange={(e) => setHeadLine(e.target.value)} className="mx-3 my-2 p-2 rounded-lg border-gray-400 border-2 focus:border-green-500 focus:outline-none w-72 right-0" />
    
    <div className="w-72  bg-white">
      
        <input type='file' placeholder='Select Photo' onChange={addPhotos} className=" text-black overflow-scroll p-2 rounded-md cursor-pointer transition duration-300" id="file-input" />
        
        {isUploading && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center text-white px-3 rounded-md">
                Photos are uploading, please wait...
            </div>
        )}
    </div>
    {uploads.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-2">
            {uploads.map(upload => (
                <div key={upload} className="h-12 w-auto">
                    <img src={upload} alt='alternate' className="w-auto h-12 rounded-md" />
                </div>
            ))}
        </div>
    )}
    
    <button type="submit" className='mt-11 bg-green-500 text-white px-5 py-2 rounded-lg  transition duration-300 hover:bg-green-600 mx-28'>Post Idea</button>
</form>



    </div>
    );
}



