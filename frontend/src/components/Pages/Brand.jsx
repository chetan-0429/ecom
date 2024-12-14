import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
function Brand() {
    const location = useLocation();
    const navigate = useNavigate()

    const params = new URLSearchParams(location.search);
    const category = params.get('category') || params.get('keyword');
    const allBrandList = {
        shoes:["Adidas","Puma","Nike","Campus"],
        tshirt:["Red-tape","Jockey","Levis","Wrogn"],
        mobile:["Vivo","Apple","Samsung","RealMe","One Plus"],
        jeans:["Levis","Lee","Killer","Red tape"]
    }
    const brandList = allBrandList[category];

    function handleChange(e,brand){
        const searched = location.search;
        if(e.target.checked){
            navigate(`${searched}&company=${brand}`)
        }
        else{
            const queryRemove = `&company=${brand}`;
            const newSearch = searched.replace(queryRemove,'');
            navigate(`${newSearch}`)
        }
        // navigate(`${location.pathname}?category=${category}&company=${brand}`)
    }
    if(brandList){
        return <>
        {brandList.map((brand,index)=>{
            return <div key={`${brand}${index}`}>
                <input type="checkbox" onChange={(e)=>{handleChange(e,brand)}}/>
                <label>{brand}</label>
                {/* <button onClick={()=>navigate(`${location.pathname}?category=${category}&company=${brand}`)}>{brand}</button> */}
            </div>
        })}
        </>
    }
  return (
        <>
        <div>Not Found</div>
        </>
  )
}

export default Brand