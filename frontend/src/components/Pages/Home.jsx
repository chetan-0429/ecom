import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Productcard from './Pro.jsx';
import { useSelector } from 'react-redux';
import ProductHeader from './ProductHeader.jsx';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
import { ColorRing } from 'react-loader-spinner';
function Home() {
    const {isAuthenticated} = useSelector((state) => (state.auth));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false); 
    const spinnerRef = useRef(null);


    const fetchApi = async (page) => {
        setError(false);
        const api = `${apiUrl}/products/products?page=${page}`;
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

    const saveScrollPosition = () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
        sessionStorage.setItem('page', page);
    };


    const restoreScrollPosition = () => {
        const savedPosition = sessionStorage.getItem('scrollPosition');
        if (savedPosition && initialLoadComplete) {
            window.scrollTo(0, parseInt(savedPosition, 10));
        }
    };


    useEffect(() => {
        const savedPage = parseInt(sessionStorage.getItem('page'), 10);
        const initialPage = savedPage || 1;

        const loadInitialProducts = async () => {
            for (let i = 1; i <= initialPage; i++) {
                await fetchApi(i);
            }
            setInitialLoadComplete(true);
        };

        loadInitialProducts();
    }, []);

    
    useEffect(() => {
        if (initialLoadComplete) {
            restoreScrollPosition();
        }
    }, [initialLoadComplete]);

    useEffect(() => {
        if (page > 1) {
            fetchApi(page);
        }
    }, [page]);

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

      
        return () => {
            window.removeEventListener('beforeunload', clearSessionStorageOnRefresh);
        };
        
    }, []);

    return (
        <>
            <ProductHeader />
            <div>
                <div className='flex flex-wrap justify-center'>
                    {products.map((pro, index) => (
                        <div key={index} onClick={saveScrollPosition}>
                            <Productcard
                                name={pro.name}
                                image={pro.imageUrl}
                                price={pro.price}
                                id={pro._id}
                            />
                        </div>
                    ))}
                </div>
                <div ref={spinnerRef}>
                    {/* {loading && <h1 className='mb-5'>Loading more Products...</h1>} */}
                    {loading &&     
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
    }
                    {error && <p>Error fetching products</p>}
                </div>
            </div>
        </>
    );
}

export default Home;
