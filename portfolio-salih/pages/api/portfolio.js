import Portfolio from "../../models/Portfolio";
import connectDb from "../../utils/connectDb";
import auth0 from "./../../services/auth0";

const NAMESPACE = process.env.NAMESPACE;

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
  const portfolio = await Portfolio.findOne({ _id }).select("-__v");
  res.status(200).json(portfolio);
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

    const {
      _id,
      title,
      company,
      location,
      position,
      description,
      startDate,
      endDate,
    } = req.body;

    if (
      (!title || !company || !location || !position, !description, !startDate)
    ) {
      return res.status(422).send("Portfolio missing one or more fields");
    }

    const portfolioFields = {
      userId: user.sub,
      title,
      company,
      location,
      position,
      description,
      startDate,
      endDate,
    };

    let portfolio = await Portfolio.findOne({ _id });

    if (portfolio) {
      portfolio = await Portfolio.findOneAndUpdate(
        { _id },
        { $set: portfolioFields },
        { upsert: true, omitUndefined: true, new: true }
      );
      return res.json(portfolio);
    }

    portfolio = await new Portfolio(portfolioFields);
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in creating or updating portfolio");
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
    await Portfolio.findOneAndDelete({ _id });
    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting portfolio");
  }
}
