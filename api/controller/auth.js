const User = require("../model/User")
const bcrypt = require('bcrypt');
const { error } = require("../utils/error")
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const sendEmail = require("../utils/sendEmail")
const ejs = require('ejs');
const path = require('path');
require("dotenv").config()
const signUp = async (req, res, next) => {
    const { username, email, password } = req.body
    try {
        const isExists = await User.findOne({ "email": email });
        if (isExists) {
            return res.status(409).send({ message: "user already exists" });
        }
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, email, password: hash });
        const userInfo = await newUser.save();
        return res.status(201).send({ messgae: "Signup successfully", success: true, userInfo });
    } catch (err) {
        res.status(500).send({ message: "server error" });
    }
}
const verifyAccount = async (req, res, next) => {
    try {
        const { email } = req.body
        if (!email) throw error("invalid credentials", 401)
        const userExist = await User.findOne({ email: email });
        if (userExist.isVerified === true) return res.status(200).send({ message: 'alread verified' });
        console.log(userExist);
        const payload = {
            email: email
        }
        const token = jwt.sign(payload, "privateKeyVerifyAcc", { expiresIn: "1h" });
        const url = `${process.env.CLIENT_URL}/confirm-verification?email=${userExist.email}&token=${token}`;

        await User.findOneAndUpdate({ email: email }, { verificationToken: token });
        const data = {
            name: `${userExist.username}`,
            url: url,
        }
        const filePath = path.join(__dirname, '../views/mail/verifyEmail.ejs');
        await ejs.renderFile(filePath, data, (err, str) => {
            if (err) {
                return res.status(500).send('Error rendering template');
            }
            sendEmail(`${userExist.email}`, "Verify your Email", str)
        })
        return res.status(200).send({ message: 'mail has sent to verify account' })
    } catch (error) {
        next(error)
    }
}
const confirmVerification = async (req, res, next) => {
    try {
        const email = req.query.email
        const token = req.query.token
        if (!email || !token) throw error("invalid credentials", 401)
        const validUser = await User.findOne({ email: email })
        if (!validUser) throw error("user not found", 204)
        if (validUser.verificationToken != token) throw error("invalid token, try again", 401)
        await User.findOneAndUpdate({ email: validUser.email }, { isVerified: true })
        return res.status(200).send({ messgae: "Account verification success" })

    } catch (error) {
        next(error)
    }
}
const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ "email": email })
        if (!user) throw error("user not found", 204)
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw error("Password not match", 401)
        const userInfo = {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        }
        console.log(user);
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
        console.log("payload", payload);
        const token = jwt.sign(payload, "privateKey", { expiresIn: "4h" });

        return res.status(200).send({ message: "Signin success", success: true, userInfo: userInfo, token })
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
            const token = await jwt.sign(payload, "privateKey", { expiresIn: "4h" });
            return res.status(201).send({ messgae: "Signup successfully", success: true, userInfo, token });
        }
    } catch (err) {
        next(err)
    }
}

const foregtPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        let userExist = await User.findOne({ 'email': email })
        if (!userExist) throw error("user not found", 204)
        const payload = {
            username: userExist.username,
            email: userExist.email
        }
        const token = jwt.sign(payload, "privateKeyResetPass", { expiresIn: "1h" });
        const url = `${process.env.CLIENT_URL}/reset-password?email=${payload.email}&token=${token}`;
        const data = {
            name: `${userExist.username}`,
            url: url,
        }
        await User.findOneAndUpdate({ email: email }, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 10 * 60 * 1000 })
        const filePath = path.join(__dirname, '../views/mail/resetPassword.ejs');
        await ejs.renderFile(filePath, data, (err, str) => {
            if (err) {
                return res.status(500).send('Error rendering template');
            }
            // return res.send(str)
            sendEmail(`${userExist.email}`, "Testing mail", str)
        })
        return res.status(200).send({ message: 'sent mail for reset new password' })

    } catch (error) {
        next(error);

    }
}
const resetPassword = async (req, res, next) => {
    try {
        let queryString = req.url.split('?')[1];

        // Replace any occurrence of &amp; with &
        if (queryString) {
            const email = req.query.email
            const token = req.query.token
            console.log(email, token);

            if (!email || !token) throw error("invalid credentials", 401)
            const validUser = await User.findOne({ email: email })
            if (!validUser) throw error("user not found", 204)
            const validTimeToReset = new Date() < new Date(validUser.resetPasswordExpires)
            if (!validTimeToReset) throw error("token expired, try again", 401)
            if (validUser.resetPasswordToken != token) throw error("invalid token, try again", 401)
            const { newPassword } = req.body
            console.log(newPassword);
            const hash = await bcrypt.hash(newPassword, saltRounds);
            await User.findOneAndUpdate({ email: validUser.email }, { password: hash })
            return res.status(200).send({ messgae: "passward reset success" })
        }
    } catch (error) {
        next(error)
    }
}
module.exports = {
    signUp,
    signIn,
    verifyAccount,
    confirmVerification,
    googleAuth,
    foregtPassword,
    resetPassword
}