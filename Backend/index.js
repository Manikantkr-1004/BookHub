const express = require("express");
const cors = require("cors");
const {connection} = require('./db');
const { userRouter } = require("./Routes/userRoutes");
const { authorRouter } = require("./Routes/authorRoutes");
const { bookRouter } = require("./Routes/bookRoutes");
const { reviewsRouter } = require("./Routes/reviewsRoutes");
const { discussionRouter } = require("./Routes/discussionRoutes");
const PORT = process.env.PORT || 7700;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/author',authorRouter);
app.use('/api/book',bookRouter);
app.use('/api/review',reviewsRouter);
app.use('/api/discussion', discussionRouter);

app.get("/",(req,res)=>{
    res.send("Hi, You are on BookHub API")
})

app.listen(PORT,async()=>{
    try {
        await connection;
        console.log('Server is connected with mongoAtlas');
        console.log(`Server is running on PORT ${PORT}.`);
    } catch (error) {
        console.log(error)
    }
})