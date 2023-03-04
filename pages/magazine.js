import React from 'react'
import { MagazinePost } from '../sections'
import { getMagazineCover } from '../services'


const magazine = () => {
  return (
    <div>
        <MagazinePost />
    </div>
  )
}

export default magazine

export async function getStaticProps() {
    const books = (await getMagazineCover()) || [];
    return {
      props: { books },
    };
  }
  