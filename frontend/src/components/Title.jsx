import React from 'react'

const  Title = ({text1, text2}) => {
  return (
    <div className='home-title inline-flex gap-2 items-center mb-3'>
        <p className='home-title-text text-gray-700'>{text1}
            <span className='home-title-text text-gray-700 font-medium'>{text2}</span>
          </p>
            <p className='home-title-line w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
        
    </div>
  )
}

export default  Title
