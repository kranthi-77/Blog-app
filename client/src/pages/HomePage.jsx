import { Link } from "react-router-dom"
import MainCategories from "../components/MainCategories"
import FeaturedPosts from "../components/FeaturedPosts"
import PostList from "../components/PostList"

const Homepage = ()=>{
    return (
        <div className="mt-4 flex flex-col gap-4">
            <div className="flex gap-4">
                <Link to='/'>Home</Link>
                <span>*</span>
                <span>Blogs and Articles</span>
            </div>
            {/* Into */}
            <div className="flex items-center justify-between">
                <div className="">
                    <h1 className="text-grey-800 text-2xl md:text-5xl lg:text-6xl font-bold">Unleash Your Thoughts, Inspire the World!</h1>
                    <p className="mt-8 text-md md:text-xl">Share your stories, ideas, and insights with a global audience—one blog at a time.</p>
                </div>
            </div>
            <MainCategories/>
            <FeaturedPosts/>
            <div className="">
                <h1 className="my-8 text-2xl text-grey-600">Recent Posts</h1>
                <PostList/>
            </div>

        </div>
    )
}

export default Homepage