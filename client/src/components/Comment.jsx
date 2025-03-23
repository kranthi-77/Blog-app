import React from 'react'
import Image from './Image'
const Comment = () => {
  return (
      <div className='p-4 bg-slate-200 rounded-xl mb-4'>
        <div className='flex items-center gap-4'>
            <Image className='w-10 h-10 rounded-full object-cover' w='40' src='userImg.jpeg' />
            <span>John</span>
            <span>2 days ago</span>

        </div>
        <div className='mt-2'>
            <p>Web design blends aesthetics
            and functionality to create visually appealing</p>
        </div>
      </div>
  )
}

export default Comment
