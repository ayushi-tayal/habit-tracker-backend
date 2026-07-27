const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

function createToken(userId) {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    })
}

async function register(req, res) {
    try {
        const {username, email, password, phone} = req.body;

        if(!username || !email || !password || !phone) {
            return res.status(400).json({message: 'All fields are required.'});
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(409).json({message: 'User with this email already exists.'});
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            phone,
            email,
            passwordHash
        });

        const token = createToken(newUser._id);
        return res.status(200).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                phone: newUser.phone 
            }
        });
    }
    catch(error) {
        console.log('Something went wrong, try again later', error);
        return res.status(500).json({message: `Something went wrong, try again later: ${error.message}`})
    }
}

async function login(req, res) {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: 'All fields are required.'});
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid Credentials'})
        }

        const token = createToken(user._id);
        return res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone 
            }
        });
    }
    catch(error) {
        console.log('Something went wrong, try again later', error);
        return res.status(500).json({message: `Something went wrong, try again later: ${error.message}`})
    }
}
async function resetPassword(req, res) {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: 'All fields are required.'});
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.findOneAndUpdate({email}, 
            {passwordHash: passwordHash}, 
            {returnDocument: 'after'}
        );
        if(!user) {
            return res.status(401).json({message: 'Unable to find user with this email.'});
        }

        const token = createToken(user._id);
        return res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone 
            }
        });
    }
    catch(error) {
        console.log('Something went wrong, try again later', error);
        return res.status(500).json({message: `Something went wrong, try again later: ${error.message}`})
    }
}

async function me(req, res) {
    try {
        const user = await User.findById(req.userId).select('-passwordHash');
        if(!user) {
            return res.status(404).json({message: 'User not found.'});
        }

        // const user = await User.findOne({email});
        // if(!user) {
        //     return res.status(401).json({message: 'Invalid Credentials'});
        // }

        // const isMatch = await bcrypt.compare(password, user.passwordHash);
        // if(!isMatch) {
        //     return res.status(401).json({message: 'Invalid Credentials'})
        // }

        // const createToken = createToken(newUser._id);

        return res.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone 
            }
        });
    }
    catch(error) {
        console.log('Something went wrong, try again later', error);
        return res.status(500).json({message: `Something went wrong, try again later: ${error.message}`})
    }
}

module.exports = { login, register, me, resetPassword}