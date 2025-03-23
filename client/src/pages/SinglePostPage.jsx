import { Link } from "react-router-dom"
import Image from "../components/Image"
import PostMenuActions from "../components/PostMenuActions"
import Search from "../components/Search"
import Comments from "../components/Comments"

const SinglePostPage = ()=>{
    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-8">
                <div className="lg:w-3/5 flex flex-col gap-8">
                    <h1 className="text-xl md:text-3xl xl:text-4xl font-semibold">Crafting Engaging & User-Friendly Web Experiences</h1>
                    <div className="flex items-center gap-2 text-grey-400 text-sm">
                        <span>written by</span>
                        <Link className="text-blue-500">John</Link>
                        <Link className="text-blue-500">web</Link>
                        <span>on</span>
                        <span>2 days ago</span>
                    </div>
                    <p className="text-grey-500 font-medium">Web design blends aesthetics
                        and functionality to create visually appealing, user-friendly websites.
                        It ensures seamless navigation and responsiveness across all devices.</p>
                </div>
                <div className="hidden lg:block w-2/5">
                    <Image className="rounded-2xl" w='600' src='postImg.jpeg'/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-12">
                <div className="lg:text-lg flex flex-col gap-6 text-justify">
                    <p>
                    Web design is the art and science of creating visually appealing, functional, and user-friendly websites. It involves a combination of layout, color schemes, typography, and interactive elements to ensure an engaging experience for users. A well-designed website is not just about aesthetics; it also focuses on usability, accessibility, and responsiveness. With the increasing variety of devices, web designers must ensure that websites adapt seamlessly to different screen sizes, providing a smooth and consistent experience for all users.
                    Web design is the art and science of creating visually appealing, functional, and user-friendly websites. It involves a combination of layout, color schemes, typography, and interactive elements to ensure an engaging experience for users. A well-designed website is not just about aesthetics; it also focuses on usability, accessibility, and responsiveness. With the increasing variety of devices, web designers must ensure that websites adapt seamlessly to different screen sizes, providing a smooth and consistent experience for all users.
                    Web design is the art and science of creating visually appealing, functional, and user-friendly websites. It involves a combination of layout, color schemes, typography, and interactive elements to ensure an engaging experience for users. A well-designed website is not just about aesthetics; it also focuses on usability, accessibility, and responsiveness. With the increasing variety of devices, web designers must ensure that websites adapt seamlessly to different screen sizes, providing a smooth and consistent experience for all users.

                    </p>
                    <p>
                    Web design is the art and science of creating visually appealing, functional, and user-friendly websites. It involves a combination of layout, color schemes, typography, and interactive elements to ensure an engaging experience for users. A well-designed website is not just about aesthetics; it also focuses on usability, accessibility, and responsiveness. With the increasing variety of devices, web designers must ensure that websites adapt seamlessly to different screen sizes, providing a smooth and consistent experience for all users.
                    Web design is the art and science of creating visually appealing, functional, and user-friendly websites. It involves a combination of layout, color schemes, typography, and interactive elements to ensure an engaging experience for users. A well-designed website is not just about aesthetics; it also focuses on usability, accessibility, and responsiveness. With the increasing variety of devices, web designers must ensure that websites adapt seamlessly to different screen sizes, providing a smooth and consistent experience for all users.
                    Web design is the art and science of creating visually appealing, functional, and user-friendly websites. It involves a combination of layout, color schemes, typography, and interactive elements to ensure an engaging experience for users. A well-designed website is not just about aesthetics; it also focuses on usability, accessibility, and responsiveness. With the increasing variety of devices, web designers must ensure that websites adapt seamlessly to different screen sizes, providing a smooth and consistent experience for all users.

                    </p>
                
                </div>
                <div className="hidden md:block px-4 h-max stickey top-8">
                    <h1 className="mt-8 mb-4 text-sm font-medium">Author</h1>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-8">
                            <Image src='userImg.jpeg' className='w-12 h-12 rounded-full object-cover' />
                            <Link className="text-blue-800">John</Link>
                        </div>
                        <p className="text-sm text-grey-500">njv ajcjvk adjnv</p>
                        <div className="flex items-center py-2 pb-4">
                            <Link>
                                <Image src='facebook.svg' />
                            </Link>
                            <Link>
                                <Image src='instagram.svg' />
                            </Link>
                        </div>
                    </div>
                    <PostMenuActions/>
                    <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
                    <div className="flex flex-col gap-3 text-sm">
                        <Link className="underline" to='/'>All</Link>
                        <Link className="underline" to='/'>Web Design</Link>
                        <Link className="underline" to='/'>Development</Link>
                        <Link className="underline" to='/'>Database</Link>
                        <Link className="underline" to='/'>Search Engines</Link>
                        <Link className="underline" to='/'>Marketing</Link>
                    </div>
                    <h1 className="mt-8 mb-4 text-md font-medium">Search</h1>
                     <Search/>
                </div>
            </div>
            <Comments/>
        </div>

    )
}

export default SinglePostPage