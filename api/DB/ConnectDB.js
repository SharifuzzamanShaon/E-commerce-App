const { default: mongoose } = require("mongoose");

exports.connectDB = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/hotelManagement');

}