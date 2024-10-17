import React from 'react'
import { Link } from 'react-router-dom'

function ProductHeader() {
  return (
    <>
    <div>
        <div className='flex justify-center gap-16 mb-6'>
          <div className= 'flex flex-col items-center'>
          <Link to="/search?category=mobiles">
            <img src="https://rukminim1.flixcart.com/flap/96/96/image/22fddf3c7da4c4f4.png?q=100" alt="" className='w-12 h-16' />
            <p>Mobiles</p>
          </Link>
          </div>
          <div className='flex flex-col items-center'>
          <Link to="/search?category=appliances">
            <img src="https://rukminim1.flixcart.com/fk-p-flap/96/96/image/0139228b2f7eb413.jpg?q=100" alt="" className='w-12 h-16' />
            <p>Appliances</p>
            </Link>
          </div>
          <div className='flex flex-col items-center'>
          <Link to="/search?category=tshirt">
            <img src="https://rukminim2.flixcart.com/www/128/128/promos/27/05/2024/9cd2872b-11ac-488d-ab4b-7d65d98b4c74.jpg?q=60" alt="" className='w-16 h-16' />
            <p>Clothes</p>
            </Link>
          </div>
          <div className='flex flex-col items-center'>
          <Link to="/search?category=shoes">
            <img src="https://rukminim2.flixcart.com/www/128/128/promos/27/05/2024/da193762-44de-4814-baf8-bfaf961e2430.jpg?q=60" alt="" className='w-16 h-16' />
            <p>Footwear</p>
            </Link>
          </div>
          <div className='flex flex-col items-center'>
            <Link>
            <img src="https://rukminim2.flixcart.com/www/128/128/promos/09/07/2024/47710dbe-a3b2-4b4a-8862-9b4ec185ac11.jpg?q=60" alt="" className='w-16 h-16' />
             <p>Accessories</p>
            </Link>
          </div>
        </div>
    </div>
    </>
  )
}

export default ProductHeader