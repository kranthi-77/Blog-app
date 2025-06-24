import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImBlogger2 } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { getToken, isSignedIn } = useAuth();
  const location = useLocation();
  const path = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const sort = searchParams.get("sort");

  useEffect(() => {
    getToken().then((token) => console.log(token));
  }, []);

  // Dynamic link style utility
  const getLinkClass = (route, isExact = true) =>
    `px-4 py-2 rounded-lg transition duration-200 ${
      (isExact && path === route) || (!isExact && path.startsWith(route))
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
    }`;

  return (
    <header className="w-full h-16 md:h-20 px-6 md:px-12 flex items-center justify-between bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-bold text-blue-900"
      >
        <ImBlogger2 className="w-8 h-8" />
        <span>Blogger</span>
      </Link>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          className="text-2xl text-gray-800"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <RxCross1 /> : <GiHamburgerMenu />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed top-16 right-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 font-medium text-lg transition-transform duration-300 z-40 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>

          {isSignedIn ? (
            <>
              <Link to="/write" className={getLinkClass("/write")}>
                Create Post
              </Link>
              <Link to="/my-posts" className={getLinkClass("/my-posts")}>
                My Posts
              </Link>
              <Link to="/saved-posts" className={getLinkClass("/saved-posts")}>
                Saved Posts
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/posts?sort=popular"
                className={`px-6 py-3 rounded-lg transition duration-200 ${
                  path === "/posts" && sort === "popular"
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                Most Popular
              </Link>
              <Link
                to="/posts?sort=trending"
                className={`px-6 py-3 rounded-lg transition duration-200 ${
                  path === "/posts" && sort === "trending"
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                Trending
              </Link>
            </>
          )}

          <SignedOut>
            <Link to="/login">
              <button className="bg-blue-800 py-2 px-4 rounded-full text-white hover:bg-blue-700">
                Login
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6 xl:gap-10 font-medium">
        <Link to="/" className={getLinkClass("/")}>
          Home
        </Link>

        {isSignedIn ? (
          <>
            <Link to="/write" className={getLinkClass("/write")}>
              Create a Post
            </Link>
            <Link to="/my-posts" className={getLinkClass("/my-posts")}>
              My Posts
            </Link>
            <Link to="/saved-posts" className={getLinkClass("/saved-posts")}>
              Saved Posts
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/posts?sort=popular"
              className={`px-4 py-2 rounded-lg transition duration-200 ${
                path === "/posts" && sort === "popular"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }`}
            >
              Most Popular
            </Link>
            <Link
              to="/posts?sort=trending"
              className={`px-4 py-2 rounded-lg transition duration-200 ${
                path === "/posts" && sort === "trending"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }`}
            >
              Trending
            </Link>
          </>
        )}

        <SignedOut>
          <Link to="/login">
            <button className="bg-blue-800 py-2 px-4 rounded-full text-white hover:bg-blue-700">
              Login
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
};

export default Navbar;
