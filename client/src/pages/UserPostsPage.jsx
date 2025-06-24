import React, { useState } from 'react';
import UserPostsList from '../components/UserPostsList';
import { MdArticle } from 'react-icons/md';
import { Link } from 'react-router-dom';

const UserPostsPage = () => {
  const [count, setCount] = useState(0); // Optional: if UserPostsList returns a count

  return (
    <div className="mt-10 px-4">
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <MdArticle className="text-blue-600 text-2xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Posts</h1>
            <p className="text-gray-500 text-sm md:text-base">
              {count > 0
                ? `You have published ${count} ${count === 1 ? 'post' : 'posts'}.`
                : 'All your published content appears here.'}
            </p>
          </div>
        </div>
        <Link
          to="/write"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-full transition"
        >
          Create New Post
        </Link>
      </div>

      {/* Post List */}
      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="w-full">
          <UserPostsList onCountChange={setCount} />
        </div>
      </div>
    </div>
  );
};

export default UserPostsPage;
