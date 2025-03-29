import React from 'react';
import { useState } from "react"
import SavedPostsList from '../components/SavedPostList';

const SavedPostListPage = ()=>{
    const [open,setOpen] =useState()
    return (
        <div>
            <h1 className="mb-8 text-2xl">Your Saved Posts</h1>
            <div className="flex flex-col-reverse md:flex-row gap-8">
                <div className="">
                    <SavedPostsList />
                </div>
            </div>
        </div>
    )
}

export default SavedPostListPage