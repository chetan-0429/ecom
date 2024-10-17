import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Productcard from './Productcard.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Listproducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false); // Track if initial products are loaded
    const spinnerRef = useRef(null);

    // Fetch products from API
    const fetchApi = async (page) => {
        setError(false);
        console.log('fetching: page: ',page);
        const api = `/api/v1/products/products?page=${page}`;
        try {
            setLoading(true);
            const res = await axios.get(api);
            const newPro = res.data.products;
            
            if (newPro.length) {
                setProducts((prev) => {
                    const existingProductIds = new Set(prev.map(product => product._id));
                    const filteredNewPro = newPro.filter(product => !existingProductIds.has(product._id));
                    return [...prev, ...filteredNewPro];
                });
                setHasMore(newPro.length > 0);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            setError(true);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };
    // Save scroll position before navigating away
    const saveScrollPosition = () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
        sessionStorage.setItem('page', page);
    };

    // Restore scroll position after all products are loaded
    const restoreScrollPosition = () => {
        const savedPosition = sessionStorage.getItem('scrollPosition');
        if (savedPosition && initialLoadComplete) {
            window.scrollTo(0, parseInt(savedPosition, 10));
        }
    };

    // Initial fetch and restore
    useEffect(() => {
        const savedPage = parseInt(sessionStorage.getItem('page'), 10);
        const initialPage = savedPage || 1;

        const loadInitialProducts = async () => {
            for (let i = 1; i <= initialPage; i++) {
                await fetchApi(i);
            }
            setInitialLoadComplete(true); // Set flag when products have been loaded
        };

        loadInitialProducts();
    }, []);

    // Restore scroll position after products are loaded
    useEffect(() => {
        if (initialLoadComplete) {
            restoreScrollPosition();
        }
    }, [initialLoadComplete]);

    // Fetch more products when page changes
    useEffect(() => {
        if (page > 1) {
            fetchApi(page);
        }
    }, [page]);

    // Infinite scrolling observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        if (spinnerRef.current) {
            observer.observe(spinnerRef.current);
        }
        return () => {
            if (spinnerRef.current) {
                observer.unobserve(spinnerRef.current);
            }
        };
    }, [hasMore, loading]);


    useEffect(() => {
        const clearSessionStorageOnRefresh = () => {
            sessionStorage.clear();
        };

        window.addEventListener('beforeunload', clearSessionStorageOnRefresh);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('beforeunload', clearSessionStorageOnRefresh);
        };
    }, []);


    const showMessage = () => {
        toast.success('Product Deleted')
      };

    async function onRemove(id) {
        console.log(`Remove product with ID: ${id}`);
        try{
              const res = await axios.get(`/api/v1/products/delete/${id}`);
              if(res.data.success){
                    console.log('successfully deleted',res);
                    showMessage();
                setProducts((products) => (
                    products.filter((pro)=> pro._id != id)
                ))
                  }
        }catch(err){
          console.log('error in del',err);
        }
      }
    return (
        <>
         <ToastContainer/>
            <div>
                <div>
            <div className="grid grid-cols-5 gap-4 bg-gray-100 pt-4 pb-4 font-bold text-gray-800">
        <div>Image</div>
        <div>Name</div>
        <div>Price</div>
        <div>In stock</div>
        <div>Action</div>
      </div>

                </div>
                <div>
                    {products.map((pro, index) => (
                        <div key={index} onClick={saveScrollPosition}>
                            <Productcard
                                name={pro.name}
                                image={pro.imageUrl}
                                price={pro.price}
                                stock={pro.stock}
                                description={pro.description}
                                category = {pro.category}
                                company = {pro.company}
                                id={pro._id}
                                onRemove = {onRemove}
                            />
                        </div>
                    ))}
                </div>
                <div ref={spinnerRef}>
                    {loading && <h1 className='mb-5'>Loading more Products...</h1>}
                    {error && <p>Error fetching products</p>}
                </div>
            </div>
        </>
    );
}

export default Listproducts;
