import React from 'react';
import { useState } from "react"
import PostList from "../components/PostList"
import SideMenu from "../components/SideMenu"

const PostListPage = ({type='all'})=>{
    const [open,setOpen] =useState()
    return (
        <div className='mt-10'>
            <button className="bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-2 md:hidden"  onClick={()=>setOpen((prev)=>!prev)}>
                {open ? "Close":"Filter or Search" }
            </button>
            <div className="flex flex-col-reverse md:flex-row gap-8">
                <div className="">
                    <PostList />
                </div>
                <div className={`${!open&& 'hidden'} md:block`}>
                    <SideMenu/>
                </div>
            </div>
        </div>
    )
}

export default PostListPage