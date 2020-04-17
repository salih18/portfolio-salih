import jwt from "jsonwebtoken";
import auth0 from "./../../services/auth0";
import connectDb from "../../utils/connectDb";

connectDb();

const NAMESPACE = "http://localhost:3000";

const secretData = [
  {
    title: "Secret Data",
    description: "Plan how to build a spaceship",
  },
  {
    title: "Secret Data 2",
    description: "My secret passwords",
  },
];

export default async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const user = await auth0.verifyToken(req.headers.authorization);
    const userRole = user && user[`${NAMESPACE}/role`];
    if (userRole === "siteOwner") {
      return res.json(secretData);
    } else {
      return res.json([
        { title: "No authorization", description: "Please login" },
      ]);
    }
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};
