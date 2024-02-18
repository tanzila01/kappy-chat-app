const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")
const socket = require("socket.io")

const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB conn success")
}).catch((err) => {
    console.log("err", err)
})

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on PORT ${process.env.PORT}`)

const io = socket(server, {
    cors:{
        origin: "http://localhost:3000",
        Credentials: true,
    }
})

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('io socket message', msg);
    });;
});

}) 