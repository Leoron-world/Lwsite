import { useState } from 'react';


const MagDetail = ({ book }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);


  return (
    <div className='w-full'>
    <div className="flex h-full rounded-xl">
      <div className="w-1/2 comment overflow-auto">
        <div key={currentPageIndex} className={`p-6 rounded-xl shadow-lg page${currentPageIndex + 1} mx-auto`}>
          <h3 className="text-2xl font-bold  pb-5">{book.pages[currentPageIndex].title}</h3>
          <img src={book.pages[currentPageIndex].pageImage.url} alt="photo" className="border border-solid border-stone-900 h-72 w-full"/> 
          {book.pages[currentPageIndex].content.raw.children.map((child, childIndex) => {
            return <div key={childIndex} className="leading-relaxed mt-12 font-medium">{child.children[0].text}</div>
          })}
          <div className=" bottom-0  p-4 w-full">
            <h3 className="text-xl font-bold text-center">Written by : {book.pages[currentPageIndex].author.name}</h3> 
            <h3 className="text-xl font-medium text-center pr-5">Page {currentPageIndex +1 }</h3>
          </div>
        </div>
       
      </div>
      <div className="w-1/2  bg-white p-4 overflow-auto comment">
        <h3 className="text-xl font-bold mb-4 ">Comment Section for Page {currentPageIndex + 1}</h3>
        {/* Add comment section here */}
         
      </div>
      </div>
      
      <div className="flex justify-between">
        <button className="text-xl font-medium bg-white p-3 rounded-lg" onClick={() => setCurrentPageIndex(currentPageIndex - 1)} disabled={currentPageIndex === 0}>Previous</button>
        <button className="text-xl font-medium bg-white p-3 rounded-lg" onClick={() => setCurrentPageIndex(currentPageIndex + 1)} disabled={currentPageIndex === book.pages.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default MagDetail;
