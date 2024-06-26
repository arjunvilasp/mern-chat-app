import Conversations from "../models/coversations.model.js";
import Message from "../models/message.model.js";
import { getSocketReceiver, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let conversations = await Conversations.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversations) {
      conversations = await Conversations.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversations.messages.push(newMessage._id);
      await Promise.all([conversations.save(), newMessage.save()]);

      const socketReceiver = getSocketReceiver(receiverId);

      if (socketReceiver) {
        io.to(socketReceiver).emit("newMessage", newMessage);
      }

      res.status(201).json(newMessage);
    } else {
      throw new Error("Error sending message");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const senderId = req.user._id;

    const conversations = await Conversations.findOne({
      participants: { $all: [senderId, userToChat] },
    }).populate("messages");

    if (!conversations) {
      res.status(400).json([]);
    } else {
      const messages = conversations.messages;
      res.status(200).json(messages);
    }
  } catch (error) {
    console.log("Error getting message");
    res.status(500).json({ error: error.message });
  }
};
