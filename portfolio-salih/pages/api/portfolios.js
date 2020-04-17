import connectDb from "../../utils/connectDb";
import Portfolio from "./../../models/Portfolio";
connectDb();

export default async (req, res) => {
  const portfolios = await Portfolio.find();

  res.status(200).json(portfolios);
};
