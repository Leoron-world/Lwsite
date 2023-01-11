export default function Home(){
  return (
    // <div className='container mx-auto px-10 mb-8'>
    //   <Head>
    //     <title>Fan Story</title>
    //   </Head>
    //   <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
    //     <div className='lg:col-span-8 col-span-1'>
    //       {posts.map((post) => ( <PostCard post={post.node} key={post.title} /> ))}
    //     </div>
    //     <div className='lg:col-span-8 col-span-1'>
    //       <div className='lg:sticky relative top-8'>
    //        <PostWidget />
    //        <Categories />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className=' place-content center  text-white text-center tracking-widest font-mono py-auto mt-24'>
      <h1 className="py-12">Welcome to the </h1>
      <h1 className="text-8xl">Leoron   <span className='text-green-500 px-5'>     World</span></h1>
      <h1 className="py-12 text-lg tracking-tighter">Building a digital world devoted to sports.</h1>
      <p>An <span className='text-green-500'> immersive </span>digital platform to celebrate <span className='text-green-500'>sporting</span> rivalries among fans <span className='text-green-500 '>through </span>virtual <br />territories of clubs/teams.<br />
Aspiring to become the 1st<span className='text-green-500'> metaverse</span>  company catering to <span className='text-green-500'>India’s</span> unique needs in sports,<br /> starting<br />
with Cricket<span className='text-green-500 '> and </span>Football.</p>
    </div>
  )
}



