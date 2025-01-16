import React from 'react';

function Sort({ sortLowToHigh, sortHighToLow}) {
  return (
    <div className="">
      <div>
        <button
          onClick={sortLowToHigh}
          className=" text-black px-6 py-2 rounded-lg shadow-md hover:bg-blue-300 focus:outline-none transition ease-in-out duration-300"
        >
          Low to High
        </button>
      </div>
      <div>
        <button
          onClick={sortHighToLow}
          className=" text-black px-6 py-2 rounded-lg shadow-md hover:bg-blue-300 focus:outline-none transition ease-in-out duration-300"
        >
          High to Low
        </button>
      </div>
    </div>
  );
}

export default Sort;
