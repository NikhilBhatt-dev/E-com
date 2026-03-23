

import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'
import axios from 'axios'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [sizes, setSizes] = useState([])
  const [bestseller, setBestseller] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (Number(price) < 0) {
      toast.error("Price cannot be negative");
      return;
    }

    let toastId;

    try {
      setIsSubmitting(true);
      toastId = toast.loading("Uploading product...");
      const formData = new FormData();

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('bestseller', bestseller);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.update(toastId, {
          render: "Item added successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          closeOnClick: true,
        });
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setCategory('Men');
        setSubCategory('Topwear');
        setSizes([]);
        setBestseller(false);

      } else {
        toast.update(toastId, {
          render: response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 2500,
          closeOnClick: true,
        });
      }
      
    } catch (error) {
      console.log(error);
      if (toastId) {
        toast.update(toastId, {
          render: error.message,
          type: "error",
          isLoading: false,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
    
  };

  return (

    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6'>

      {/* Upload Images */}
      <div>
        <p className='mb-2 font-medium'>Upload Images</p>
        <div className='flex gap-3'>

          <label className='cursor-pointer'>
            <img className='w-20 h-20 border rounded-md'
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" hidden />
          </label>

          <label className='cursor-pointer'>
            <img className='w-20 h-20 border rounded-md'
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" hidden />
          </label>

          <label className='cursor-pointer'>
            <img className='w-20 h-20 border rounded-md'
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" hidden />
          </label>

          <label className='cursor-pointer'>
            <img className='w-20 h-20 border rounded-md'
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" hidden />
          </label>

        </div>
      </div>

      {/* Product Name */}
      <div className='w-full'>
        <p className='mb-2 font-medium'>Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)} value={name}
          className='w-full max-w-lg px-3 py-2 border rounded-md'
          type='text'
          placeholder='Type here'
        />
      </div>

      {/* Description */}
     
      <textarea
        required
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className='w-full max-w-lg px-3 py-2 border rounded-md'
        placeholder='Write here'
      />

      {/* Category */}
      <div className='flex gap-4'>
        <select onChange={(e) => setCategory(e.target.value)} value={category} className='border px-3 py-2'>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='border px-3 py-2'>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>

        <input
          onChange={(e) => setPrice(e.target.value)} value={price}
          className='border px-3 py-2 no-spinner'
          type="number"
          min="0"
          placeholder='Enter price'
          required
        />
      </div>

      <div className='flex gap-2'>
        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
          <div
            key={size}
            onClick={() =>
              setSizes(prev =>
                prev.includes(size)
                  ? prev.filter(s => s !== size)
                  : [...prev, size]
              )
            }
            className={`px-3 py-1 border cursor-pointer rounded-md transition
      ${sizes.includes(size)
                ? "bg-[#c89cb2] text-white border-[#c89cb2]"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
          >
            {size}
          </div>
        ))}
      </div>

      {/* Bestseller */}
      <div className='flex gap-2'>

        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(prev => !prev)}
        />
        <p>Add to bestseller</p>
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className={`bg-black text-white px-6 py-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'ADDING...' : 'ADD PRODUCT'}
      </button>
      
    </form>
  )
}

export default Add
