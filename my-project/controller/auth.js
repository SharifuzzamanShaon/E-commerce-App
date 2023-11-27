const User = require("../model/User")
const bcrypt = require('bcrypt');
const error = require("../utils/error")
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const signUp = async (req, res, next) => {
    const { username, email, password } = req.body
    try {
        const isExists = await User.findOne({ "email": email });
        if (isExists) {
            return res.status(409).send({ message: "user already exists" })
        }
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, email, password: hash })
        const userInfo = await newUser.save();
        return res.status(201).send({ messgae: "Signup successfully", success: true, userInfo });
    } catch (err) {
        res.status(500).send({ message: "server error" })
    }
}
const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ "email": email })
        if (!user) throw error("user not found", 204)
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw error("Password not match", 401)
        console.log(user);
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        console.log("payload", payload);
        const token = jwt.sign(payload, "privateKey", { expiresIn: "4h" });

        return res.status(200).send({ message: "Signin success", success: true, userInfo: user, token })
    } catch (err) {
        next(err)
    }
}

const googleAuth = async (req, res, next) => {
    const { name, email, photoURL } = req.body
    try {
        const user = await User.findOne({ 'email': email })
        if (user) {
            const payload = {
                id: user._id,
                username: user.username,
                email: user.email
            }
            console.log("payload", payload);
            const token = await jwt.sign(payload, "privateKey", { expiresIn: "4h" });
            return res.status(200).send({ message: "Signin success", success: true, userInfo: user, token })

        } else {
            const generatePass = Math.random().toString(36).slice(-8);
            const username = name.split(" ").join("").toLowerCase() + Math.random().toString(10).slice(-2);
            const newUser = new User({ username, email, password: generatePass, avatar: photoURL })
            const userInfo = await newUser.save();
            const payload = {
                id: userInfo._id,
                username: userInfo.username,
                email: userInfo.email
            }
            const token =await jwt.sign(payload, "privateKey", { expiresIn: "4h" });
            return res.status(201).send({ messgae: "Signup successfully", success: true, userInfo, token });
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    signUp,
    signIn,
    googleAuth
}