'use client'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import { auth, provider } from '../firebase lib/firebase'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { useTheme } from './useTheme'
import {useRouter} from 'next/navigation'



const page = () => {
  const { theme, isPurple, togglePurple } = useTheme()
  const router = useRouter()
  const [user, setUser] = useState(null)  // it tracks the authothentication state 

  // Listen for login state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [])

   // login and signup function with google auth
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)   // ← Popup is simpler for redirect control
      router.push('/FreeTrial')
    } catch (error) {
      console.error(error)
    }
  }

 
  const Text = "italic text-[18px] sm:text-[20px] md:text-[22px] font-bold"
 
  const button = `h-[44px] sm:h-[50px] w-full sm:w-[290px] rounded-[10px] text-[16px] sm:text-[20px] bg-gradient-to-r from-[#6367FF] to-[#3B3E99] font-bold text-white flex justify-center items-center gap-3 
   cursor-pointer transition-transform duration-200 hover:scale-103`
 
  const tags = `cursor-pointer transition-transform duration-200`
 
  return (
    <div
      className='min-h-screen w-full flex flex-col justify-between items-center gap-2'

     style={{
  backgroundImage:
    theme === 'purple'
      ? `
        radial-gradient(circle, rgb(255, 255, 255, 0.43) 1px, transparent 1px),
        linear-gradient(to right,#25297D,#171A4F,#101236,#070817)
      `
      : theme === 'dark'
      ? `
        radial-gradient(circle, rgba(255, 255, 255, 0.43) 1px, transparent 1px),
        linear-gradient(#0B0909,#0B0909)
      `
      : `
        radial-gradient(circle, rgba(21, 0, 253, 0.95) 1px, transparent 1px)
      `,

  backgroundSize:
    theme === 'white'
      ? '24px 24px'
      : '24px 24px, cover',

  backgroundRepeat:
    theme === 'white'
      ? 'repeat'
      : 'repeat, no-repeat',
}}
    >

      {/* ── NAVBAR ── */}
      <div className='h-[50px] w-full flex justify-start items-center cursor-pointer px-2 sm:px-4'>
        <div className='h-[90%] w-auto flex justify-center items-center gap-1'>
 
          {/* N logo */}
          <div
            onClick={togglePurple}
            className={`h-[30px] w-[30px] sm:h-[34px] sm:w-[34px] rounded-[10px] 
            flex justify-center items-center transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer 
            ${isPurple ? 'bg-white shadow-md shadow-[#000000]/100' : 'bg-black shadow-md shadow-[#000000]/80'}`}>
            <p className='text-[20px] sm:text-[27px] font-black text-[#6367FF]'>N</p>
          </div>
 
          <p className={`${Text} ml-1 sm:ml-2 transition-colors duration-500 ${isPurple ? 'text-white' : 'text-black'}`}>Next</p>
          <p className={`${Text} text-[#A492FF] mr-1`}>Step</p>
          <p className={`italic text-[18px] sm:text-[22px] font-bold transition-colors duration-500 ${isPurple ? 'text-white' : 'text-black'}`}>AI</p>
        </div>
      </div>
 
      {/* ── MAIN CONTENT ── */}
      <div className='w-full flex flex-col justify-center items-center px-4 sm:px-6 gap-4 sm:gap-6 flex-1'>
 
        {/* AI tag */}
        <div className={`h-[36px] sm:h-[40px] w-full max-w-[340px] sm:max-w-[400px] border-2 cursor-pointer rounded-[10px] flex justify-center items-center gap-2 transition-all duration-500 
        ${isPurple ? 'border-[#25297D] bg-gradient-to-r from-[#25297D] via-[#171A4F] to-[#070817]' : 'border-black/30 bg-[#BBE0EF]/100'}`}
          style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.4)' }}>
          <span className='relative flex h-[14px] w-[14px] sm:h-[18px] sm:w-[18px]'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3EAB19] opacity-75'></span>
            <span className='relative inline-flex h-[14px] w-[14px] sm:h-[18px] sm:w-[18px] rounded-full bg-[#3EAB19]'></span>
          </span>
          <p className={`text-[11px] sm:text-sm font-semibold transition-colors duration-500 ${isPurple ? 'text-white' : 'text-black'}`}>
            AI-Powered Career Roadmap Platform
          </p>
        </div>
 
        {/* Heading */}
        <div className='w-full flex flex-col justify-center items-center cursor-pointer gap-1 sm:gap-2'>
 
          {/* Discover the path that */}
          <div className='w-full flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-7'>
            <p className={`text-[42px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-bold leading-none transition-colors duration-500 ${isPurple ? 'text-white' : 'text-black'}`}>
              Discover
            </p>
            <p className={`text-[42px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-semibold leading-none transition-colors duration-500 ${isPurple ? 'text-[#8E8E8F]' : 'text-[#8E8E8F]/94'}`}>
              the path that
            </p>
          </div>
 
          {/* aligns with your */}
          <p className='text-[42px] sm:text-[60px] md:text-[80px] lg:text-[100px] text-[#8E8E8F] flex justify-center items-center w-full font-semibold leading-none'>
            aligns with your
          </p>
 
          {/* passion, skills, */}
          <p className='italic text-[42px] sm:text-[60px] md:text-[80px] lg:text-[100px] text-[#6367FF] w-full flex justify-center items-center font-bold leading-none'>
            passion, skills,
          </p>
 
          {/* and future goals */}
          <div className='w-full flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-7 text-[#6367FF] text-[42px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-bold italic leading-none'>
            <p className='not-italic font-semibold text-[#8E8E8F]'>and</p>
            future goals.
          </div>
        </div>
 
        {/* Description */}
        <div className='w-full max-w-[600px] flex flex-col justify-center items-center text-[14px] sm:text-[18px] md:text-[20px] cursor-pointer text-center gap-1'>
          <div className='flex flex-wrap justify-center gap-1'>
            <span className='italic flex font-bold'>
              <p className={`transition-colors duration-500 ${isPurple ? 'text-white' : 'text-black'}`}>Next</p>
              <p className='text-[#A897FF]'>Step</p>
              <p className={`transition-colors duration-500 ${isPurple ? 'text-white' : 'text-black'}`}>AI</p>
            </span>
            <p className='font-medium text-[#8E8E8F]'>helps you discover the right career path with a</p>
          </div>
          <p className='font-medium text-[#8E8E8F]'>personalized roadmap and intelligent guidance along the way.</p>
        </div>
 
        {/* Buttons */}
        {/*--- hide free trial button if the user is logged in previously  */}
        {/*it will show the go to dashboard which is directly redirected */}
        <div className='w-full max-w-[1000px] flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 px-4'>
 
          {/* Free trial button */}
          {!user && (
          <Link href='/FreeTrial' className='w-full sm:w-auto'>
            <div className={`h-[44px] sm:h-[50px] w-full sm:w-[245px] rounded-[10px] flex justify-center items-center 
              gap-3 transition-transform duration-200 hover:scale-103 cursor-pointer
               bg-gradient-to-r from-[#6367FF] to-[#3B3E99] text-[16px] sm:text-[20px] text-white font-bold 
               ${isPurple ? 'shadow-md shadow-[#ffffff]' : 'shadow-md shadow-[#000000]'}`}>
              Go for a free trial
              <FontAwesomeIcon className='text-[20px] sm:text-[25px]' icon={faArrowRight} />
            </div>
          </Link>)}
 
          {/* Google button */}
          <div onClick = {handleGoogleLogin} className={`${button} ${isPurple ? 'shadow-md shadow-[#ffffff]' : 'shadow-md shadow-[#000000]'}`}>
            <FontAwesomeIcon className='text-[20px] sm:text-[25px]' icon={faGoogle}  />{user ? 'Go to Dashboard' : 'Continue with Google'}
        
          </div>
 
  
 
        </div>
 
      </div>
 
      {/* ── BOTTOM BAR ── */}
      <div className='h-auto w-full flex flex-col sm:flex-row justify-between items-center sm:items-end pb-3 px-3 gap-2 sm:gap-0'>
 
        {/* left links */}
        <span className='italic flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-4 text-[11px] sm:text-[13px] font-medium'>
          <a className={`${tags} ${isPurple ? 'text-white hover:text-[#C9BEFF]' : 'text-[#000000] hover:text-[#6367FF]'}`}>About Us</a>
          <a className={`${tags} ${isPurple ? 'text-white hover:text-[#C9BEFF]' : 'text-[#000000] hover:text-[#6367FF]'}`}>Terms of Services</a>
          <a className={`${tags} ${isPurple ? 'text-white hover:text-[#C9BEFF]' : 'text-[#000000] hover:text-[#6367FF]'}`}>Privacy Policy</a>
        </span>
 
        {/* social media placeholder */}
        <span></span>
 
        {/* copyright */}
        <span className='flex justify-center sm:justify-end items-center text-[11px] sm:text-[13px] font-medium'>
          <a className={`${tags} ${isPurple ? 'text-white hover:text-[#C9BEFF]' : 'text-[#000000] hover:text-[#6367FF]'}`}>© 2026 NextStep AI. All rights reserved</a>
        </span>
 
      </div>
    </div>
  )
}
 
export default page