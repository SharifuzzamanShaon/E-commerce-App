const jwt = require("jsonwebtoken");
const User = require("../../model/User");

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) return res.status(400).send({ message: 'unauthorized' })
        token = token.split(" ")[1]
        const decode = jwt.verify(token, "privateKey");
        const validUser = await User.findById(decode.id);
        const userInfo={
            _id: validUser._id,
            username: validUser.username,
            email: validUser.email,
            avatar: validUser.avatar
        }
        if (!validUser) return res.status(400).send({ message: 'unauthorized user' })
        req.user = userInfo;
        next()
    } catch (err) {
        next(err)
    }

}

module.exports = authMiddleware