import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    ID: {
        type: String,
        require: true,
        unique:true
    },
    name: {
        type: String,
        require: true,
    },
    time: {
        type: Number,
        require: true,    
    },
    year: {
        type: Number,
        require: true, 
    },
    image: {
        type: String,
        require: true,
    },
    introduce: {
        type: String,
        require: true,
    }
})
const MovieModel = new mongoose.model('movie',movieSchema);

export default MovieModel;