import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import axios from "axios";
import Upload from "../components/Upload.jsx";
import Loading from "../components/Loading.jsx";
import { toast } from "react-toastify";
import "react-quill-new/dist/quill.snow.css";

const Write = () => {
  const { slug } = useParams();
  const isEditMode = Boolean(slug);

  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);

  const [schedule, setSchedule] = useState(false);
  const [publishAt, setPublishAt] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });

  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const [postId, setPostId] = useState(null);
  const [loadingPost, setLoadingPost] = useState(isEditMode);

  // Prefill from existing post
  useEffect(() => {
    if (!isEditMode) {
      setPostId(null);
      setCover("");
      setValue("");
      setImg("");
      setVideo("");
      setProgress(0);
      setSchedule(false);
      setPublishAt(new Date().toISOString().slice(0, 16));
  
      // Clear native inputs
      setTimeout(() => {
        const title = document.querySelector('input[name="title"]');
        const desc = document.querySelector('textarea[name="desc"]');
        const category = document.querySelector('select[name="category"]');
        if (title) title.value = "";
        if (desc) desc.value = "";
        if (category) category.value = "general";
      }, 0);
    }
    if (isEditMode) {
      setLoadingPost(true);
  
      // Fetch the post using GET
      axios
        .get(`${import.meta.env.VITE_API_URL}/posts/${slug}`) // Use `slug` to fetch the post
        .then((res) => {
          const post = res.data;
  
          // Prefill the form fields
          setPostId(post._id);
          setCover({ filePath: post.img });
          setValue(post.content);
          setPublishAt(new Date(post.publishAt).toISOString().slice(0, 16));
          setSchedule(post.status === "scheduled");
  
          // Populate native inputs
          setTimeout(() => {
            document.querySelector('input[name="title"]').value = post.title;
            document.querySelector('textarea[name="desc"]').value = post.desc;
            document.querySelector('select[name="category"]').value = post.category;
          }, 0);
        })
        .catch(() => {
          toast.error("Failed to load post for editing");
          navigate("/");
        })
        .finally(() => setLoadingPost(false));
    }
  }, [isEditMode, slug]);

  useEffect(() => {
    img &&
      setValue((prev) => `${prev}<p><img src="${img.url}" alt="Image"/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => `${prev}<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (postData) => {
      const token = await getToken();
      if (isEditMode && postId) {
        return axios.patch(
          `${import.meta.env.VITE_API_URL}/posts/${postId}`,
          postData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        return axios.post(`${import.meta.env.VITE_API_URL}/posts`, postData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    },
    onSuccess: (res) => {
      toast.success(isEditMode ? "Post updated!" : "Post created!");
      navigate(`/${res.data.slug}`);
    },
    onError: () => {
      toast.error(isEditMode ? "Failed to update post" : "Failed to create post");
    },
  });

  const validateDate = (value) => {
    const selected = new Date(value);
    const now = new Date();
    return selected >= now;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const isFutureDateValid = !schedule || validateDate(publishAt);
    setIsInvalidDate(!isFutureDateValid);

    if (!isFutureDateValid) return;

    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    if (schedule) {
      data.publishAt = publishAt;
    }

    if (!data.title || !data.category || !data.desc || !data.content) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    mutation.mutate(data);
  };

  if (!isLoaded || loadingPost) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center gap-4 mt-12">
        <img
          alt="login-img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        />
        <Link to="/login">
          <button className="bg-blue-800 py-2 px-4 rounded-3xl text-white">
            Please Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {isEditMode ? "Edit Your Post" : "Create a New Post"}
        </h1>
        <p className="text-gray-500 text-lg">
          {isEditMode
            ? "Update your existing post."
            : "Share your ideas, stories, or tutorials with the world."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button
            type="button"
            className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white hover:bg-gray-100 transition"
          >
            {cover?.filePath ? "Change Cover Image" : "Add a Cover Image"}
          </button>
          {cover?.filePath && (
            <span className="text-sm px-2 text-gray-500 font-medium">
              Cover image selected
            </span>
          )}
        </Upload>

        <input
          className="text-4xl font-semibold bg-transparent outline-none border-b border-gray-300 focus:border-blue-500 transition"
          type="text"
          placeholder="My Awesome Story"
          name="title"
        />

        <div className="flex items-center gap-4">
          <label htmlFor="category" className="text-sm font-medium text-gray-600">
            Choose a category:
          </label>
          <select
            name="category"
            id="category"
            className="p-2 rounded-xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        <textarea
          className="p-4 rounded-xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="desc"
          placeholder="A Short Description"
        />

        <div className="flex flex-1 flex-col lg:flex-row gap-2">
          <div className="flex flex-col">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              🌆
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              ▶️
            </Upload>
          </div>
          <ReactQuill
            theme="snow"
            className="flex-1 min-h-[300px] rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
            readOnly={progress > 0 && progress < 100}
          />
        </div>

        {/* Scheduling */}
        <div className="flex items-center gap-4">
          <input
            id="schedule"
            type="checkbox"
            checked={schedule}
            onChange={() => setSchedule(!schedule)}
          />
          <label htmlFor="schedule" className="text-sm text-gray-700">
            Schedule this post?
          </label>
        </div>

        {schedule && (
          <div className="flex flex-col gap-1">
            <label htmlFor="publishAt" className="text-sm font-medium text-gray-700">
              Choose publish date and time:
            </label>
            <input
              type="datetime-local"
              id="publishAt"
              name="publishAt"
              value={publishAt}
              min={new Date().toISOString().slice(0, 16)}
              onChange={(e) => {
                setPublishAt(e.target.value);
                setIsInvalidDate(!validateDate(e.target.value));
              }}
              className={`p-2 rounded-xl shadow-md bg-white focus:outline-none focus:ring-2 ${
                isInvalidDate ? "ring-red-400 border border-red-400" : "focus:ring-blue-400"
              }`}
            />
            {isInvalidDate && (
              <p className="text-sm text-red-500">Please pick a future date and time.</p>
            )}
          </div>
        )}

        <button
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 hover:bg-blue-900 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : isEditMode ? "Update" : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default Write;
