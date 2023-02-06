import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import Blog from "../Models/BlogModel.js";

const blogROuter = express.Router()

// Get Blog
blogROuter.get(
    "/",
    asyncHandler(async (req, res) => {
        const blog = await Blog.find({})
        res.json(blog)
    }
    )
)

export default blogROuter;
