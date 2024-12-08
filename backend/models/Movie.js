const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true
    },
    imdbID: {
        type: String,
        required: true,
        unique: true
    },
    Poster: { // Field to store the movie poster URL
        type: String,
        // default: "/placeholder.png" // Optional default value
    }

});

module.exports = mongoose.model('Movie', MovieSchema);
