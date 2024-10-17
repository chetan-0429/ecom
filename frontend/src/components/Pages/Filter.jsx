import React, { useState ,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Filter() {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);

    const location = useLocation();
    const navigate = useNavigate();

    const handleMinChange = (e) => {
        const value = parseInt(e.target.value);
        if (value <= maxPrice) {
            setMinPrice(value);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const minPriceFromUrl = parseInt(params.get('price[gte]')) || 0;
        const maxPriceFromUrl = parseInt(params.get('price[lte]')) || 100000;

        setMinPrice(minPriceFromUrl);
        setMaxPrice(maxPriceFromUrl);
    }, [location.search]);


    const handleMaxChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= minPrice) {
            setMaxPrice(value);
        }
    };

    const handleMouseUp = () => {
    // navigate(`?price[gt]=${maxPrice}`)
    const params = new URLSearchParams(location.search);
    params.set('price[gte]', minPrice);
    params.set('price[lte]', maxPrice);
    // console.log('params is ::',params)
    // console.log('location is ::',location)
    navigate(`${location.pathname}?${params.toString()}`);


    };


    return (
        <div>
            <div>
                <input 
                    type="range" 
                    min={0} 
                    max={100000} 
                    step={100} 
                    value={minPrice} 
                    onChange={handleMinChange} 
                    onMouseUp={handleMouseUp}
                    />
                    <label>Min Price: {minPrice}</label>
            </div>

            <div>
                <input 
                    type="range" 
                    min={0} 
                    max={100000} 
                    step={100} 
                    value={maxPrice} 
                    onChange={handleMaxChange} 
                    onMouseUp={handleMouseUp}
                    />
                    <label>Max Price: {maxPrice}</label>
            </div>

            <p>Selected Range: {minPrice} - {maxPrice}</p>
        </div>
    );
}

export default Filter;


// import ReactSlider from 'react-slider';
