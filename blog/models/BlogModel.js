import mongoose from "mongoose";
const BlogSchema = mongoose.Schema(
    {
      title: {
        type: String,
      },
      article: {
        type: String,
      },
      image: {
        type: String,
      },
      author: {
        type: String,
      },
      view : {
        type : Number,
      }
    },
    {
      timestamps: true,
    }
  );
  const Blog = mongoose.model("Blog", BlogSchema);

  export default Blog;
