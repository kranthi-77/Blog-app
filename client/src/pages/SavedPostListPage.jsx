import React from 'react';
import { useState } from "react"
import SavedPostsList from '../components/SavedPostList';
import SavedPostsHeader from '../components/SavedPostsHeader';

const SavedPostListPage = ()=>{
    const [open,setOpen] =useState()
    const [count, setCount] = useState(0)
    return (
        <div className='mt-10 px-4'>
            <SavedPostsHeader count={count} />
            <div className="flex flex-col-reverse md:flex-row gap-8">
                <div className="">
                    <SavedPostsList onCountChange={setCount}/>
                </div>
            </div>
        </div>
    )
}

export default SavedPostListPage