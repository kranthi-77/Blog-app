✍️ Full-Stack Blog Platform
A powerful and modern full-stack blogging platform built using the MERN stack, featuring full CRUD capabilities, post scheduling, image upload with CDN, commenting, and role-based admin moderation. Built for scalability, speed, and clean user experience.

🚀 Features
📝 Full Blog CRUD – Create, read, update, delete posts with rich text support.

🕒 Post Scheduling – Schedule posts to auto-publish at a later time using cron jobs.

💬 Commenting System – Users can comment and interact on blog posts.

🔐 RBAC & Auth – Secure sign-in/sign-up with Clerk, supporting role-based access control.

📦 Image Optimization – Upload and serve cover images via ImageKit.io CDN.

⚡ Efficient Data Fetching – Integrated TanStack Query for performance and caching.

🌐 SEO-Friendly Routing – Clean URLs and custom rewrites using Vercel.

📱 Responsive UI – Built with React Router, Tailwind CSS, and ReactQuill for rich editing.

🧰 Tech Stack
Frontend
React.js

React Router

Tailwind CSS

ReactQuill

TanStack Query

Clerk Authentication

Vite

Backend
Node.js

Express.js

MongoDB (Mongoose)

RESTful APIs

Cron Jobs (for scheduled publishing)

ImageKit.io – Image CDN

Vercel – Frontend deployment

Vercel – Backend deployment (choose your platform)

📦 Installation
Prerequisites
Node.js ≥ 18

MongoDB instance (local or cloud like MongoDB Atlas)

Clerk account

ImageKit.io account

Setup
bash
Copy
Edit
# Clone the repo
git clone https://github.com/your-username/blog-platform.git
cd blog-platform

# Install frontend and backend dependencies
cd frontend && npm install
cd ../backend && npm install

# Set environment variables
cp .env.example .env
# Fill in MongoDB URI, Clerk keys, ImageKit keys, etc.

# Start the servers
# Backend
cd backend && npm run dev

# Frontend
cd ../frontend && npm run dev
🛠️ Deployment
Frontend: Deploy via Vercel

Backend: Deploy on Render, Railway, or AWS EC2

Images: Serve via ImageKit.io

📸 Screenshots
Add UI screenshots of homepage, post editor, admin dashboard, comments section, etc.

