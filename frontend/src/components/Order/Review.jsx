import { Link } from 'react-router-dom'
import { useLocation,useParams,useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Review = () => {
    const [rating, setRating] = useState(Number(0));
    const [hover, setHover] = useState(Number(0));
    const[comment,setComment] = useState("");

    const {productId} = useParams()
    const eleme= useParams()
    const navigate = useNavigate()

    useEffect(()=>{
      console.log('in the review getting')
      async function getProductReview (){
        try{
          console.log('pd',productId)
        const response = await axios.get(`/api/v1/products/get_review?productId=${productId}`);
        console.log(response.data)
        if(response.data.success && response.data.review){
        const currentReview = response.data.review;
        setRating(currentReview.rating);
        setComment(currentReview.comment);
      }
        }catch(err){
          console.log('error in getting review',err);
        }
      }
      getProductReview();
    },[])
    const fetchReview = async ()=>{
        try{
            // console.log("abc: ", productId,rating,comment)
            const response = await axios.post('/api/v1/products/review',{productId:productId,rating:rating,comment:comment});
          //  console.log('review:success',response.data);
           toast.success("Thanks for your review", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setTimeout(()=>{
          navigate('/order')
        },2000);
        }catch(err){
            console.log('error in sending review',err);
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log('fetch called review')
        if(productId)
        fetchReview();
    else console.log('plz slect product')
    }
  

  return (
    <>
    <ToastContainer/>
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Rate the product</h2>
        <div className="flex mb-4">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;

            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  className="hidden"
                  onChange={() => setRating(ratingValue)}
                />
                <FaStar
                  size={30}
                  className={`cursor-pointer transition-colors duration-200 ${
                    ratingValue <= (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
        <h2 className="text-xl font-semibold mb-4">Review the product</h2>
        <div className="mb-4">
          <label htmlFor="review" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="review"
            rows="4"
            value={comment}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review..."
            onChange={(e)=> setComment(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default Review;

