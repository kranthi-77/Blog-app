import React from 'react';
import { Link,useParams } from "react-router-dom"
import Image from "../components/Image"
import PostMenuActions from "../components/PostMenuActions.jsx"
import Search from "../components/Search"
import Comments from "../components/Comments"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { useAuth } from "@clerk/clerk-react"
import Loading from '../components/Loading.jsx';

const fetchPost = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
    return res.data;
  };


const SinglePostPage = ()=>{
    const { slug } = useParams();
    // const {getToken}  = useAuth()
    // const token = getToken()
    const { isSignedIn } = useAuth();
    const { isPending, error, data } = useQuery({
        queryKey: ["post", slug],
        queryFn: () => fetchPost(slug),
    });

    if (isPending) return <Loading/>;
    if (error) return "Something went wrong!" + error.message;
    if (!data) return "Post not found!";


    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-8">
                <div className="lg:w-3/5 flex flex-col gap-8">
                    <h1 className="text-xl md:text-3xl xl:text-4xl font-semibold">{data.title}</h1>
                    <div className="flex items-center gap-2 text-grey-400 text-sm">
                        <span>written by</span>
                        <Link className="text-blue-500">{data.user.username}</Link>
                        <span>on</span>
                        <Link className="text-blue-500">{data.category}</Link>
                        
                        <span>{format(data.createdAt)}</span>
                    </div>
                    <p className="text-grey-500 font-medium">{data.desc}</p>
                </div>
                    {data.img && (
                    <div className="hidden lg:block w-2/5">
                        <Image src={data.img} w="600" className="rounded-2xl" />
                    </div>
                    )}
                </div>
            <div className="flex flex-col md:flex-row gap-12">
                <div className="lg:text-lg mb-12 flex flex-col gap-6 text-justify" dangerouslySetInnerHTML={{ __html: data.content }}>
                </div>

                {isSignedIn && <div className="hidden md:block px-4 h-max stickey top-8">
                    <h1 className="mt-8 mb-4 text-sm font-medium">Author</h1>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-8">
                            <Image src='userImg.jpeg' className='w-12 h-12 rounded-full object-cover' />
                            <Link className="text-blue-800">{data.user.username}</Link>
                        </div>
                        <p className="text-sm text-grey-500">Be Wise</p>
                        <div className="flex items-center py-2 pb-4">
                            <Link>
                                <Image src='facebook.svg' />
                            </Link>
                            <Link>
                                <Image src='instagram.svg' />
                            </Link>
                        </div>
                    </div>
                    <PostMenuActions post={data}/>
                    <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
                    <div className="flex flex-col gap-3 text-sm">
                        <Link className="hover:text-blue-600" to='/'>All</Link>
                        <Link className="hover:text-blue-600" to='/'>Web Design</Link>
                        <Link className="hover:text-blue-600" to='/'>Development</Link>
                        <Link className="hover:text-blue-600" to='/'>Database</Link>
                        <Link className="hover:text-blue-600" to='/'>Search Engines</Link>
                        <Link className="hover:text-blue-600" to='/'>Marketing</Link>
                    </div>
                    <h1 className="mt-8 mb-4 text-md font-medium">Search</h1>
                     <Search/>
                </div>
                }

                
            </div>
            {isSignedIn && <Comments postId={data._id}/>}
        </div>

    )
}

export default SinglePostPage