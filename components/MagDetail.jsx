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

const MagDetail = ({ book }) => {
  return (
    <>
      <HTMLFlipBook width={500} height={800} usePortrait={false} showCover={true}>
        {book.pages.map((page, index) => {
          return (
            <div key={index}
                 className={`p-6 rounded-lg shadow-lg page${index + 1} mx-auto`}
                 ref={(component) => (this.pageFlip = component)} >
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
     
  </>
);

};
export default MagDetail
