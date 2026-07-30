import { Mic, Paperclip, Send } from 'lucide-react'
import React, { useState } from 'react'
import sendMessage from '../features/sendMessage.js'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../features/getMessages.js'
import { addMessages, setMessages } from '../redux/messageSlice.js'

const ChatInput = () => {
    const [value, setValue] = useState("")
    const dispatch = useDispatch()
    const { selectedConversation } = useSelector(state => state.conversation)
    const { messages } = useSelector(state => state.message)

    const handleSendMessage = async () => {
        const trimmedValue = value.trim()

        if (!trimmedValue || !selectedConversation?._id) return

        const payload = {
            prompt: trimmedValue,
            conversationId: selectedConversation._id,
        }

        dispatch(addMessages({ role: "user", content: trimmedValue }))
        const data = await sendMessage(payload)

        if (data) {
            dispatch(addMessages({ role: "assistant", content: data }))
        }

        setValue("")
    }
  return (

        <div className='w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/[0.06] bg-[#0d0f14]'>      
            <div className='flex flex-col gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-4 pt-3.5 pb-3'>
                    <textarea
                        onChange={(e)=>setValue(e.target.value)}
                        value={value}
                        placeholder='Ask Anything...'
                        className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden disabled:opacity-50"
                        rows={3}
                    />

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <button className='flex items-center justify-center w-8 h-8 rounded-lg  text-slate-600 hover:text-slate-400  hover:bg-white/[0.05] border border-transparent 
                                hover:border-white/[0.06]
                                transition-all duration-150 bg-transparent cursor-pointer'>
                                <Paperclip size={16}/>
                            </button>
                            <button className='flex items-center justify-center w-8 h-8 rounded-lg  text-slate-600
                                hover:text-slate-400  hover:bg-white/[0.05] border border-transparent
                                 hover:border-white/[0.06]
                                    transition-all duration-150 bg-transparent cursor-pointer'>
                            <Mic size={16}/>
                            </button>
                        </div>
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={value.trim().length === 0}
                            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150
                            ${value.trim().length > 0
                            ? "bg-white hover:scale-105"
                            : "bg-white/10 cursor-not-allowed"
                            }`}>
                            <Send  className={value.trim().length > 0 ? "text-black" : "text-slate-500"} />
                        </button>
                        
                    </div>
            </div>
        </div>
  )
}

export default ChatInput
