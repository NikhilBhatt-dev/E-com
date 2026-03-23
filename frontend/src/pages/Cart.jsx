import React, { useEffect, useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { Link, Navigate } from 'react-router-dom'
import CartTotal from '../components/CartTotal'



const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {

    if (products.length > 0) {

      const tempData = []

      for (const item in cartItems) {
        for (const size in cartItems[item]) {

          if (cartItems[item][size] > 0) {

            tempData.push({
              _id: item,
              size: size,
              quantity: cartItems[item][size]
            })

          }
        }
      }

      setCartData(tempData)
    }

  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-3'>
        <Title text1={'My'} text2={'Cart'} />
      </div>

      <div>

        {cartData.map((item, index) => {

          const productData = products.find((product) => product._id === item._id)

          return (
            <div
              key={index}
              className='relative py-4 pr-10 border-t border-b text-gray-700'
            >

              <div className='flex items-start gap-6'>

                <img
                  className='w-16 sm:w-20'
                  src={productData?.image[0]}
                  alt=""
                />


                <div>
                  <p className='text-xs sm:text-lg font-medium'>
                    {productData?.name}
                  </p>
                  <div className='flex items-center gap-5 mt-2'>



                    <p>{currency}{productData?.price}</p>

                    <p>Size: {item.size}</p>

                    <p>Qty: {item.quantity}</p>
                  </div>

                </div>

              </div>

              <img onClick={() => updateQuantity(item._id, item.size, 0)}
                className='absolute top-9 right-2 w-4 sm:w-5 cursor-pointer'
                src={assets.bin_icon}
                alt="Remove item"
              />

            </div>
          )
        })}

      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />

          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className=' bg-black text-white text-sm my-8 px-8 py-3'>
              Proceed to checkout
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Cart
