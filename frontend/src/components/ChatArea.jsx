import React, { useEffect } from 'react'
import Nav from './Nav.jsx'
import MessageList from './MessageList.jsx'
import ChatInput from './ChatInput.jsx'
import { useDispatch, useSelector } from 'react-redux'
import {getMessages} from '../features/getMessages.js'
import { setArtifacts, setMessages } from '../redux/messageSlice.js'

const ChatArea = () => {
    const { selectedConversation } = useSelector(state => state.conversation)
    const dispatch = useDispatch()

    useEffect(() => {
        const getMsg = async () => {
            if (!selectedConversation?._id) {
                dispatch(setMessages([]))
                return
            }

            if(selectedConversation.title == "New Chat")return
            const data = await getMessages(selectedConversation._id)
            console.log("API resp:", data);
            dispatch(setMessages(Array.isArray(data) ? data : data?.messages ?? []))

            // now there are two many messages and particluar artifact to find is quite difficult 
            // so inorde to do that i want to save the latest artifacts

            const latestArtifactsMessage = [...data].reverse().find(msg=>msg.artifacts && msg.artifacts.length>0)
            dispatch(setArtifacts(latestArtifactsMessage?.artifacts||[]));
            
        }

        getMsg()
    }, [selectedConversation?._id, dispatch])

  return (
    <div className='flex-1 flex flex-col min-w-0'>
      <Nav/>
      <MessageList/>
      <ChatInput/>
    </div>
  )
}

export default ChatArea
