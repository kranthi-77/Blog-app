import React from 'react';
import PostListItem from "./PostListItem.jsx";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import Loading from './Loading.jsx';

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);

  console.log(searchParamsObj);

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  });
  return res.data;
};

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
    
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  if (isFetching) return <Loading/>;
  

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <img
          alt="Error loading"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          className="w-64 mb-6"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn't load the posts. Please try again.
        </p>
        <button
          onClick={() => refetch()}
          className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full shadow transition"
        >
          Try Again
        </button>
      </div>
    )
  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
    > {allPosts.length ? <div>
        {
        allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}</div>
      : 
      <div className="flex flex-col items-center">
        <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png'/>
        <h1 className="py-4 text-grey font-bold">No Posts Found</h1>
      </div>
      }
      
    </InfiniteScroll>
  );
};

export default PostList