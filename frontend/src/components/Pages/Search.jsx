import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Productcard from './Pro';
import Filter from './Filter';
import Brand from './Brand';
import { useLocation, useNavigate } from 'react-router-dom';
import Sort from './Sort';
import { ColorRing } from 'react-loader-spinner';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function Search() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramsObject = Object.fromEntries(queryParams.entries());
  const apiurl = `${apiUrl}/products/products${location.search}`;
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    axios.get(apiurl)
      .then((res) => {
        const newProducts = res.data.products;
        console.log(res.data);
        setProducts(newProducts);
        setHasMoreProducts(newProducts.length > 0);
      })
      .catch((err) => console.log('Error in fetching products', err))
      .finally(() => setLoading(false));
  }, [apiurl]);

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      const params = new URLSearchParams(location.search);
      params.set('page', currentPage - 1);
      navigate(`${location.pathname}?${params.toString()}`);
    }
  }

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
    const params = new URLSearchParams(location.search);
    params.set('page', currentPage + 1);
    navigate(`${location.pathname}?${params.toString()}`);
  }

  function sortLowToHigh() {
    setProducts((products) => {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      return sorted;
    });
  }

  function sortHighToLow() {
    setProducts((products) => {
      const sorted = [...products].sort((a, b) => b.price - a.price);
      return sorted;
    });
  }

  return (
    <>
      <div className='flex'>
      <div className="flex flex-col gap-5 p-5">
  <Filter />
  <Sort sortLowToHigh={sortLowToHigh} sortHighToLow={sortHighToLow} />
  <Brand />
</div>

        <div>
          {loading ? (
            <div className="flex justify-center mt-4">
              <ColorRing
                visible={true}
                height="60"
                width="60"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['grey', 'grey', 'grey', 'grey', 'grey']}
              />
            </div>
          ) : (
            <div className='flex flex-wrap justify-center'>
              {products.length == 0 ? <div className='text-cyan-500'>NO MORE PRODUCTS ARE AVAILABLE</div> : null}
              {products.map((pro, index) => (
                <div key={index}>
                  <Productcard
                    name={pro.name}
                    image={pro.imageUrl}
                    price={pro.price}
                    id={pro._id}
                  />
                </div>
              ))}
            </div>
          )}


          <div className='flex items-center justify-center mt-4'>
            <button
              className={`border-2 border-gray-300 rounded-md px-4 py-2 mr-2 ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:border-gray-400'}`}
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
            >
              Previous
            </button>
            <button
              className={`border-2 border-gray-300 rounded-md px-4 py-2 mr-2  ${!hasMoreProducts  ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:border-gray-400'}`}
              onClick={handleNextPage}
              disabled={!hasMoreProducts}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
