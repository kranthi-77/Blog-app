import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'

const SideMenu = () => {
  return (
    <div px-4 h-max sticky top-8>
      <h1 className='mg-4 text-sm font-medium'>Search</h1>
      <Search/>
      <h1 className='mg-4 text-sm font-medium'>Filter</h1>
      <div className='text-sm flex flex-col'>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
            <input type="radio" value='newest' className='appearence-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer checked:bg-blue-800' />
            latest
        </label>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
            <input type="radio" value='newest' className='appearence-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer checked:bg-blue-800' />
            Trending
        </label>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
            <input type="radio" value='newest' className='appearence-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer checked:bg-blue-800' />
            Most Popular
        </label>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
            <input type="radio" value='newest' className='appearence-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer checked:bg-blue-800' />
            Oldest
        </label>
      </div>
      <h1 className='mg-4 text-sm font-medium'>Categories</h1>
      <div className='flex flex-col gap-2 text-sm'>
        <Link to='/posts' className='underline hover:text-blue-800'>All</Link>
        <Link to='/posts?cat=web-design' className='underline hover:text-blue-800'>Web Design</Link>
        <Link to='/posts?cat=devlopemnt' className='underline hover:text-blue-800'>Development</Link>
        <Link to='/posts?cat=database' className='underline hover:text-blue-800'>Database</Link>
        <Link to='/posts?cat=search' className='underline hover:text-blue-800'>Search</Link>
      </div>
    </div>
  )
}

export default SideMenu
