import express from "express";
import Blog from "./models/BlogModel.js";
import asyncHandler from "express-async-handler";
import blog from "./data/blog.js";


const ImportData = express.Router();

ImportData.post(
  "/blog",
  asyncHandler(async (req, res) => {
    const importUser = await Blog.insertMany(blog);
    res.send({ importUser });
  })
);


export default ImportData;
