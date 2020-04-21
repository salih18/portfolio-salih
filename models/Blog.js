import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  title: { type: String, required: true, maxlength: 96 },
  subTitle: { type: String, required: true },
  story: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  status: { type: String, default: "draft" },
  author: { type: String, required: true },
}); 

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
