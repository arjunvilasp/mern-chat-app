import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import generateJwtTokenAndSetCookie from "../utils/token.js";

//Register
export const registerAuth = async (req,res)=>{
    try{
        const {firstName, lastName, username, email, password, confirmPassword, gender} = req.body;

        if(password != confirmPassword){
            console.log("Password are not equal..!");
            res.status(401).json({error:"Password mismatch.!"});
        }

        const user = await User.findOne({username});
  
        if(user){
            console.log("User already exists..!");
            res.status(409).json({error:"User already exists..!"});
        }else{
            //hash password
            const hashedPassword = await bcrypt.hash(password,10);
            //profile pic generation
            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

            const newUser = new User({
                firstName,
                lastName,
                username,
                email,
                password : hashedPassword,
                gender,
                profilePic : gender == "male" ? boyProfilePic : girlProfilePic
            });

            await newUser.save();

            if(newUser){
                generateJwtTokenAndSetCookie(newUser._id,res);
                res.status(201).json({
                    message : "User created successfully.!",
                    _id : newUser._id,
                    fullname : newUser.firstName + " " + newUser.lastName,
                    username : newUser.username,
                    profilePic : newUser.profilePic,
                    email : newUser.email
                });
            }else{
                console.log("Invalid user data..!");
                res.status(400).json({error:"Invalid user data..!"});
            }
        }
    }
    catch(err){
        console.log("Internal server Error..!");
        res.status(500).json({error:`Internal server error-${err.messsage}`});
    }
    
}


//Login
export const loginAuth = async (req,res)=>{
   try {
    const {username,password} = req.body;

    const user = await User.findOne({username});
    const isPasswordCorrect = bcrypt.compare(password,user?.password || "")

    if(!user || !isPasswordCorrect){
        console.log("Invalid username or password");
        res.status(400).json({message:'Invalid username or password..!'});
    }
    else{
        generateJwtTokenAndSetCookie(user._id,res);
        res.status(200).json({
            message : "Login successfull.",
            _id : user._id,
            fullname : user.firstName + " " + user.lastName,
            username : user.username,
            profilePic : user.profilePic,
            email : user.email
        })
    }
   } catch (error) {
    console.log("Internal server Error..!");
    res.status(500).json({error:`Internal server error-${error.messsage}`});
   }
}

export const logoutAuth = (req,res) => {
    try {
        res.cookie("jwt_token", "", {
            maxAge : 0
        });
        res.status(200).json({message:"Logout successfull.!"});
    } catch (error) {
        console.log("Internal server Error..!");
        res.status(500).json({error:`Internal server error-${err.messsage}`});
    }
}
