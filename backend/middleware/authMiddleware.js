// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.ensureAuth = async (req, res, next) => {
//     // const token = req.cookies.token;
//     const token = req.header('Authorization').replace('Bearer ', '');
//     if (!token) {
//         // return res.redirect('/auth/login');
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.userId).select('-password'); 
//         next();

//     } catch (err) {
//         console.log(err);
//         // res.redirect('/auth/login');
//     }
// };

const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.ensureAuth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header missing or invalid' });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password'); 
        next();
    } catch (err) {
        console.error('Authentication error:', err.message);
        return res.status(401).json({ message: 'Unauthorized access' });
    }
};
