import { Conversation } from "../models/conversation.models.js"
import { Message } from "../models/message.models.js"

const createConversation = async (req,res)=>{
    try {
        const userId = req.headers["x-user-id"]
        console.log("userId",userId)
        const conversation = await Conversation.create({
            userId:userId,

        })
        return res.status(200).json(conversation)
    } catch (error) {
               return res.status(500).json({message :`create conversation header ${error}`})
 
    }
}

const getConversations = async (req,res)=>{
    try {
        const userId = req.headers["x-user-id"]
        console.log("userId",userId)
        const conversation = await Conversation.find({
            userId:userId,

        }).sort({updatedAt:-1})
        return res.status(200).json(conversation)
    } catch (error) {
               return res.status(500).json({message :`get conversation header ${error}`})
 
    }
}

const updateConversation = async (req,res)=>{
    try {
        const {id,title} = req.body;
        
        const updatedConversation = await Conversation.findByIdAndUpdate(id,{
            title
        })
        return res.status(200).json(updatedConversation)
    } catch (error) {
               return res.status(500).json({message :`update conversation header ${error}`})
 
    }
}


const saveMessage = async(req,res)=>{
    try {
        const {conversationId,role,content,images,artifacts} = req.body
        const message = await Message.create({
            conversationId,
            role,
            content,
            images: images || [],
            artifacts
        })
     return res.status(200).json(message)
    } catch (error) {
               return res.status(500).json({message :`save message error ${error}`})
 
    }
}

const getAllMessage = async(req,res)=>{
    try {
        
        const messages = await Message.find({
            conversationId:req.params.conversationId
            
        })
     return res.status(200).json(messages)
    } catch (error) {
               return res.status(500).json({message :`get all message error ${error}`})
 
    }
}


export {createConversation,getConversations,saveMessage,getAllMessage,updateConversation}