const config = require("../config/config");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const verifyUserToken = async (req, res, next) => {
    console.log("req.cookies---", req.cookies);
    const token = req.cookies.access_token;

    if (!token)
        return res.status(403).send("Access Denied / Unauthorized request");

    try {
        const decodedToken = jwt.verify(token, config.TOKEN_SECRET);

        const verifiedUser = await User.findById(decodedToken._id);

        if (!verifiedUser) return res.status(403).send('Invalid Token / Unauthorized request')

        req.user = verifiedUser;
        next();

    } catch (error) {
        return res.status(403).send("Invalid Token");
    }
};

module.exports = verifyUserToken;