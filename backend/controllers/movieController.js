
const axios = require('axios');
const MovieList = require('../models/MovieList');

exports.searchMovies = async (req, res) => {
    const { title } = req.query;
    const userId = req.user.id;

    if (!title) {
        return res.render('movies/search', { movies: [], lists: [] });
    }

    try {
        // Fetch the current user's lists (both public and private)
        const userLists = await MovieList.find({ user: userId });

        // Fetch public lists created by other users
        const publicLists = await MovieList.find({ user: { $ne: userId }, isPublic: true });

        // Combine both lists
        const lists = [...userLists, ...publicLists];

        const response = await axios.get(`http://www.omdbapi.com/?s=${title}&apikey=${process.env.OMDB_API_KEY}`);
        const data = response.data;
        if (data.Response === 'False') {
            return res.json({ movies: [], lists });

            // return res.render('movies/search', { movies: [], lists });
        }
        // res.render('movies/search', { movies: data.Search, lists });
        res.json({ movies: data.Search, lists });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

