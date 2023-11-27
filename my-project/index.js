const app = require("./app")
const bodyParser = require('body-parser')
const useRouter = require("./router/user");
const { connectDB } = require("./DB/ConnectDB");
const router = require("./router");
const cors = require('cors');
const authMiddleware = require("./middleware/auth/authMiddleware");
app.use(cors())

app.use(cors({
    origin: "*",
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.status(200).json({ message: "welcome" })
})

app.post("/token",authMiddleware, (req, res)=>{
    console.log("user is", req.user);
})

app.use("/api", useRouter)

app.use("/api/v1", router)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({ success: false, statusCode, message: message })
})

const port = 4002
app.listen(port, async () => {
    console.log("server Running at http://localhost:4002");
    await connectDB();
    console.log("DB connected");
})