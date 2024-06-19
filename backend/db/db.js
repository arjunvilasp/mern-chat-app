import { mongoose } from "mongoose";


const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongoDB.");
    }
    catch(err){
        console.log(`Error connecting to mongoDB:${err.message}`);
    }
}

export default connect;