import React from 'react';
import PostListItem from "./PostListItem.jsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from '@clerk/clerk-react';
import Loading from './Loading.jsx';


const fetchSavedPosts = async (token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.data; 
  };

const SavedPostsList = () => {
  const { getToken } = useAuth();
  const { data: savedPosts, isLoading, error } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      return fetchSavedPosts(token);
    },
  });

  console.log(savedPosts)

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
        <div className="flex flex-col items-center">
          <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" />
          <h1 className="py-4 text-grey font-bold">No Saved Posts Found</h1>
        </div>
      )}
    </>
  );
};

export default SavedPostsList;
