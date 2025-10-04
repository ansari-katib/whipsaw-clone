import express from 'express';
import bulkDeleteBlog, { postBlog, getAllBlogs, getSingleBlog, deleteBlog } from '../controller/blogController.js'
import { upload } from '../middleware/upload.js';

const blogRoute = express.Router();

blogRoute.post("/post-blog", upload.single("image"), postBlog);

blogRoute.get("/", getAllBlogs);
blogRoute.get("/:id", getSingleBlog);

blogRoute.delete("/bulk-delete", bulkDeleteBlog);
blogRoute.delete("/:id", deleteBlog);


export default blogRoute;