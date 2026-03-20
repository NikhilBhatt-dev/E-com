import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {

    const { currency } = useContext(ShopContext);

    return (
        <Link to={`/product/${id}`} className='home-product-item text-gray-700 cursor-pointer'>
            
            <div className='home-product-image overflow-hidden'>
                <img 
                    src={image[0]} 
                    onError={(e) => (e.target.src = image[1]?.url)} 
                    className='hover:scale-110 transition ease-in-out' 
                    alt={name}
                />
            </div>

            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
      
        </Link>
    )
}

export default ProductItem
