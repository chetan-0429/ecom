import React from 'react'
import { useState } from 'react';
function Demo() {
  const [updateName, setUpdatedName] = useState('');

  function handleChange(e) {
    setUpdatedName(e.target.value);  // No need for 'prev' state here
  }
  
    return (
      <div className="font-semibold bg-yellow-50 text-gray-800 border">
        jkjk
        <input
          type="text"
          value={updateName}  // Binds the state to input
          className="text-black"
          placeholder="Enter your name"  // Static placeholder
          onChange={handleChange}  // Update state on input change
        />
      </div>
    );
  
}

export default Demo