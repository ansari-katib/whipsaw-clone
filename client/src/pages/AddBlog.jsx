import React, { useState } from "react";
import { axiosInstance, _routes } from "@/axios/axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import { Loader } from "lucide-react";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.content) {
      toast.error("Title and content are required.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("content", formData.content);
      if (image) data.append("image", image);

      const response = await axiosInstance.post(
        _routes.blogs.createBlog_post,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Blog posted successfully!");
      setFormData({ title: "", author: "", content: "" });
      setImage(null);
      console.log("Created blog:", response.data);
    } catch (err) {
      console.error("Error posting blog:", err);
      toast.error(err.response?.data?.message || "Failed to post blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-40 mb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>
        <Link to={"/admin"}>
          <span className="text-lg bg-black text-white py-4 px-4 rounded-full hover:bg-neutral-700">
            Go to Admin table
          </span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter author name (optional)"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your blog content here"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? <Loader className="size-5"/> : "Post Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
