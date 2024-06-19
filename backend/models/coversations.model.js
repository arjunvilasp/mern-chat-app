import mongoose from "mongoose";

const conversationsSchema = new mongoose.Schema(
  {
    participats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USer",
      },
    ],

    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversations = mongoose.model("Conversations", conversationsSchema)

export default Conversations;
