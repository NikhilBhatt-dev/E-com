import React, { useEffect } from 'react';
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from './Title';
import { useState } from 'react';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
      setLatestProducts(products.slice(0, 10));
    }, [products]);
    

  return (
    <div className='home-section my-10'>
        <div className='text-center py-9 text-3xl'>
            <Title text1={'Latest'} text2={'Collection'} />
            <p className='home-section-subtitle w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, recusandae.
                </p>
        </div>

        {/* Rendering Product */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {latestProducts.map((items,index) => (
                <ProductItem key={index} id={items._id} image={items.image} name={items.name} price={items.price}  />
            ))}
        </div>
    </div>
  
  )
}

export default LatestCollection
