import React, { useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'



const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',

  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }));
  };


  const {navigate} = useContext(ShopContext);

  return (
    <form className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* left side */}
      <div className=' flex flex-col gap-4  w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery '} text2={'Information'} />

        </div>
        <div className='flex gap-3'>

          <input onChange={onChangeHandler }name='firstName' value={FormData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />

          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='last name' />

        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email' />

        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />


        <div className='flex gap-3'>

          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='city' />

          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='state' />

        </div>


        <div className='flex gap-3'>

          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />

          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />

        </div>




        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />


      </div>
      {/* Right side */}

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'} />

          {/* payment method section */}


          <div className='flex gap-3 flex-col lg:flex-row' >

            {/* STRIPE */}
            <div onClick={() => setMethod('stripe')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer transition hover:border-black '>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'border-black bg-green-500' : ''}`}></p>
              <img className=' h-5 mx-4' src={assets.stripe_logo} alt="stripelogo" />

            </div>


            {/* RAZORPAY */}

            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'border-black bg-green-500' : ''} `}></p>
              <img className=' h-5 mx-4' src={assets.razorpay_logo} alt="stripelogo" />

            </div>


            {/*  CASH ON DELIVERY */}
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'border-black bg-green-500' : ''} `}></p>
              <p className='text-black-500 text-sm font-medium mx-4 '>Cash on Delivery</p>
            </div>

          </div>


          <div className='w-full text-end mt-8'>
            <button onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm '>Place Order</button>

          </div>

        </div>

      </div>

    </form>


  )
}

export default PlaceOrder