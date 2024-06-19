import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';


const protectRoute = async (req,res,next) =>{
    try {

        const token = req.cookies.jwt_token;

        if(!token){
            return res.status(400).json({error:'Unauthorized - No access token found..!'});
        }

        const accessToken = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!accessToken){
            return res.status(404).json({error : 'Unauthorized - Invalid token..!'});
        }

        const user = await User.findById(accessToken.userId).select("-password");

        if(!user){
            return res.status(400).json({error : 'User not found..!'});
        }

        req.user = user;

        next();


    } catch (err) {
        console.log("Error in protect route middleware");
        res.status(500).json({error:err.message})
    }
}

export default protectRoute;