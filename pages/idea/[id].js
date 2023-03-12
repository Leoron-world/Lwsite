import { useRouter } from 'next/router';
import supabase from '../../lib';
import { useState, useEffect } from 'react';
import { useSession } from '@supabase/auth-helpers-react';


export default function IdeaDetail() {
    const session = useSession();
    const currentUser = session?.user?.id;

    const router = useRouter();
    const { id } = router.query;
    const [ideas, setIdeas] = useState(null);
    const [thoughts, setThoughts] = useState('');
    const [view, setView] = useState('');
    const [comments, setComments] = useState('');
    const [commentText, setCommentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [author, setAuthor] = useState('');
    const [uploads, setUploads] = useState([]);
    const [isUploading,setIsUploading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await fetchAuthor();
            await fetchIdea();
            await fetchComments();
        }
        fetchData();
    }, [author]);


    async function fetchAuthor() {
        await supabase
            .from('ideas')
            .select('author')
            .eq('id', id)
            .then((result) => {
                setAuthor(result.data);
            })
            .catch((err) => console.log(err));
    }

    async function fetchIdea() {
        if (currentUser && author) {
            await supabase
                .from('ideas')
                .select('*,profiles(*)')
                .eq('author', author[0].author)
                .is('content', null)
                .is('background', null)
                .then((result) => setIdeas(result.data))
                .catch((error) => console.error(error));
        }
    }


    async function fetchComments() {
        await supabase
            .from('ideas')
            .select('*,profiles(*)')
            .eq('parent', id)
            .is('thoughts', null)
            .then(result => setComments(result.data));

    }
    async function postComment(ev) {
        ev.preventDefault();
        await supabase
            .from('ideas')
            .insert([
                {
                    content: commentText,
                    author: session.user.id,
                    parent: id,
                },
            ])
            .then((result) => {
                alert('posted');
                fetchComments();
                setCommentText('');
            })
            .catch((error) => {
                console.error(error);
            });
    }





    async function postIdea(e) {
        e.preventDefault();
        await supabase
            .from('ideas')
            .insert([
                {
                    author: session.user.id,
                    thoughts: view,
                    photos:uploads,
                },
            ])
            .then((result) => {
                alert('posted');
                fetchIdea();
                setThoughts('');
                setView('');
                setUploads([]);

            });
    }


    async function addPictures(e) { 

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

    const goToPreviousIdea = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const goToNextIdea = () => {
        if (currentIndex < ideas.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    if (!ideas) {
        return <div>Loading...</div>;
    }

    return (
        <div className="indian-flag">
            {session && (
                <div className="flex items-center ">
                    <button
                        className=" bg-orange-600 left-0 top-1/2 transform -translate-y-1/2 px-3 text-white rounded-md flex items-center justify-center"
                        onClick={goToPreviousIdea}
                    >
                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-white ">
                            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                        </svg>
                        
                    </button>
                    <div className="w-full flex justify-center relative">

                        <div className="w-1/2 text-blue-600 bg-white mx-6  p-4 rounded-xl mt-48 ring-2 ring-blue-600">
                            {ideas[currentIndex]?.thoughts && (
                                <div>
                                    <p className="text-xl font-bold text-black">{ideas[currentIndex].thoughts}</p>
                                    <img className='object-bottom w-full object-contain mb-4 mt-9' src={ideas[currentIndex].photos} alt='photo supporting the idea'/>
                                </div>
                            )}
                        </div>
                        <div className="w-1/2 bg-white rounded-xl p-4 mt-48 ring-2 ring-blue-600">
                            <h1 className="text-2xl font-bold mb-4 ">Comment Section</h1>
                            {comments &&
                                comments.map((comment) => (
                                    <div key={comment.id} className="flex items-center mb-2">
                                        <div className="px-4 py-2 bg-indian-flag text-white rounded-3xl mx-3">
                                            <div>
                                                <span className="hover:underline font-thin font-serif mr-1">
                                                    {comment.profiles.username}
                                                </span>
                                            </div>
                                            <p className="text-sm">{comment.content}</p>
                                        </div>
                                    </div>
                                ))}
                            <div className="flex w-full relative bottom-0">
                                <input
                                    type="text"
                                    placeholder="Enter Comment text"
                                    onChange={(e) => setCommentText(e.target.value)}
                                    className="w-full mr-2 py-2 px-3 bg-gray-200 text-gray-800 rounded-md"
                                />
                                
                                <button
                                    className="bg-indian-flag px-3 text-white rounded-md"
                                    onClick={postComment}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                        </div>
                        <button
                            className="bg-green-600 left-0 bottom-1/2 transform -translate-y-1/2 px-3 mx-2 text-white rounded-md flex items-center justify-center"
                            onClick={goToNextIdea}
                        >
                            
                            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-white">
                                <path d="M8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
                            </svg>
                        </button>
                    
                </div>
            )}


            {author &&
                (<>
                    {session.user.id == author[0].author && (
                        <div className="mt-24 mx-4 block items-center justify-center">
                            <h1 className="text-green-600 px-3 bg-white rounded-md py-1">Add more thoughts </h1>
                            <form onSubmit={postIdea}>
                                <textarea
                                    type="text"
                                    placeholder="Enter Your Ideas"
                                    onChange={(e) => setView(e.target.value)}
                                    className='w-full'
                                />
                                <input 
                                type='file'
                                placeholder="Add Photots" 
                                onChange={addPictures}
                                className="w-full mr-2 py-2 px-3 bg-gray-200 text-gray-800 rounded-md"
                                />
                                <button type="submit" className="bg-green-500 px-3 ">
                                    Submit
                                </button>
                            </form>
                        </div>
                    )}
                </>
                )
            }
        </div>
    );

}