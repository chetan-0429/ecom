import React, { useState } from 'react';
import Filter from './Filter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const fetchFilteredProducts = async (minPrice, maxPrice) => {
        try {

            
            const response = await axios.get(`/api/v1/products/products?price[gt]=${minPrice}`);
            console.log(response.data.products)
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
        console.log('price::')
    };
    return (
        <div>
            <Filter onFilterChange={fetchFilteredProducts} />
            <div>
                {products.map(product => (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>Price: ₹{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
