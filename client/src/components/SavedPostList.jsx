import React, { useEffect } from 'react';
import PostListItem from "./PostListItem.jsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from '@clerk/clerk-react';
import Loading from './Loading.jsx';
import { Link } from 'react-router-dom';


const fetchSavedPosts = async (token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.data; 
  };

const SavedPostsList = ({onCountChange}) => {
  const { getToken } = useAuth();
  const { data: savedPosts, isLoading, error } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      return fetchSavedPosts(token);
    },
  });

  console.log(savedPosts)
  useEffect(() => {
    if (savedPosts && onCountChange) {
      onCountChange(savedPosts.length);
    }
  }, [savedPosts]);

  if (isLoading) return <Loading/>;

  if (error) {
    return (
      <div className="flex flex-col items-center py-4">
        <img
          alt="error"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        />
        <h1>Something went wrong! {error.message}</h1>
      </div>
    );
  }

  return (
    <>
      {savedPosts && savedPosts.length > 0 ? (
        <div>
          {savedPosts.map((post) => (
            <PostListItem key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl py-8 min-h-[300px]">
          {/* Left - Image */}
          <div className="flex-shrink-0">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
              alt="no saved posts"
              className="w-90 md:w-130"
            />
          </div>

          {/* Right - Text & Button */}
          <div className="text-center md:text-left max-w-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
              No Saved Posts Found
            </h2>
            <p className="text-gray-500 mb-6 text-sm md:text-base">
              You haven't saved any posts yet. Start exploring and bookmark your favorite reads!
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-full transition"
            >
              Explore Posts
            </Link>
          </div>
        </div>
      </div>

      )}
    </>
  );
};

export default SavedPostsList;
