import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Productcard({ name, image, price ,id,page }) {
  const navigate = useNavigate();
  function handleClick(){

    navigate(`/product/${id}`);
  }
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-64 sm:w-72 md:w-80 lg:w-96 mr-8 mb-8 transition-transform duration-200 hover:translate-y-[-5px]" onClick={handleClick}>
      <img
        className="w-full max-h-64 object-contain mx-auto"
        src={image}
        alt={name}
        aria-label={name}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <h3 className="text-lg font-semibold text-gray-800">₹{price}</h3>
      </div>
    </div>
  );
}

Productcard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Productcard;




