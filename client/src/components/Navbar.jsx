import React from 'react';
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImBlogger2 } from "react-icons/im";

import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "@clerk/clerk-react";

const Navbar = ()=>{
    const [open,setOpen] = useState(false)
    const {getToken,isSignedIn}  = useAuth()
    
    useEffect(()=>{
        getToken().then(token=>console.log(token))
    },[])
    return (
        <div className="w-full h-16 mb-4 md:h-20 flex items-center justify-between">
            <Link to='/' className="flex items-center gap-4 text-2xl font-bold">
                <ImBlogger2 w={32} h={32} />
                {/*why span elment*/}
                <span>Blogger</span>
            </Link>
            <div className="md:hidden">
                <div className='cursor-pointer text-2xl' onClick={()=>setOpen((prev)=>!prev)}>
                    {
                        open? <RxCross1 />:<GiHamburgerMenu />
                    }
                </div>
                {/* Mobile link lis */}
                <div className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg  absolute top-16 bg-white transition-all ease-in-out 
                    ${open?"-right-0":"-right-[100%]"}`}>
                    <Link to="/">Home</Link>
                    {isSignedIn ? (<div className='flex flex-col items-center justify-center gap-8'>
                        <Link to="/write">Create Post</Link>
                        <Link to="/my-posts">My Posts</Link>
                        <Link to="/saved-posts">Saved Posts</Link>
                    </div>
                        ): (
                            <div className='flex flex-col items-center justify-center gap-8'>
                            <Link to="/">Most Popular</Link>
                            <Link to="/">Trending</Link>
                            </div>
                        )}
                    <SignedOut>
                    <Link className="pt-2" to="/login">
                        <button className="bg-blue-800 py-2 px-4 rounded-3xl text-white">Login</button>
                    </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
            <div className="hidden md:flex item-center gap-8 xl:gap-16 font-medium pt-8">
                <Link to="/">Home</Link>
                {isSignedIn ? (
                    <div className='hidden md:flex  item-center gap-6'>
                        <Link to="/write">Create a Post</Link>
                        <Link to="/my-posts">My Posts</Link>
                        <Link to="/saved-posts">Saved Posts</Link>
                    </div>
                    ): (
                        <div className='hidden md:flex  item-center gap-6 xl:gap-12'>
                            <Link to="/posts?sort=popular">Most Popular</Link>
                            <Link to="/posts?sort=trending">Trending</Link>
                        </div>
                    )}
                <SignedOut>
                    <Link className="pb-2" to="/login">
                        <button className="bg-blue-800 py-2 px-4 rounded-3xl text-white">Login</button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>

        </div>
    )
}

export default Navbar