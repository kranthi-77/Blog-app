import React from "react";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

const SavedPostsHeader = ({ count = 0 }) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      {/* Left - Icon and text */}
      <div className="flex items-center gap-3">
        <FaBookmark className="text-blue-600 text-2xl" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Your Saved Posts</h1>
          <p className="text-gray-500 text-sm md:text-base">
            {count > 0
              ? `You have ${count} saved ${count === 1 ? "post" : "posts"}.`
              : "Bookmark posts to easily revisit them later."}
          </p>
        </div>
      </div>

      {/* Right - CTA */}
      {count > 0 && (
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-full transition"
        >
          Explore More Posts
        </Link>
      )}
    </div>
  );
};

export default SavedPostsHeader;
