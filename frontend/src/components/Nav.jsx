import React from 'react'
import { useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Nav = ({ theme, toggleTheme, isHomePage }) => {

    const [visible, setvisible] = useState(false);
    const {setShowSearch, getCartCount} = useContext(ShopContext);
  return (
    <div className={`flex items-center justify-between py-5 font-medium transition-colors duration-300 ${isHomePage ? 'home-nav' : ''}`}>
     <Link to='/'>
     <img src={assets.logo} alt="logo" className='w-36'/>
          </Link>
    <ul className={`hidden sm:flex gap-5 text-sm ${isHomePage ? 'home-nav-links' : 'text-gray-700'}`}>

        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>Home</p>
                  <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

        </NavLink>
              <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                  <p>COLLECTION</p>
                  <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

              </NavLink>

              <NavLink to='/about' className='flex flex-col items-center gap-1'>
                  <p>ABOUT</p>
                  <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

              </NavLink>

              <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                  <p>CONTACT</p>
                  <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

              </NavLink>


    </ul>

    <div className='flex items-center gap-4 sm:gap-6'>
        {isHomePage && (
          <button
            type='button'
            onClick={toggleTheme}
            className='theme-toggle flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500'
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' className='theme-toggle-icon h-5 w-5'>
                <circle cx='12' cy='12' r='4' />
                <path d='M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77' />
              </svg>
            ) : (
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='theme-toggle-icon h-5 w-5'>
                <path d='M21 14.25A8.25 8.25 0 0 1 9.75 3a8.25 8.25 0 1 0 11.25 11.25Z' />
              </svg>
            )}
          </button>
        )}
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="search-icon" className='w-5 cursor-pointer' />
        
        <div className='group relative'>
                 
          <Link  to='/login'> 
          <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="profile_icon" /> 
          </Link>
                  <div className='group-hover:block hidden absolute right-0 pt-4'>
                      <div className={`flex flex-col gap-2 w-36 py-3 px-5 rounded shadow-md ${isHomePage ? 'home-profile-menu' : 'bg-white text-gray-500'}`}>
                          <p className='cursor-pointer hover:text-black'>My Profile</p>
                          <p className='cursor-pointer hover:text-black'>Orders</p>
                          <p className='cursor-pointer hover:text-black'>Logout</p>
                      </div>
                  </div>
        </div>


        <Link to='/cart' className='relative'>
        <img src={assets.cart_icon} alt="cart-icon" className='w-5 min-w-5' />
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[-8px]'>{getCartCount()}</p>
        </Link>
        <img  onClick ={() => setvisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden' />

    </div>


    {/* sidebar menu for small screen */}


          <div className={`fixed top-0 right-0 h-full z-50 transition-all duration-300 ${visible ? 'w-64' : 'w-0 overflow-hidden'} ${isHomePage ? 'home-mobile-menu' : 'bg-white'}`}>
              <div className={`flex flex-col ${isHomePage ? 'home-mobile-menu-links' : 'text-gray-600'}`}>
                    <div onClick={()=>setvisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>

                    </div>

                    <NavLink onClick={()=> setvisible(false)}  className='py-2 pl-6 border'  to='/'>HOME</NavLink>
                    <NavLink onClick={()=> setvisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={()=> setvisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=> setvisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>

                </div>
        </div>
    </div>
  )
}

export default Nav
