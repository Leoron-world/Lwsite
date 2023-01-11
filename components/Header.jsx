import React, {useContext} from 'react'
import Link from 'next/link'


const Header = () => {

  return (
    <div className="container mx-auto px-10 mb-8">
    <div className="border-b w-full inline-block border-blue-400 py-8">
      <div className="md:float-left block">
        <Link href="/">
          <span className="cursor-pointer font-bold text-4xl text-white">L<span className='text-green-500'>W</span></span>
        </Link>
      </div>
      <div className="md:float-left md:contents">
        <div className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer px-2">
        <Link href='/fan-stories' className='px-2'>Fan stories</Link> <Link href='/magazine' className='px-2' >Magazine</Link><Link href='/indian-football' className='px-2'>Indian Football</Link></div>
      </div>
    </div>
  </div>
);
};

export default Header