const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        console.log(user);
        res.status(201).json({ message: 'User created successfully' });
        
        // res.redirect('/auth/login');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Logged in successfully'  , token});
        // res.redirect('/movies/home');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

exports.logout = (req, res) => {
 // The token is sent as a bearer token in the Authorization header
 const token = req.header('Authorization')?.replace('Bearer ', '');

 if (!token) {
     return res.status(400).json({ message: 'No token provided' });  // Ensure there's a token
 }

 // No need to clear cookies because you're not storing it in cookies
 // You can do any additional logic, like invalidating the token, if necessary

 // If necessary, you could implement a server-side invalidation for tokens (like using a blacklist or token expiration)
 // For simplicity, we're just logging out by ending the session here
 res.status(200).json({ message: 'Logged out successfully' });  // Success response
  
};
