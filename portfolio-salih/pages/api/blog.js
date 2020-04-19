import Blog from "../../models/Blog";
import connectDb from "../../utils/connectDb";
import auth0 from "./../../services/auth0";

const NAMESPACE = "http://localhost:3000";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

async function handleGetRequest(req, res) {
  const { _id } = req.query;
  const blog = await Blog.findOne({ _id });
  res.status(200).json(blog);
}

async function handlePostRequest(req, res) {
  try {
    if (!("authorization" in req.headers)) {
      return res.status(401).send("No authorization token");
    }
    const user = await auth0.verifyToken(req.headers.authorization);
    const userRole = user && user[`${NAMESPACE}/role`];
    if (userRole !== "siteOwner") {
      return res.send("You are not allowed to view this page");
    }

    const { _id, title, subTitle, story } = req.body;
    console.log({ _id });   
    console.log({ title });
    console.log({ subTitle });
    console.log({ story });
    if (!title || !subTitle || !story) {
      return res.status(422).send("Blog missing one or more fields");
    }

    const blogFields = {
      userId: user.sub,
      author: user.name,
      title,
      subTitle,
      story,
    };

    let blog = await Blog.findOne({ _id });
    console.log({ blog });
    if (blog) {
      blogFields.updatedAt = new Date()
      blog = await Blog.findOneAndUpdate(
        { _id },
        { $set: blogFields },
        { upsert: true, omitUndefined: true, new: true }
      );
      return res.json(blog);
    }

    blog = await new Blog(blogFields);
    console.log({ blog });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in creating or updating blog");
  }
}

async function handleDeleteRequest(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const user = await auth0.verifyToken(req.headers.authorization);
    const userRole = user && user[`${NAMESPACE}/role`];
    if (userRole !== "siteOwner") {
      return res.send("You are not allowed to view this page");
    }
    const { _id } = req.query;
    await Blog.findOneAndDelete({ _id });
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting blog");
  }
}
