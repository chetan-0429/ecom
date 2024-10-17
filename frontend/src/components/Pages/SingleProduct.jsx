

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../../store/cartSlice';
import { fetchCartProducts } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleProduct() {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [err, setErr] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const fetchProduct = async () => {
        setErr(false);
        try {
            setLoading(true);
            const res = await axios.get(`/api/v1/products/product/${id}`);
            if (res) setProduct(res.data);
        } catch (err) {
            setErr(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const dispatch = useDispatch();
    const addToCart = () => {
        async function addInCart() {
            try {
                const res = await axios.post(`/api/v1/cart/add`, { productId: id, quantity: 1 });
                dispatch(addProductToCart({ ...product, quantity: 1 }));
                toast.success("Item added to cart!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch (err) {
                console.log('error in adding to cart');
            }
        }
        if (id) addInCart();
    };

    const { products } = useSelector(state => state.cart);
    useEffect(() => {
        dispatch(fetchCartProducts());
    }, [dispatch]);

    useEffect(() => {
        products.forEach((pro) => {
            if (pro._id === id) {
                setIsInCart(true);
            }
        });
    }, [products, id]);

    const navigate = useNavigate();
    const goToCart = () => {
        navigate('/cart');
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.977 2.89 1.518 4.674c.3.921-.755 1.688-1.54 1.18l-3.977-2.89-3.977 2.89c-.784.508-1.84-.259-1.54-1.18l1.518-4.674-3.977-2.89c-.784-.57-.381-1.81.588-1.81h4.911l1.518-4.674z"></path></svg>
                ))}
                {halfStar && (
                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2.927c0-.921-.754-.921-1.054 0L7.429 7.601H2.518C1.549 7.601 1.147 8.841 1.93 9.411l3.977 2.89-1.518 4.674c-.3.921.755 1.688 1.54 1.18l3.977-2.89v-9.39z"></path></svg>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.977 2.89 1.518 4.674c.3.921-.755 1.688-1.54 1.18l-3.977-2.89-3.977 2.89c-.784.508-1.84-.259-1.54-1.18l1.518-4.674-3.977-2.89c-.784-.57-.381-1.81.588-1.81h4.911l1.518-4.674z"></path></svg>
                ))}
            </>
        );
    };

    
    
    if (err) {
        return (<h3>Error in fetching product</h3>);
    }
    if (loading) return <div>Loading...</div>;

    return (
        <>
            <ToastContainer />
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0">
                        <img
                            className="w-full h-80 object-cover rounded-lg md:w-96 md:h-auto"
                            src={product.imageUrl}
                            alt={product.name}
                        />
                    </div>
                    <div className="mt-6 md:mt-0 md:ml-8">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <div className="mt-2 flex items-center">
                            <div className="flex">{renderStars(product.ratings)}</div>
                            <span className="ml-2 text-gray-600">{product.ratings.toFixed(1)} out of 5</span>
                        </div>
                        <p className="mt-4 text-lg text-gray-700">{product.description}</p>
                        <p className="mt-6 text-3xl font-semibold text-green-600">₹{product.price.toFixed(2)}</p>
                        <div className="mt-8 flex gap-6">
                            {isInCart ? (
                                <button
                                    className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                                    onClick={goToCart}
                                >
                                    Go To Cart
                                </button>
                            ) : (
                                <button
                                    className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                                    onClick={addToCart}
                                >
                                    Add to Cart
                                </button>
                            )}
                            <button
                                className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Review Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-2">Customer Reviews</h2>
                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="mt-6 space-y-6">
                            {product.reviews.map((review) => (
                                <div key={review._id} className="p-6 bg-gray-100 rounded-lg shadow-md">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
                                            <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-700">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-6 text-gray-600">No reviews yet. Be the first to review this product!</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default SingleProduct;



