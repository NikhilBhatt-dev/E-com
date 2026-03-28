import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


const Orders = () => {

  const { backendUrl,token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const loadOrderData = async () => {
    try{
      if (!token) {
        return null;
        
      }
      
     const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      
      if (response.data.success) {
       let allOrderItems = []
        response.data.orders.forEach((order) => {
        order.items.forEach((item) => {
          allOrderItems.push({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          });
        })
       })

       setOrderData(allOrderItems.reverse());
       }

    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    loadOrderData();
  },[token])
  return (

    <div className='border-t pt-16'> 
    <div className='text-2xl'>
      <Title text1={'My '} text2={'Orders'} />

    </div>


    <div>
      {
       orderData.map((item, index) => (
          
          <div
            key={index}
            className='flex flex-col gap-4 border-b border-t py-4 text-gray-700 md:flex-row md:items-center md:justify-between'
          >
            <div className='flex items-start gap-4 sm:gap-6 text-sm'>
              <img className='w-16 flex-shrink-0 sm:w-20' src={item.image[0]} alt={item.name} />

              <div className='flex-1'>
                <p className='sm:text-base font-medium '>{item.name}</p>
                 

                <div className='mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-gray-700'>
                  <p className='text-lg'>{item.price} {currency}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-1'>
                  Date: <span className='text-gray-400 '>{new Date(item.date).toDateString()}</span>
                </p>

               <p className='mt-1'>
                Payment: <span className='text-gray-400 '>{item.paymentMethod}</span>
               </p>

              </div>
            </div>

            <div className='flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:w-auto md:min-w-[240px] md:justify-end md:gap-6'>
            <div className='flex items-center gap-2'>
              <p className='min-w-2 h-2 rounded-full bg-green-500'>
              </p>
              <p className='text-sm md:text-base'>
                {item.status}
              </p>
            </div>
            <button
              onClick={loadOrderData}
              className='w-full rounded-sm border px-4 py-3 text-sm font-medium sm:w-fit'
            >
              Track Order
            </button>

            </div>
          </div>
        ))
      }
      {!orderData.length && (
        <p className='py-8 text-gray-500'>No orders found yet.</p>
      )}
    </div>
    </div>
  )
}

export default Orders
