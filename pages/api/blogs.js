import connectDb from "../../utils/connectDb";
import Blog from "./../../models/Blog";
connectDb();

export default async (req, res) => {
  const blogs = await Blog.find({ status: "published" }).sort({
    createdDate: -1,
  });
  res.status(200).json(blogs);
};
