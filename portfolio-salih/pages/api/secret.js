import jwt from "jsonwebtoken";
import auth0 from "./../../services/auth0";

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
    const check = await auth0.verifyToken(req.headers.authorization);
    console.log({ check });
  } catch (error) {
    res.status(403).send("Invalid token");
  }
  return res.json(secretData);
};
