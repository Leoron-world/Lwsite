
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import supabase from "../lib";


export default function Creationtwo({onPost}) {
 const session = useSession();
 const [content,setContent] = useState('')
 const [title,setTitle] = useState('')
 const [uploads , setUploads] = useState([])
 const [heading, setHeading] = useState('')
 const [isUploading , SetIsUploading] = useState(false)

 function createPost(){
  
  supabase.from('post2').insert({
      author:session.user.id,
      title,
      content,
      photos:uploads,
  }).then(response => {
      if(!response.error){
          setContent('');
          setUploads([]);
          alert("Success!");
          if(onPost){
            onPost();
          }
      }
  })
 }
//https://swqqmxaxhvztuvqqjbqg.supabase.co/storage/v1/object/public/photos/1676605603254Screenshot%202023-02-15%20at%2011.19.49%20AM.png

 async function addPhotos(e) { 

  const files = e.target.files;
  if(files.length > 0){
    SetIsUploading(true);
  for( const file of files ) {
    const newName =Date.now() + file.name;
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
  SetIsUploading(false);
 }
}
return (
  <div>
    <div className="flex place-content-center">
          <div className=" mx-11 px-7 mt-4 border-2 ring-2 w-1/2 ">
            <h1 className="text-4xl py-11 text-white flex place-content-center">
                Create Your Own Magazine Page !
            </h1>
            <label className="text-green-500">Title: </label>
            <input type="text" placeholder="Enter Title of the Magazine Page" onChange = {e => setTitle(e.target.value)} className="w-full"/>
            <p className="text-green-500 py-4">Content:
           <textarea  
             value={content} 
             onChange={e => setContent(e.target.value)}
             className="text-black border-4  w-full mt-4"  /></p>
             {isUploading && (
                <div>Photos are uploading please wait </div>
             )}
             {uploads.length > 0 && (
                <div className="flex-gap-4 ">
                    {uploads.map(upload => (
                        <div className="h-12"><img src={upload} alt='alternate' className="w-auto h-12 rounded-md"/></div>
                    ))}
                    </div>
             )}
             <p className="text-green-600 ">Upload Photos<input type="file" onChange={addPhotos} className="px-11 py-4"/></p>
           <button onClick={createPost} className="px-3 bg-blue-500 py-1 rounded-xl text-white">Create Post</button>
       </div>

       </div>
       <h1 className="text-green-500 text-2xl text-center mt-11">
    Read Community Guidelines Before Posting
   </h1>
<div className="flex place-content-center py-11">
      
   <p className="text-white">
Guidelines for page 2
</p>

</div>
</div>
);
}