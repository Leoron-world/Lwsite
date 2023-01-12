// import HTMLFlipBook from "react-pageflip";
// const MagDetail = ({ book }) => {
//   return (
//     <HTMLFlipBook width={300} height={500}>
//       {book.pages.map((page, index) => {
//         return (
//           <div key={index} className='bg-white p-4 rounded-lg shadow-lg' ref={(component) => (this.pageFlip = component)}>
//             <h3 className='text-xl font-medium text-gray-800'>page number {index +1 }</h3>
//             <h3 className='text-xl font-medium text-gray-800'>{page.title}</h3>
//             {page.content.raw.children.map((child, childIndex) => {
//               return <div key={childIndex} className='text-gray-700 leading-relaxed'>{child.children[0].text}</div>
//             })}
//             <h3 className='text-xl font-medium text-gray-800'>{page.author.name}</h3>
//           </div>
//         );
//       })}
//     </HTMLFlipBook>
//   );
// };

// export default MagDetail;
import HTMLFlipBook from 'react-pageflip'
import { useRef } from 'react';




const MagDetail = ({ book }) => {
  const pagee = useRef(null);
  return (
    <div className="flex flex-col h-full">
      <HTMLFlipBook width={500} height={800} usePortrait={false} showCover={true} ref={pagee}>
       
<img src={book.image[0].url} className='object-cover'/>
        
        {book.pages.map((page, index) => {
          return (
            <div key={index}
                 className={`p-6 rounded-lg shadow-lg page${index + 1} mx-auto`}
                 ref={(component) => (this.flipBook = component)} >
              <h3 className='text-2xl font-bold  pb-5'>{page.title}</h3>
              <img src={page.pageImage.url} alt='photo' className='border border-solid border-stone-900 h-72 w-full'/> 
              {page.content.raw.children.map((child, childIndex) => {
                return <div key={childIndex} className='leading-relaxed mt-12 font-medium'>{child.children[0].text}</div>
              })}
              <div className="absolute bottom-0 flex justify-between p-4 w-full">
                <h3 className='text-xl font-bold text-center'>Written by : {page.author.name}</h3> 
                <h3 className='text-xl font-medium text-center pr-5'>Page {index +1 }</h3>
              </div>
            </div>
            
          );
        })}
      
      </HTMLFlipBook>
      <div className="flex justify-between p-4 w-full bottom-0">
      <button onClick={() => pagee.current.pageFlip().flipPrev()} className='bg-blue-500 text-white px-3 mx-3'>
        Prev page
      </button>
      <button onClick={() => pagee.current.pageFlip().flipNext()} className='bg-blue-500 text-white px-3 mx-3'>
        Next page
      </button>
      </div>
      </div>
);
};
export default MagDetail
