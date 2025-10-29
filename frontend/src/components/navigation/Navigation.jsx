import React from 'react'
import { Wishlist } from '../common/Wishlist'
import { AccountIcon } from '../common/AccountIcon'
import { CartIcon } from '../common/CartIcon'
import { Link, NavLink } from 'react-router-dom'

const Navigation = ({variant="default"}) => {
  return (
    <nav className='flex items-center py-6 px-8 md:px-16 justify-between gap-4 md:gap-20 custom-nav bg-white shadow-sm'>
  <div className='flex items-center'>
    {/* Logo */}
    <Link to='/' className='text-2xl md:text-3xl text-black font-bold hover:text-gray-700 transition-colors'>
      Grizzly
    </Link>
  </div>
  {variant==="default" && 
  <div className='hidden md:flex flex-wrap items-center gap-10'>
    {/* Nav items */}
    <ul className='flex gap-8 lg:gap-14'>
      <li>
        <NavLink 
          to='/' 
          className={({isActive}) => 
            `text-gray-600 hover:text-black transition-colors font-medium ${
              isActive ? 'active-link text-black border-b-2 border-black' : ''
            }`
          }
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink 
          to='/men' 
          className={({isActive}) => 
            `text-gray-600 hover:text-black transition-colors font-medium ${
              isActive ? 'active-link text-black border-b-2 border-black' : ''
            }`
          }
        >
          Men
        </NavLink>
      </li>
      <li>
        <NavLink 
          to='/women' 
          className={({isActive}) => 
            `text-gray-600 hover:text-black transition-colors font-medium ${
              isActive ? 'active-link text-black border-b-2 border-black' : ''
            }`
          }
        >
          Women
        </NavLink>
      </li>
      <li>
        <NavLink 
          to='/kids' 
          className={({isActive}) => 
            `text-gray-600 hover:text-black transition-colors font-medium ${
              isActive ? 'active-link text-black border-b-2 border-black' : ''
            }`
          }
        >
          Kids
        </NavLink>
      </li>
    </ul>
  </div>
  }
  {variant==="default" &&
  <div className='hidden sm:flex flex-wrap justify-center'>
    {/* Search bar */}
    <div className='border border-gray-300 rounded-lg flex overflow-hidden hover:border-gray-400 transition-colors'>
      <div className="flex items-center justify-center px-3">
        <svg 
          className="h-4 w-4 text-gray-500" 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
        >
          <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
        </svg>
      </div>
      <input 
        type="text" 
        className="px-3 py-2 outline-none text-sm w-48 lg:w-56" 
        placeholder="Search products..."
      />
    </div>
  </div>
}
  <div className='flex items-center gap-3 md:gap-4'>
    {/* Action Items - icons */}
    {variant==="default" && 
    <ul className='flex gap-4 md:gap-6'>
      <li>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Wishlist />
        </button>
      </li>
      <li>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <AccountIcon/>
        </button>
      </li>
      <li>
        <Link 
          to='/cart-items' 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors block"
        >
          <CartIcon />
        </Link>
      </li>
    </ul>}
        {
          variant === "auth" &&
          <ul className='flex gap-8'>
            <li className='text-black border border-black hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'><NavLink to={"/v1/login"} className={({isActive})=> isActive ? 'active-link':''}>Login</NavLink></li>
            <li className='text-black border border-black hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'><NavLink to="/v1/register" className={({isActive})=> isActive ? 'active-link':''}>Signup</NavLink></li>
          </ul>
        }
    
    {/* Mobile menu button */}
    <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</nav>
  )
}

export default Navigation