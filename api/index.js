const app = require("./app")
const bodyParser = require('body-parser')
const useRouter = require("./router/user");
const { connectDB } = require("./DB/ConnectDB");
const router = require("./router");
const cors = require('cors');
const path = require('path');
const express = require('express');
const authMiddleware = require("./middleware/authenticate/authMiddleware");
app.use(cors())

app.use(cors({
    origin: "*",
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({ message: "welcome" })
})

app.post("/token",authMiddleware, (req, res)=>{
    console.log("user is", req.user);
})

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")))

app.use(express.static(path.join(__dirname, 'public')));

app.get("/show", (req, res)=>{
    const data = {
        name: "Json Roy"
    }
    res.render("mail/welcome", data)
})

app.use("/api", useRouter)

app.use("/api/v1", router)




app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({ success: false, statusCode, message: message })
})

const port = 5000
app.listen(port, async () => {
    console.log("server Running at http://localhost:5000");
    await connectDB();
    console.log("DB connected");
})