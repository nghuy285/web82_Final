import MovieModel from "../models/movieModel.js";
import cloudinary from '../utils/cloudinary.js';
import upload from "../utils/multer.js";
const movieControllers = {
    addMovie: async (req, res) => {
    const movie = new MovieModel(req.body);
        try {
            await movie.save();
            res.status(201).json(movie);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    },
    getMovies: async (req, res) => {
        try {
            const movies = await MovieModel.find();
            res.status(200).json(movies);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    updateMovie:async (req, res) => {
        const { id } = req.params;
        const { name, time, year, introduce } = req.body;
    
        try {
            const movie = await MovieModel.findById(id);
            if (!movie) return res.status(404).json({ message: "Movie not found" });
            if (name) movie.name = name;
            if (time) movie.time = time;
            if (year) movie.year = year;
            if (introduce) movie.introduce = introduce;     
            if (req.file) {              
                const result = await cloudinary.v2.uploader.upload(req.file.path);
                movie.image = result.secure_url;
            }
            await movie.save();
    
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteMovie: async (req, res) => {
        const { id } = req.params;
        try {
            await MovieModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Movie deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    searchMovie: async (req, res) => {
        const { name } = req.query;
        try {
            const movies = await MovieModel.find({ name: { $regex: name, $options: 'i' } });
            res.status(200).json(movies);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    sortedByYear: async (req, res) => {
        const { order } = req.query;
        const sortOrder = order === 'asc' ? 1 : -1;
        try {
            const movies = await MovieModel.find().sort({ year: sortOrder });
            res.status(200).json(movies);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

export {
    movieControllers
}
