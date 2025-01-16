import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Productcard from './Pro';
import Filter from './Filter';
import Brand from './Brand';
import { useLocation ,useNavigate} from 'react-router-dom';
import Sort from './Sort';
import { ColorRing } from 'react-loader-spinner';
const apiUrl = import.meta.env.VITE_BACKEND_URL;


const buildQueryString = (params) => {
    const queryParams = new URLSearchParams(params);
    return queryParams.toString();
  };

function Search() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    
    const paramsObject = Object.fromEntries(queryParams.entries());
    const searchedParams = location.search;
    const apiurl = `${apiUrl}/products/products${searchedParams}`;

    useEffect(()=>{
          setLoading(true)
          axios.get(apiurl)
          .then((res)=> {
            setProducts(res.data.products)
            console.log(res.data.products)
          })
          .catch((err)=>console.log('error in fetching products',err))
          .finally(()=>setLoading(false))
      },[apiurl])
  
const navigate = useNavigate();

     function handlePrevPage(){
        const params = new URLSearchParams(location.search);
        const currPage = Number(params.get('page'));
        if(currPage > 1){
          params.set('page',currPage-1)
          navigate(`${location.pathname}?${params.toString()}`);
        }
     }
     function handleNextPage(){
       const params = new URLSearchParams(location.search);
       const currPage = Number(params.get('page'));
       if(currPage == 0) params.set('page',2)
       else params.set('page',currPage+1)
       navigate(`${location.pathname}?${params.toString()}`);
     }
     function sortLowToHigh(){
      setProducts(product =>{
        const sorted = [...product].sort((a, b) => a.price - b.price);
        return sorted;
      })
     }
     function sortHighToLow(){
      setProducts(product =>{
        const sorted = [...product].sort((a, b) => b.price - a.price);
        return sorted;
      })
     }
  return (
    <>
    <div className='flex'>
    <div className='w-1/4'>
      <Filter/>
      <Sort sortLowToHigh={sortLowToHigh} sortHighToLow={sortHighToLow}/>
      <Brand/>
    </div>
    <div>
            {loading ?  <div className="flex justify-center mt-4">
                                  <ColorRing
                                    visible={true}
                                    height="60"
                                    width="60"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['grey', 'grey', 'grey', 'grey', 'grey']}
                                  />
                                </div> : <></>}
            <div className='flex flex-wrap'>
            {
              products.map((pro,index)=>(
                <div key={index}> 
                    <Productcard 
                    name={pro.name}
                    image = {pro.imageUrl}
                    price = {pro.price}
                    id={pro._id}
                    />
                    </div>
                ))
              }
              </div>

              <div className='flex items-center justify-center'>
                <button className='border-4 mr-2' onClick={handlePrevPage}>previous </button>
                <button className='border-4' onClick={handleNextPage}>next</button>
                </div>
    </div>
    </div>
    </>
  )
}

export default Search