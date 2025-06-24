import React, { useState } from 'react';
import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from './Loading.jsx';

const PostMenuActions = ({ post }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [isSave,saveFun] = useState(false)
  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => { 
      const token = await getToken();
      return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const isAdmin = user?.publicMetadata?.role === "admin" || false;
  const isSaved = savedPosts?.data?.some((p) => p === post._id) || false;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleFeature = () => {
    featureMutation.mutate();
  };

  const handleSave = () => {
    if (!user) {
      return navigate("/login");
    }
    saveFun(prev=> !prev)
    saveMutation.mutate();
  };

  return (
      <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-64">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Actions</h2>
    
        {isPending ? (
          <Loading />
        ) : error ? (
          <p className="text-sm text-red-500">Failed to load saved posts</p>
        ) : (
          <button
            onClick={handleSave}
            className="w-full flex items-center gap-3 px-3 py-2 mb-2 rounded-md text-sm hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
              <path
                d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
                stroke="black"
                strokeWidth="2"
                fill={isSave ? "black" : "none"}
              />
            </svg>
            <span>Save this Post</span>
            {saveMutation.isPending && <span className="text-xs text-gray-400 ml-auto">Saving...</span>}
          </button>
        )}
    
        {isAdmin && (
          <button
            onClick={handleFeature}
            className="w-full flex items-center gap-3 px-3 py-2 mb-2 rounded-md text-sm hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
              <path
                d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
                stroke="black"
                strokeWidth="2"
                fill={post.isFeatured ? "black" : "none"}
              />
            </svg>
            <span>Feature</span>
            {featureMutation.isPending && <span className="text-xs text-gray-400 ml-auto">Featuring...</span>}
          </button>
        )}
    
        {user && (post.user.username === user.username || isAdmin) && (
          <>
            <button
              onClick={() => navigate(`/edit/${post.slug}`)}
              className="w-full flex items-center gap-3 px-3 py-2 mb-2 rounded-md text-sm hover:bg-gray-100 transition-colors text-blue-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.004 1.004 0 000-1.42l-2.34-2.34a1.004 1.004 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/>
              </svg>
              <span>Edit this Post</span>
            </button>
    
            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-red-50 transition-colors text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="red"
                width="20px"
                height="20px"
              >
            <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z" />
          </svg>
              <span>Delete this Post</span>
              {deleteMutation.isPending && <span className="text-xs text-gray-400 ml-auto">Deleting...</span>}
            </button>
          </>
        )}
      </div>
    
  );
};

export default PostMenuActions;