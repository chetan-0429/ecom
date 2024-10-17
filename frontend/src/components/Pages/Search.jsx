import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Productcard from './Pro';
import Filter from './Filter';
import Brand from './Brand';
import { useLocation ,useNavigate} from 'react-router-dom';
import Sort from './Sort';


const buildQueryString = (params) => {
    const queryParams = new URLSearchParams(params);
    return queryParams.toString();
  };

function Search() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // const keyword = queryParams.get('keyword');
    // console.log('keywordd: ',keyword)
    
    const paramsObject = Object.fromEntries(queryParams.entries());
    console.log('paramsObj: ',paramsObject)
    // const apiUrl = `api/v1/products/products?${buildQueryString(paramsObject)}`;
    const searchedParams = location.search;
    const apiUrl = `api/v1/products/products${searchedParams}`;
    console.log(apiUrl)

    useEffect(()=>{
          setLoading(true)
          axios.get(apiUrl)
          .then((res)=> {
            setProducts(res.data.products)
            console.log(res.data.products)
          })
          .catch((err)=>console.log('error in fetching products',err))
          .finally(()=>setLoading(false))
      },[apiUrl])
  
const navigate = useNavigate();

     function handlePrevPage(){
        const params = new URLSearchParams(location.search);
        const currPage = Number(params.get('page'));
        console.log('cp : ',currPage)
        if(currPage > 1){
          params.set('page',currPage-1)
          navigate(`${location.pathname}?${params.toString()}`);
        }
     }
     function handleNextPage(){
       const params = new URLSearchParams(location.search);
       const currPage = Number(params.get('page'));
       console.log('cp : ',currPage)
       if(currPage == 0) params.set('page',2)
       else params.set('page',currPage+1)
       navigate(`${location.pathname}?${params.toString()}`);

      // navigate(`${location.search}&page=${page}`)
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
            {loading ? <h2>Loading...</h2> : <></>}
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