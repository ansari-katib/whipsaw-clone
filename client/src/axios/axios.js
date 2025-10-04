import axios from 'axios';


export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api"

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});


export const _routes = {
    user: {
        login: `/user/login`,
    },
    blogs: {
        createBlog_post: `/blog/post-blog`,

        getSingleBlog_get: (id) => `/blog/${id}`,    // get blog by id
        getAllBlogs_get: `/blog`,
        deleteBlog_delete: (id) => `/blog/${id}`,     // delete by id
        bulkDeleteBlog_delete: `/blog/bulk-delete`,
    }
} 