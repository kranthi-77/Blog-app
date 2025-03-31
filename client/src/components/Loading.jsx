import React from 'react'
import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='flex items-center justify-center min-h-screen w-full' >
        <ThreeDots 
          height="50" 
          width="50" 
          radius="9"
          color="#0b69ff" 
          ariaLabel="three-dots-loading"
          visible={true}
      />
    </div>
  )
}

export default Loading
