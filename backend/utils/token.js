import jwt from "jsonwebtoken";

const generateJwtTokenAndSetCookie = async (userId, res) =>{
    try{
        const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{
            expiresIn : '15d'
        });

        res.cookie("jwt_token",token,{
            maxAge : 15 * 24 * 60 * 60 * 1000,
            httpOnly : true,
            sameSite : "strict"
        });
    }
    catch(err){
        console.log((err.message));
    }
}

export default generateJwtTokenAndSetCookie;