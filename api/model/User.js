const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
        },
        role: {
            type: String,
            enum: ['admin', 'manager', 'user'],
            default: 'user'
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String
        },
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpires: {
            type: Date
        }

    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User