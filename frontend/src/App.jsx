import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Product from './pages/Product'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App =() =>{
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [theme, setTheme] = useState(() => localStorage.getItem('site-theme') || 'light');

  useEffect(() => {
    localStorage.setItem('site-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };


  return (
   <div className={`app-shell app-theme-${theme} px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]`}>
    <ToastContainer />
    <Nav theme={theme} toggleTheme={toggleTheme} isHomePage={isHomePage} />
    <SearchBar />
    <Routes>
      <Route path='/' element={<Home theme={theme} />} />
      <Route path='/collection' element={<Collection />} />
      <Route path='/about' element={<About />} />
      <Route path='/login' element={<Login />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/place-order' element={<PlaceOrder />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/product/:productId' element={<Product />} />
    </Routes>
    <Footer />
   </div>
  )
}

export default App
