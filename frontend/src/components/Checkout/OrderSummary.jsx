import React from 'react'
import {useSelector,useDispatch} from 'react-redux'

function OrderSummary({changeCurrentSection,setOrderSummaryDone}) {

  const orderItems = useSelector(state=> state.cart.products);
  console.log('orderItems: ',orderItems)
    function handleClick(e){
        e.preventDefault();
        setOrderSummaryDone(true)
        changeCurrentSection('payment');
    }
  return (
    <>
    <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border-t border-gray-200">
              {orderItems.map(pro => (
                <div key={pro._id}>
                    <div className="py-4">
                      <img src={pro.imageUrl} className='h-28' alt="" />
                    <p className="text-gray-600">{pro.name} <span className="font-semibold">Example Product</span></p>
                    <p className="text-gray-600">{pro.quantity} <span className="font-semibold">1</span></p>
                    <p className="text-gray-600">price: {pro.price} <span className="font-semibold">$99.99</span></p>
                  </div>
                  <div className="py-4 border-t border-gray-200">
                    <p className="text-gray-600">Total: <span className="font-semibold">$99.99</span></p>
                  </div>
                  </div>
            
              ))}
               
              </div>
           
          </div>
          <button onClick={handleClick}>next</button>
    </>
  )
}

export default OrderSummary