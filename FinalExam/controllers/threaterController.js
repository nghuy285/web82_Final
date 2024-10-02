import TheaterModel from "../models/ThreaterModel.js";

export const createTheater = async (req, res) => {
  const { name, location, rows, seatsPerRow, movies } = req.body;
  const seatList = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < rows; i++) {
    const rowLetter = alphabet[i];
    for (let j = 1; j <= seatsPerRow; j++) {
      seatList.push({ number: `${rowLetter}${j}`, isBooked: false });
    }
  }

  try {
    const theater = new TheaterModel({
      name,
      location,
      seats: seatList,
      movies: movies,
    });

    const savedTheater = await theater.save();
    res.status(201).json(savedTheater);
  } catch (error) {
    res.status(500).json({ message: "Error adding theater", error });
  }
};

export const getTheaters = async (req, res) => {
  try {
    const theaters = await TheaterModel.find();
    res.status(200).json(theaters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching theaters", error });
  }
};

export const getTheaterById = async (req, res) => {
  try {
    const theater = await TheaterModel.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.status(200).json(theater);
  } catch (error) {
    res.status(500).json({ message: "Error fetching theater", error });
  }
};

export const bookSeat = async (req, res) => {
  const { theaterId, seatNumbers } = req.body;

  try {
    const theater = await TheaterModel.findById(theaterId);

    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    seatNumbers.forEach((seatNumber) => {
      const seat = theater.seats.find((s) => s.number === seatNumber);
      if (seat && !seat.isBooked) {
        seat.isBooked = true;
      }
    });

    await theater.save();

    res.status(200).json({ message: "Seats booked successfully!" });
  } catch (error) {
    console.error("Error booking seats:", error);
    res.status(500).json({ message: "Error booking seats" });
  }
};

export const findTheatersByMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const theaters = await TheaterModel.find({ movies: movieId }).populate(
      "movies"
    );

    if (theaters.length === 0) {
      return res
        .status(404)
        .json({ message: "No theaters found for this movie" });
    }

    res.status(200).json(theaters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching theaters", error });
  }
};
export const updateTheater = async (req, res) => {
  const { id } = req.params;
  const { name, location, rows, seatsPerRow, movies } = req.body;

  try {
    const theater = await TheaterModel.findById(id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    theater.name = name || theater.name;
    theater.location = location || theater.location;

    if (rows && seatsPerRow) {
      const seatList = [];
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < rows; i++) {
        const rowLetter = alphabet[i];
        for (let j = 1; j <= seatsPerRow; j++) {
          seatList.push({ number: `${rowLetter}${j}`, isBooked: false });
        }
      }
      theater.seats = seatList;
    }
    if (movies && movies.length > 0) {
      theater.movies = movies;
    }

    const updatedTheater = await theater.save();
    res.status(200).json(updatedTheater);
  } catch (error) {
    res.status(500).json({ message: "Error updating theater", error });
  }
};

export const deleteTheater = async (req, res) => {
  const { id } = req.params;

  try {
    const theater = await TheaterModel.findByIdAndDelete(id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.status(200).json({ message: "Theater deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting theater", error });
  }
};

export const addMovieToTheater = async (req, res) => {
  const { theaterId } = req.params;
  const { movieId } = req.body;

  try {
    const theater = await TheaterModel.findById(theaterId);

    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    if (theater.movies.includes(movieId)) {
      return res
        .status(400)
        .json({ message: "Movie is already added to this theater" });
    }

    theater.movies.push(movieId);
    await theater.save();

    res
      .status(200)
      .json({ message: "Movie added to theater successfully", theater });
  } catch (error) {
    res.status(500).json({ message: "Error adding movie to theater", error });
  }
};
