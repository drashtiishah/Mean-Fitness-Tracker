const config = require("../config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const cookieOptions = {
    domain: "localhost",
    maxAge: 24 * 60 * 60 * 1000,
    // httpOnly: true,
    sameSite: "none",
    secure: true
}

/**
 *  @description Create User
 *  @method POST
 */
const register = async (req, res) => {
    console.log("req.body---", req.body);
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    const existedUser = await User.findOne({ email: req.body.email })

    if (existedUser) {
        return res.status(409).json({ message: "User with email already exists" });
    }
    
    try {
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Auto-gen a salt and hash:
        //const hashPassword = await bcrypt.hash(req.body.password, 10);

        // Create an user object
        let user = new User({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        })

        // Save User in the database
        const registeredUser = await user.save();

        res.status(201).json({ message: 'User registered successfully'});

    }
    catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
}

/**
 *  @description Login User
 *  @method POST
 */
const login = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed--Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed--Invalid email or password' });
        }

        // Create and assign token
        let payload = { _id: user._id, email: user.email };
        const token = jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: '1d' });

        res.status(200)
            .cookie("access_token", token, cookieOptions)
            .send({ message: 'User Logged In successfully', user });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }

}

/**
 *  @description Logout User
 *  @method DELETE
 */
const logout = (req, res) => {
    return res
        .status(200)
        .clearCookie("access_token", cookieOptions)
        .json({ message: 'User logged Out'})
}

module.exports = {
    register,
    login,
    logout
}