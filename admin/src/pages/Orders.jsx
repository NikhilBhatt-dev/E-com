import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const Orders = ({token}) => {

  const [orderData, setOrderData] = useState([])
  const fetchAllOrders = async () => {
    if(!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list',{}, {headers: {token}})
      if(response.data.success) {
        setOrderData(response.data.orders)
      }
      else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
    
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])



  return (
    <div>

      <h3>Order Page</h3>
      <div>

        {
        orderData.map((order,index) => 
        <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-4 border-2 p-5 md:p-8 my-3 text-sm text-gray-700  '>
          <img src={assets.parcel_icon} alt="" />
          <div>

              {order.items.map((item,index) => {
                if(index === order.items.length ) {
                  return <p key={index}>
                    {item.name} X {item.quantity}
                    <span>{item.size}</span>
                  </p>

                }
                else{
                  return <p key={index}>
                    {item.name} X {item.quantity}
                    <span>{item.size}, </span>
                  </p>
                }
              }
              
              )}
              <p className='mt-3 mb-2 font-medium'>
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
          </div>
          <div>
            <p>Items: {order.items.length}</p>
            <p>Method: {order.paymentMethod}</p>
            <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
            <p>Date: {new Date(order.date).toDateString()}</p>
          </div>
          <p>{currency}{order.amount}</p>
          <select className='p-2 font-semibold'>
            <option value="order Placed">Order Placed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="packing">Packing</option>

          </select>
          {/* <p>{order.status}</p> */}
          </div>)
        }
      </div>

    </div>
  )
}

export default Orders
