import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import ProductList from './components/product/ProductList'
import Login from './components/auth/Login'
import ViewCart from './components/cart/ViewCart'
import ViewProduct from './components/product/ViewProduct'
import Checkout from './components/order/Checkout'

function App() {
  return (
    <Routes>
      <Route path='' element={<Home />} />
      <Route path='/shop' element={<ProductList />} />
      <Route path='/login' element={<Login />} />
      <Route path='/cart' element={<ViewCart />} />
      <Route path='/product/:productId/view' element={<ViewProduct />} />
      <Route path='/order/checkout' element={<Checkout />} />
    </Routes>
  )
}

export default App