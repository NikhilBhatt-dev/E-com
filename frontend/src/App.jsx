import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Nav from './components/Nav'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import PageSkeleton from './components/PageSkeleton'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './bones/registry'

const Home = lazy(() => import('./pages/Home'))
const Collection = lazy(() => import('./pages/Collection'))
const About = lazy(() => import('./pages/About'))
const Login = lazy(() => import('./pages/Login'))
const Contact = lazy(() => import('./pages/Contact'))
const Cart = lazy(() => import('./pages/Cart'))
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'))
const Orders = lazy(() => import('./pages/Orders'))
const Product = lazy(() => import('./pages/Product'))
const Profile = lazy(() => import('./pages/Profile'))
const Verify = lazy(() => import('./pages/Verify'))

const routeFallback = (
  <PageSkeleton
    name="route-loading"
    loading={true}
    resetKey="route-loading"
    fallback={
      <div className="space-y-5 py-8" aria-hidden="true">
        <div className="h-8 w-40 animate-pulse rounded bg-black/10" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-56 animate-pulse rounded bg-black/10" />
          <div className="space-y-3">
            <div className="h-6 w-3/4 animate-pulse rounded bg-black/10" />
            <div className="h-6 w-full animate-pulse rounded bg-black/10" />
            <div className="h-6 w-5/6 animate-pulse rounded bg-black/10" />
            <div className="h-11 w-36 animate-pulse rounded bg-black/10" />
          </div>
        </div>
      </div>
    }
  />
);

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
    <Suspense fallback={routeFallback}>
      <Routes>
        <Route path='/' element={<Home theme={theme} />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/product/:productId' element={<Product />} />
      </Routes>
    </Suspense>
    <Footer />
   </div>
  )
}

export default App
