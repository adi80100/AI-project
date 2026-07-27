import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversationId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Conversation"
        },
        roll:{
            type:String,
            enum:["user","assistant"]
        },
        content:{
            type:String
        }
    }
    ,{timestamps:true})

export const Message = mongoose.model("Message",messageSchema);