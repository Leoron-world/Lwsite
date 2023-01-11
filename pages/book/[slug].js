import React from 'react';
import { useRouter } from 'next/router';
import MagDetail from '../../components/MagDetail';
import { Loader } from '../../components';
import {getMagazineCover, getMagDetails } from '../../services';


const MagDetails = ({ book }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <MagDetail book={book} />
          </div>
        </div>
      </div>
    </>
  );
};
export default MagDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getMagDetails(params.slug);
  return {
    props: {
      book: data,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const books = await getMagazineCover();
  return {
    paths: books.map(( { slug  }) => ({ params: { slug } })),
    fallback: false,
  };
}