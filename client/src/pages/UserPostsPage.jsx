import React from 'react'
import UserPostsList from '../components/UserPostsList'

const UserPostsPage = () => {

  return (
    <div>
        <h1 className="mb-8 text-2xl">Your Posts</h1>
        <div className="flex flex-col-reverse md:flex-row gap-8">
            <div className="">
                <UserPostsList />
            </div>
        </div>
    </div>
  )
}

export default UserPostsPage
