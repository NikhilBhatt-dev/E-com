// import React from 'react'
// import { Form } from 'react-router-dom'
// import { assets } from '../assets/assets'


// const Add = () => {
//   return (
//     <form className='flex flex-col w-full items-start gap-3'>
//       <div>
//         <p className='mb-2'>Upload Images</p>
//         <div className='flex gap-2'>
//           <label htmlFor="image1">
//             <img className='w-20 ' src={assets.upload_area} alt="" />
//             <input type="file" name="" id="image1" hidden/>
//           </label>
//           <label htmlFor="image2">
//             <img className='w-20 ' src={assets.upload_area} alt="" />
//             <input type="file" name="" id="image2" hidden />
//           </label>
//           <label htmlFor="image3">
//             <img className='w-20 ' src={assets.upload_area} alt="" />
//             <input type="file" name="" id="image3" hidden />
//           </label>
//           <label htmlFor="image4">
//             <img className='w-20 ' src={assets.upload_area} alt="" />
//             <input type="file" name="" id="image4" hidden />
//           </label>
          
//         </div> 
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product Name</p>
//         <input className='w-full max-w px-3 py-2' type='text' placeholder='Type here'></input>
//       </div>
//       <div className='w-full'>
//         <p className='mb-2'>Product Description</p>
//         <textarea className='w-full max-w px-3 py-2' type='text' placeholder='Write here'></textarea>
//       </div>

//       <div>
//         <div>
//           <p>Product Category</p>
//           <select name="" id="">
//             <option value="Men">Men</option>
//             <option value="Women">Women</option>
//             <option value="Kids">Kids</option>
//           </select>
//         </div>
//       </div>

//       <div>
//         <div>
//           <p>Sub Category</p>
//           <select name="" id="">
//             <option value="Topwear">Topwear</option>
//             <option value="Bottomwear">Bottomwear</option>
//             <option value="Winterwear">Winterwear</option>
           
//           </select>
//         </div>

//         <div>
//           <p>
//             Product Price
//           </p>
//           <input type="Number" placeholder='25' />
//         </div>
//       </div>

//     </form>
//   )
// }

// export default Add

import React from 'react'
import { assets } from '../assets/assets'

const Add = () => {
  return (
    <form className='flex flex-col w-full items-start gap-6'>

      {/* Upload Images */}
      <div>
        <p className='mb-2 font-medium'>Upload Images</p>
        <div className='flex gap-3'>
          {[1, 2, 3, 4].map((item) => (
            <label key={item} htmlFor={`image${item}`} className='cursor-pointer'>
              <img
                className='w-20 h-20 object-cover border rounded-md p-1 hover:border-black transition'
                src={assets.upload_area}
                alt=""
              />
              <input type="file" id={`image${item}`} hidden />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className='w-full'>
        <p className='mb-2 font-medium'>Product Name</p>
        <input
          className='w-full max-w-lg px-3 py-2 border rounded-md outline-none focus:border-black'
          type='text'
          placeholder='Type here'
        />
      </div>

      {/* Product Description */}
      <div className='w-full'>
        <p className='mb-2 font-medium'>Product Description</p>
        <textarea
          className='w-full max-w-lg px-3 py-2 border rounded-md outline-none focus:border-black'
          placeholder='Write here'
          rows={4}
        />
      </div>

    

      {/* Category + Subcategory + Price */}
      <div className='flex flex-wrap gap-4'>

        <div>
          <p className='mb-2 font-medium'>Product Category</p>
          <select className='px-3 py-2 border rounded-md outline-none'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2 font-medium'>Sub Category</p>
          <select className='px-3 py-2 border rounded-md outline-none'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2 font-medium'>Product Price</p>
          <input
            className='px-3 py-2 border rounded-md outline-none w-32'
            type="number"
            placeholder='25'
          />
        </div>

      </div>


      {/* Product Size — */}
      <div>
        <p className='mb-2 font-medium'>Product Size</p>

        <div className='flex gap-2'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              className='border px-3 py-1 rounded-md cursor-pointer hover:bg-gray-100'
            >
              {size}
            </div>
          ))}
        </div>
      </div>


      {/* Submit Button */}
      <button
        type="submit"
        className='bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition'
      >
        ADD PRODUCT
      </button>

    </form>
  )
}

export default Add