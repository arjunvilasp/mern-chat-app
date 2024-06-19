import Conversations from "../models/coversations.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res) =>{
    try {
        const {message} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;

        let conversations = await Conversations.findOne({
            participats : {
               $all : [senderId, receiverId]
            }
        });

        if(!conversations){
            conversations = await Conversations.create({
              participats : [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversations.messages.push(newMessage._id);
        }

        // await conversations.save();
        // await newMessage.save();

        //Faster that is both will run in parallel
        await Promise.all([conversations.save(),newMessage.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error sending message");
        res.status(500).json({error:error.message})
    }
}

export const getMessage = async (req, res) =>{
    try {
        const {id:userToChat} = req.params;
        const senderId = req.user._id;

        const conversations = await Conversations.findOne({
           participats :{ $all : [senderId,userToChat] }
        }).populate("messages");

        if(!conversations){
            res.status(400).json([]);
        }

        const messages = conversations.messages;
        res.status(200).json(messages)

    } catch (error) {
        console.log("Error getting message");
        res.status(500).json({error:error.message})
    }
}