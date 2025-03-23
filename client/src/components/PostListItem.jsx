import React from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'

const PostListItem = () => {
  return (
    <div className='flex flex-col xl:flex-row gap-8 mb-8'>
      <div className='md:hidden xl:block xl:w-1/3'>
        <Image src='postImg.jpeg' className='rounded-2xl object-cover' w='735'/>
      </div>
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link to='/test' className='text-4xl font-semibold'>
          Crafting Engaging & User-Friendly Web Experiences
        </Link>
      
      <div className='flex items-center gap-2 text-grey-400 text-sm'>
        <span>Written by</span>
        <Link className='text-blue-800'>John</Link>
        <span>on</span>
        <Link>Web Design</Link>
        <span>2 days ago</span>
      </div>
      <p className=''>Web design blends aesthetics and functionality to create visually appealing, user-friendly websites. It ensures seamless navigation and responsiveness across all devices.</p>
      <Link className='underline text-sm text-blue-800' to='/test'>Read More</Link>
      </div>
    </div>
  )
}

export default PostListItem
