import express from 'express'
import 'dotenv/config'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import userRoutes from './routes/user.route.js'
import db from './db/db.js'
import cookieParser from 'cookie-parser'


const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(cookieParser());


// app.get('/',(req,res)=>{
//     res.send(`Server started on port ${port}`);
// })


app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)
app.use('/api/users',userRoutes)

app.listen(port,()=>{
    db();
    console.log(`Server started on port ${port}`);
})