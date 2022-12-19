import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='container'>
    <ul class="nav">
  <li class="nav-item">
    <Link class="nav-link active" aria-current="page" to="/">Home</Link>
  </li>
  <li class="nav-item">
    <Link class="nav-link" to="/adding-category">Adding category</Link>
  </li>
  <li class="nav-item">
    <Link class="nav-link" to="/adding-product">Adding Product</Link>
  </li>
  <li class="nav-item">
  <Link class="nav-link" to="/category-list">category List</Link>
</li>
  <li class="nav-item">
    <Link class="nav-link" to="/product-list">Product List</Link>
  </li>
  
</ul>
    </div>
  )
}
