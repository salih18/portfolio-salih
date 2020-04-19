import connectDb from "../../utils/connectDb";
import Blog from "./../../models/Blog";
import auth0 from "./../../services/auth0";

const NAMESPACE = "http://localhost:3000";

connectDb();

export default async (req, res) => {
  console.log(
    "userblogs request taken---------------------------------------------------------------------------------------------"
  );
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const user = await auth0.verifyToken(req.headers.authorization);
    const userRole = user && user[`${NAMESPACE}/role`];
    if (userRole !== "siteOwner") {
      return res.status(422).send("You are not allowed to view this page");
    }
    const userBlogs = await Blog.find({ userId: user.sub }).sort({
      startDate: 1,
    });
    res.status(200).json(userBlogs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
