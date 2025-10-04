import Blog from '../model/Blog.js'

//  create blog 
export const postBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        // Multer adds the file info to req.file
        const image = req.file ? `/uploads/${req.file.filename}` : undefined;

        const blog = new Blog({
            title,
            content,
            author: author || "Admin",
            image,
        });

        await blog.save();

        res.status(201).json({
            message: "Blog created successfully",
            blog: {
                id: blog._id,
                title: blog.title,
                content: blog.content,
                author: blog.author,
                image: blog.image,
                createdAt: blog.createdAt,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Blogs fetched successfully",
            blogs
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id) {
            return res.status(400).json({ message: "Blog ID is required" });
        }

        // Find blog by ID
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({
            message: "Blog fetched successfully",
            blog
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Blog id is required" });

        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const bulkDeleteBlog = async (req, res) => {
    try {
        const { ids } = req.body; // expecting: { ids: ["id1", "id2", "id3"] }

        if (!ids || ids.length === 0) {
            return res.status(400).json({ success: false, message: "No IDs provided" });
        }

        const result = await Blog.deleteMany({ _id: { $in: ids } });

        return res.status(200).json({
            success: true,
            message: `${result.deletedCount} blog(s) deleted successfully`,
        });
    } catch (error) {
        console.error("Bulk delete error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export default bulkDeleteBlog;