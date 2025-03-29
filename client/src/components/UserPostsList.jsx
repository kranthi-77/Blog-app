import React from 'react';
import PostListItem from "./PostListItem.jsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';


const fetchUserPosts = async (token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/my-posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.data; 
  };

const UserPostsList = () => {
  const { getToken } = useAuth();
  const { data: myPosts, isLoading, error } = useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => {
      const token = await getToken();
      return fetchUserPosts(token);
    },
  });


  if (isLoading) return <div>Loading...</div>;

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
      {myPosts && myPosts.length > 0 ? (
        <div>
          {myPosts.map((post) => (
            <PostListItem key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" />
          <h1 className="py-4 text-grey font-bold">Nothing here yet — create your first post!</h1>
          <Link className="pt-2" to="/write">
              <button className="bg-blue-800 py-2 px-4 rounded-3xl text-white">Create a Post</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default UserPostsList;
