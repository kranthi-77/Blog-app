import React from 'react';
import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import Loading from './Loading';

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const FeaturedPosts = () => {
  const {
    isPending,
    error,
    data,
    refetch, 
  } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: fetchPost,
  });

  if (isPending) return <Loading />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <img
          alt="Error loading"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          className="w-64 mb-6"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          We couldn't load the featured posts. Please try again.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => refetch()}
            className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full shadow transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return;
  }

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* image */}
        {posts[0].img && <Image
          src={posts[0].img}
          className="rounded-3xl object-cover"
          w="895"
        />}
        {/* details */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-blue-800 lg:text-lg">{posts[0].category}</Link>
          <span className="text-gray-500">{format(posts[0].createdAt)}</span>
        </div>
        {/* title */}
        <Link
          to={posts[0].slug}
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          {posts[0].title}
        </Link>
      </div>
      {/* Others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* second */}
        {posts[1] && <div className="lg:h-1/3 flex justify-between gap-4">
          {posts[1].img && <div className="w-1/3 aspect-video">
            <Image
              src={posts[1].img}
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>}
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link className="text-blue-800">{posts[1].category}</Link>
              <span className="text-gray-500 text-sm">{format(posts[1].createdAt)}</span>
            </div>
            {/* title */}
            <Link
              to={posts[1].slug}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              {posts[1].title}
            </Link>
          </div>
        </div>}
        {/* third */}
        {posts[2] && <div className="lg:h-1/3 flex justify-between gap-4">
          {posts[2].img && <div className="w-1/3 aspect-video">
            <Image
              src={posts[2].img}
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>}
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">03.</h1>
              <Link className="text-blue-800">{posts[2].category}</Link>
              <span className="text-gray-500 text-sm">{format(posts[2].createdAt)}</span>
            </div>
            {/* title */}
            <Link
              to={posts[1].slug}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              {posts[2].title}
            </Link>
          </div>
        </div>}
        {/* fourth */}
        {posts[3] && <div className="lg:h-1/3 flex justify-between gap-4">
          {posts[3].img && <div className="w-1/3 aspect-video">
            <Image
              src={posts[3].img}
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>}
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">04.</h1>
              <Link className="text-blue-800">{posts[3].category}</Link>
              <span className="text-gray-500 text-sm">{format(posts[3].createdAt)}</span>
            </div>
            {/* title */}
            <Link
              to={posts[3].slug}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              {posts[3].title}
            </Link>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default FeaturedPosts;