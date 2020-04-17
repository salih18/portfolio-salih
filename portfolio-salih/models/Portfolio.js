import mongoose from "mongoose";

const { String, Date } = mongoose.Schema.Types;

const setStringType = (maxLength) => ({
  type: String,
  required: true,
  maxlength: maxLength,
});

const portfolioSchema = new mongoose.Schema({
  userId: setStringType(512),
  title: setStringType(256),
  company: setStringType(256),
  location: setStringType(128),
  position: setStringType(256),
  description: setStringType(2048),
  startDate: { type: Date, required: true },
  endDate: Date,
});

export default mongoose.models.Portfolio ||
  mongoose.model("Portfolio", portfolioSchema);

 
