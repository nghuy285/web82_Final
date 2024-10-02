import mongoose from "mongoose";
const seatSchema = new mongoose.Schema({
  number: String,
  isBooked: {
    type: Boolean,
    default: false,
  },
});
const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    unique: true,
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movie",
    },
  ],
  seats: [seatSchema],
});

const TheaterModel = mongoose.model("Theater", theaterSchema);

export default TheaterModel;
