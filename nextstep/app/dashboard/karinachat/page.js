'use client'
import React, { useState, useRef, useEffect } from 'react'

const page = ({ isDark, accent }) => {
  const inputBg = isDark ? 'bg-[#10142F] text-white placeholder:text-white border-[#000000]' : 'bg-white text-black placeholder:text-slate-400 border-[#D0D5FF]'
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: 'karina',
      text: "Hi, I'm Karina. You're free to ask questions, share your thoughts, or talk about anything you're curious about.",
    },
  ])

  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    const trimmed = message.trim()
    if (!trimmed) return

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), author: 'user', text: trimmed },
      { id: Date.now() + 1, author: 'karina', text: 'Thanks for your question! I will answer shortly.' },
    ])
    setMessage('')
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        author: 'karina',
        text: "Hi, I'm Karina. You're free to ask questions, share your thoughts, or talk about anything you're curious about.",
      },
    ])
    setMessage('')
  }

  return (
    <div
      className='h-full w-full flex flex-col overflow-hidden'
      style={{
        backgroundImage: isDark
          ? `linear-gradient(to right, #25297D, #171A4F, #101236, #070817), radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)`
          : `radial-gradient(circle, rgba(99,104,255,0.95) 1px, transparent 1px)`,
        backgroundSize: isDark ? 'cover, 24px 24px' : '24px 24px',
        backgroundBlendMode: isDark ? 'overlay' : 'normal',
      }}
    >
      <div className='flex h-[100%] w-[100%] flex-col '>
        <div className=' h-[80px] w-full flex items-center justify-center '>
          <div className='h-[90%] w-[98%] flex items-center justify-between  '>
            <div>
              <p className='text-[25px] uppercase tracking-[0.35em] text-[#6367FF] font-bold'>Ask Karina</p>
              <h1 className='text-[20px] font-medium text-[#000000]/70'>Your AI Mentor for Career Growth & Roadmap</h1>
            </div>
            <button
              type='button'
              onClick={clearChat}
              className='inline-flex items-center rounded-full border border-[#6367FF] bg-white px-4 py-2 text-sm font-semibold text-[#6367FF] transition hover:bg-[#6367FF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6367FF] focus:ring-offset-2'>
              Clear Chat
            </button>
          </div>
        </div>

        <div className='flex-1 overflow-hidden'>
          <div className='h-full '>
            <div className='flex h-full flex-col'>
              <div ref={scrollRef} className='flex-1 overflow-y-auto px-4 pb-4 pt-6 sm:px-6 sm:pb-6 space-y-4 hide-scrollbar'>
             {messages.map((msg) => (
  <div
    key={msg.id}
    className={`flex ${
      msg.author === 'user' ? 'justify-end' : 'justify-start'
    }`}
  >
    <div
     className={`inline-block w-fit max-w-[75%] rounded-[24px] px-6 py-5 text-sm leading-6 break-words ${
  msg.author === 'karina'
    ? 'bg-[#6367FF] text-white shadow-[0_10px_25px_rgba(0,0,0,0.35)]'
    : 'bg-white text-[#6367FF] border border-[#6367FF] shadow-[0_10px_25px_rgba(0,0,0,0.35)]'
}`}
    >
      {msg.text}
    </div>
  </div>
))}
              </div>

              <div className='px-4 pb-4 sm:px-6 sm:pb-6'>
                <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                  <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder='Ask Karina anything ......'
                    className={`flex-1 rounded-[20px] border px-6 py-5 text-base outline-none ${inputBg}`}
                  />
                  <button
                    type='button'
                    onClick={sendMessage}
                    className='h-[60px] rounded-[24px] bg-[#6367FF] px-8 text-base font-semibold text-white transition hover:bg-[#4B4FD9]'
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default page