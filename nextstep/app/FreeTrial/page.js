'use client'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../useTheme'
import { auth, provider } from '../../firebase lib/firebase'
import {onAuthStateChanged} from 'firebase/auth'
import { useSearchParams } from 'next/navigation'
 
const page = () => {
  const [name, setName]               = useState('')
  const [age, setAge]                 = useState('')
  const [college, setCollege]         = useState('')
  const [course, setCourse]           = useState('')
  const [goal, setGoal]               = useState('')
  const { isDark, toggleDark, accent } = useTheme()
  const [step, setStep]               = useState(1)
  const [skills, setSkills]           = useState([])
  const [customSkills, setCustomSkills] = useState([])
  const [newSkill, setNewSkill]       = useState('')
  const [timeline, setTimeline]       = useState('')
  const [roadmapData, setRoadmapData]       = useState(null)
  const [loading, setLoading]       = useState(false)
  const [user, setUser] = useState(null)
  const searchParams = useSearchParams()

//free trial text is going to hide if the user is logged in
 useEffect(() =>{
  const unsub = onAuthStateChanged(auth, (u) => setUser(u))
  return () => unsub()
 }, [])

 useEffect(() => {
    if (searchParams.get('restart') === 'true') {
      const stored = localStorage.getItem("roadmap")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.name) setName(parsed.name)
        if (parsed.age) setAge(parsed.age)
        if (parsed.college) setCollege(parsed.college)
        if (parsed.course) setCourse(parsed.course)
      }
      setStep(3)
    }
  }, [])

  // creating API function to call karina AI API from KarinaAI (python) to generate roadmap
  const generateRoadmap = async () => {
    try {
      setLoading(true)
 
       const res = await fetch("/api/generate-roadmap", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
body: JSON.stringify({
  user_input: `
    Age: ${age}
    College: ${college}
    Course: ${course}
    Goal: ${goal}
    Skills: ${[...skills, ...customSkills].join(", ")}
    Timeline: ${timeline}
  `
})
})

const data = await res.json()
console.log("Raw data from API:", data)

setRoadmapData(data.roadmap)

const currentEntry = {
  id: Date.now().toString(),
  savedAt: new Date().toISOString(),
  title: data.careerDestination?.bestRole || goal || 'Saved Roadmap',
  data: {
    ...data,
    name,
    age,
    college,
    course,
  },
}

const existingHistoryRaw = localStorage.getItem('roadmapHistory')
const existingHistory = existingHistoryRaw ? JSON.parse(existingHistoryRaw) : []
const updatedHistory = [currentEntry, ...existingHistory].slice(0, 20)

localStorage.setItem('roadmap', JSON.stringify(currentEntry.data))
localStorage.setItem('roadmapHistory', JSON.stringify(updatedHistory))

setTimeout(() => {
  window.location.href = "/dashboard"
}, 1500)
    } catch (err) {
      console.error("Roadmap fetch error:", err)
    } finally {
      setLoading(false)
    }
  }


  //acess state for each step to enable continue button only when input is provided
  const canContinueStep1 = name.trim()
  const canContinueStep2 = college.trim()
  const canContinueStep3 = goal.trim()
  const canContinueStep5 = timeline.trim()
 

  //toggle skills selection on click 
  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill))
    } else {
      setSkills([...skills, skill])
    }
  }
 //this is add new skills section
  const addNewSkill = () => {
    const trimmed = newSkill.trim()
    if (trimmed && !customSkills.includes(trimmed) && !skillsList.includes(trimmed)) {
      setCustomSkills([...customSkills, trimmed])
      setNewSkill('')
    }
  }
 
  const removeCustomSkill = (skill) => {
    setCustomSkills(customSkills.filter(s => s !== skill))
  }
 
  const skillsList = [
    'Python',  'React', 'Excel',
    'Figma', 'Java', 'Machine Learning',
    'Data Analysis', 'Marketing'
  ]
 
  const timelineOptions = [
    { id: '3m',  label: '3 months',  sub: 'Intensive, full focus' },
    { id: '6m',  label: '6 months',  sub: 'Balanced and steady' },
    { id: '12m', label: '12 months', sub: 'Relaxed, your own pace' },
  ]
 
 //information card components 
const Text = "italic text-[18px] sm:text-[20px] md:text-[22px] font-bold"

const one = `italic font-black text-[#471396]  ${isDark ? 'text-white' : 'text-[#471396] '}`

const info = `w-full rounded-[10px] flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 mt-10
              ${isDark ? 'shadow-md shadow-[#A492FF]' : 'shadow-md shadow-[#000000]' } 
              ${isDark ? 'bg-black' : 'bg-[#6367FF]/85'}
              ${isDark ? 'border-1 border-[#ffffff]/50' : 'border-1 border-[#000000]/50'}`



  // reusable input style
  const inputStyle = isDark ? {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(99,103,255,0.4)',
    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
  } : {
    background: 'white',
    boxShadow: 'inset 0 2px 8px rgb(0, 0, 0)',
  }
 
  // reusable input className
  const inputClass = `h-[44px] w-full rounded-[20px] text-center
    placeholder:font-bold font-bold outline-none text-[14px] sm:text-[15px]
    ${isDark ? 'text-white placeholder:text-white/30' : 'text-black'}`
 
  // step label component
  const StepLabel = ({ current }) => (
    <div className='w-full flex items-center gap-2'>
      <div className={`h-[4px] w-[24px] sm:w-[30px] rounded-[20px]
        ${isDark ? 'bg-[#A897FF]' : 'bg-white'}`}
        style={isDark ? { boxShadow: '0 0 8px rgba(164,146,255,0.9)' } : {}} />
      <span className={`italic font-medium text-[12px] sm:text-[14px]
        ${isDark ? 'text-white/80' : 'text-white'}`}>
        Step {current} of 5
      </span>
    </div>
  )
 
  // back + continue buttons
  const Buttons = ({ onBack, onContinue, canContinue, label = 'CONTINUE', showBack = true }) => (
    <div className='w-full flex gap-3 justify-center'>
      {showBack && (
        <div onClick={onBack}
         className={`h-[42px] sm:h-[44px] w-[100px] sm:w-[140px] rounded-[10px] flex justify-center 
          
          items-center font-bold text-[13px] sm:text-[14px] cursor-pointer 
          transition-all duration-200 active:scale-95
         ${isDark ? 'border border-[#6367FF]/50 text-white' : 'border border-gray-300 text-black'}
         ${isDark ? 'bg-black' : 'bg-[#A492FF]'}
         ${isDark ? 'shadow-md shadow-[#A492FF]' : ' shadow-md shadow-[#000000]'}`}>
          ← Back
        </div>

      )}


     <div
  onClick={() => canContinue && onContinue()}
  className={`h-[42px] sm:h-[44px] flex-1 max-w-[280px] rounded-[10px]
    flex justify-center items-center font-bold
    cursor-pointer transition-all duration-200 active:scale-95
    text-[13px] sm:text-[15px]
    ${!canContinue ? 'cursor-not-allowed opacity-50' : ''}
    ${isDark
      ? canContinue
        ? 'bg-gradient-to-br from-[#4B4FD9] to-[#6367FF] text-white '
        : 'bg-white/10 text-white/40'
      : canContinue
        ? 'bg-[#A492FF] text-black'
        : 'bg-black text-white'
    }
    ${isDark ? 'none' : ' shadow-md shadow-[#000000]'}
    ${isDark ? '' : 'border border-gray-300'}`}
>
  {label}
  <FontAwesomeIcon icon={faArrowRightLong} className='ml-2 sm:ml-3' />
</div>
    </div>
  )
 
  return (
    <div className= 'relative w-full h-screen overflow-hidden'
       style={{
    backgroundImage: isDark
      ? `linear-gradient(to right, #25297D, #171A4F, #101236, #070817), radial-gradient(circle,
       rgba(255, 255, 255, 0.2) 1px, transparent 1px)` :
        `radial-gradient(circle, rgba(99, 104, 255, 0.52) 1px, transparent 1px)`,

    backgroundSize: isDark ? 'cover, 24px 24px' : '24px 24px',
    backgroundBlendMode: isDark ? 'overlay' : 'normal'
  }}>
 
      {/* ── NAVBAR ── */}
      <div className={`h-[50px] sm:h-[55px] w-full flex justify-between items-center
        px-2 sm:px-4
        ${isDark
          ? 'bg-gradient-to-r from-[#25297D] via-[#171A4F] via-[#101236] to-[#070817]'
          : 'bg-white '
        }`}>
 
        {/* logo */}
        <div className='flex justify-center items-center cursor-pointer gap-1'>
          <div   onClick={toggleDark}
            className={`h-[30px] w-[30px] sm:h-[34px] sm:w-[34px] rounded-[10px] 
            flex justify-center items-center transition-transform
             duration-300 hover:scale-110 active:scale-95 cursor-pointer 
            ${isDark ? 'bg-white shadow-md shadow-[#000000]/100' : 'bg-black shadow-md shadow-[#000000]/80'}`}>
            <p className='text-[20px] sm:text-[24px] font-bold text-[#6367FF]'>N</p>
          </div>
          <p className={`${Text} ml-1 ${isDark ? 'text-white' : 'text-black'}`}>Next</p>
          <p className={`${Text} text-[#A492FF]`}>Step</p>
          <p className={`italic text-[18px] sm:text-[22px] font-bold ${isDark ? 'text-white' : 'text-black'}`}>AI</p>
        </div>
 
        
        {!user && (
          <div className='hidden sm:flex justify-center items-center'>
            <p className={`italic text-[18px] sm:text-[22px] font-bold cursor-pointer
              hover:text-[#A492FF] transition-all duration-200
              ${isDark ? 'text-white' : 'text-black'}`}>
              Free Trial
            </p>
          </div>
        )}
          
 
        {/* signup */}
          
        <div className= 'flex justify-center items-center'>
         {!user &&( 
          <div className={`h-[28px] sm:h-[32px] w-[90px] sm:w-[110px] rounded-[20px]
            cursor-pointer flex justify-center items-center
            bg-[#6367FF] border border-white
            transition-all duration-200 hover:scale-105
            ${isDark ? 'shadow-md shadow-[#A897FF]/80' : 'shadow-md shadow-black/80'}`}>
            <p className='font-bold text-[14px] sm:text-[16px] text-white'>Sign Up</p>
          </div> )}
        </div> 
      </div> 
 
      {/* MAIN */}
    <div className='w-full h-[calc(100vh-50px)] sm:h-[calc(100vh-55px)]
  flex flex-col items-center justify-between overflow-hidden'>
 
        {/*  CARD WRAPPER — responsive width */}
        <div className='w-full px-3 sm:px-6 md:px-0 md:w-[672px]'>





 
          {/* ══ STEP 1 ══ */}
          {step === 1 && (
            <div className={info}>
 
              <StepLabel current={1} />
 
              {/* heading */}
              <div className='flex flex-col gap-1'>
                <span className={`text-[28px] sm:text-[36px] md:text-[40px] font-bold 
                  ${isDark ? 'text-white' : 'text-white'}`}>
                  What's your <p className={one}>name</p> 
                </span>
                <span className={`italic font-medium text-[13px] sm:text-[15px]
                  ${isDark ? 'text-[#A897FF]' : 'text-white/80'}`}>
                  Karina will use this to personalise your entire experience
                </span>
              </div>
 
              {/* karina tag kard */}
              <div className={`w-full rounded-[10px] flex items-center gap-3 p-3 sm:p-4 
              ${isDark ? 'bg-black ' : 'bg-white'}
              ${isDark ? 'shadow-md shadow-[#A492FF]' : 'shadow-md shadow-[#000000]'}
              ${isDark ? 'border-1 border-[#ffffff]/50' : 'border-1 border-[#000000]/50'}
               }`}
               >
                <div className={`h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] border-2 border-[#6367FF]
                  rounded-[10px] flex justify-center items-center flex-shrink-0
                  ${isDark ? 'bg-white' : 'bg-black'}`}>
                  <span className='text-[24px] sm:text-[30px] font-bold text-[#6367FF]'>K</span>
                </div>
                <p className={`font-bold text-[12px] sm:text-[14px] leading-relaxed
                  ${isDark ? 'text-white/70' : 'text-[#6367FF]'}`}>
                  <strong className={` font-black ${isDark ? 'text-[#A897FF]' : 'text-[#7A1CAC]'}`}>Karina: </strong>
                  Hi! I'm your AI career mentor. Let's build your perfect roadmap together
                </p>
              </div>
 
              {/* inputs */}
              <div className='flex flex-col gap-3 '>
                <div className='flex flex-col gap-1 '>
                  <span className={`italic font-bold text-[13px] sm:text-[14px]
                    ${isDark ? 'text-white' : 'text-white/80'}`}>Your name</span>
                  <input type="text" placeholder='e.g karina'
                    value={name} onChange={e => setName(e.target.value)}
                    className={inputClass} style={inputStyle} />
                </div>
                <div className='flex flex-col gap-1'>
                  <span className={`italic font-bold text-[13px] sm:text-[14px]
                    ${isDark ? 'text-white' : 'text-white/80'}`}>Your age</span>
                  <input type="tel" placeholder='e.g 21'
                    value={age} onChange={e => setAge(e.target.value)}
                    className={inputClass} style={inputStyle} />
                </div>
              </div>
 
              <Buttons
                showBack={false}
                canContinue={canContinueStep1}
                onContinue={() => setStep(2)}
              />
            </div>
          )}
 





          {/* ══ STEP 2 ══ */}
          {step === 2 && (
             <div className={info}>
 
              <StepLabel current={2} />
 
              <div className='flex flex-col gap-1'>
                <h1 className={`text-[28px] sm:text-[36px] md:text-[40px] font-bold
                  ${isDark ? 'text-white' : 'text-white'}`}>
                  Where do you <p className={one}>study?</p>
                </h1>
                <p className={`italic font-medium text-[13px] sm:text-[15px]
                  ${isDark ? 'text-[#A897FF]' : 'text-white/80'}`}>
                  This helps Karina understand your situation
                </p>
              </div>
 
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <span className={`italic font-bold text-[13px] sm:text-[14px]
                    ${isDark ? 'text-white' : 'text-white/80'}`}>College or school</span>
                  <input type="text" placeholder='e.g Mumbai University , DPS'
                    value={college} onChange={e => setCollege(e.target.value)}
                    className={inputClass} style={inputStyle} />
                </div>
                <div className='flex flex-col gap-1'>
                  <span className={`italic font-bold text-[13px] sm:text-[14px]
                    ${isDark ? 'text-white' : 'text-white/80'}`}>Your course</span>
                  <input type="text" placeholder='e.g B.com, Science'
                    value={course} onChange={e => setCourse(e.target.value)}
                    className={inputClass} style={inputStyle} />
                </div>
              </div>
 
              <Buttons
                canContinue={canContinueStep2}
                onBack={() => setStep(1)}
                onContinue={() => setStep(3)}
              />
            </div>
          )}






 
          {/* ══ STEP 3 ══ */}
          {step === 3 && (
         <div className={info}>
 
              <StepLabel current={3} />
 
              <div className='flex flex-col gap-1'>
                <h1 className={`text-[28px] sm:text-[36px] md:text-[40px] font-bold
                  ${isDark ? 'text-white' : 'text-white'}`}>
                  What do you want to <p className={one}>become?</p> 
                </h1>
                <p className={`italic font-medium text-[13px] sm:text-[15px]
                  ${isDark ? 'text-[#A897FF]' : 'text-white/80'}`}>
                  Any career works - technical or not. Karina will build a roadmap for it
                </p>
              </div>
 
              <div className='flex flex-col gap-1'>
                <span className={`italic font-bold text-[13px] sm:text-[14px]
                  ${isDark ? 'text-white' : 'text-white/80'}`}>Your career goal</span>
                <input type="text" placeholder='e.g Doctor, Software Developer'
                  value={goal} onChange={e => setGoal(e.target.value)}
                  className={inputClass} style={inputStyle} />
              </div>
 
              <Buttons
                canContinue={canContinueStep3}
                onBack={() => setStep(2)}
                onContinue={() => setStep(4)}
              />
            </div>
          )}
 





          {/* ══ STEP 4 ══ */}
          {step === 4 && (
             <div className={info}>
 
              <StepLabel current={4} />
 
              <div className='flex flex-col gap-1'>
                <h1 className={`text-[28px] sm:text-[36px] md:text-[38px] font-bold leading-tight
                  ${isDark ? 'text-white' : 'text-white'}`}>
                  What skills do you <p className={one}>have?</p>
                </h1>
                <p className={`text-[13px] sm:text-[15px] font-medium
                  ${isDark ? 'text-[#A897FF]' : 'text-white/80'}`}>
                  Pick everything that applies — or add your own!
                </p>
              </div>
 
              {/* skills pills */}
              <div className='w-full flex flex-wrap gap-2 sm:gap-3'>
                {skillsList.map((skill) => (
                  <div key={skill} onClick={() => toggleSkill(skill)}
                    className={`px-[12px] sm:px-[18px] py-[6px] sm:py-[8px]
                      rounded-[999px] cursor-pointer font-medium
                      text-[12px] sm:text-[14px]
                      transition-all duration-200 hover:scale-105
                      ${skills.includes(skill)
                        ? isDark
                          ? 'bg-[#6367FF] text-white border border-[#6367FF] shadow-[0_0_15px_rgba(99,103,255,0.5)]'
                          : 'bg-black text-white border border-black'
                        : isDark
                          ? 'bg-white/5 text-white/70 border border-white/20'
                          : 'bg-white text-black/70 border border-gray-300'
                      }`}>
                    {skill}
                  </div>
                ))}
 
                {/* custom skills */}
                {customSkills.map((skill) => (
                  <div key={skill}
                    className={`px-[12px] sm:px-[18px] py-[6px] sm:py-[8px]
                      rounded-[999px] font-medium text-[12px] sm:text-[14px]
                      flex items-center gap-2
                      ${isDark
                        ? 'bg-[#6367FF] text-white border border-[#6367FF]'
                        : 'bg-black text-white border border-black'
                      }`}>
                    {skill}
                    <span onClick={(e) => { e.stopPropagation(); removeCustomSkill(skill) }}
                      className='text-[11px] opacity-70 hover:opacity-100 cursor-pointer'>✕</span>
                  </div>
                ))}
              </div>
 
              {/* add custom skill */}
              <div className='w-full flex gap-2 sm:gap-3 items-center'>
                <input type="text" placeholder='Add your own skill...'
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addNewSkill()}
                  className={`flex-1 h-[40px] sm:h-[44px] rounded-[12px]
                    px-3 sm:px-4 text-[13px] sm:text-[14px] font-medium outline-none
                    transition-all duration-300
                    ${isDark
                      ? 'bg-white/5 border border-[#6367FF]/30 text-white placeholder:text-white/30 focus:border-[#6367FF]/80'
                      : 'bg-white border border-gray-200 text-black placeholder:text-gray-400'
                    }`}
                  style={isDark
                    ? { boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)' }
                    : { boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.08)' }
                  }
                />
                <div onClick={addNewSkill}
                  className={`h-[40px] sm:h-[44px] px-[14px] sm:px-[20px] rounded-[50px]
                    flex justify-center items-center
                   text-[13px] sm:text-[14px] cursor-pointer
                    transition-all duration-200 hover:scale-105 whitespace-nowrap
                    ${newSkill.trim()
                      ? isDark
                        ? 'bg-[#6367FF] text-white shadow-[0_0_15px_rgba(99,103,255,0.5)]'
                        : 'bg-black text-white'
                      : isDark
                        ? 'bg-white/5 text-white/20 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}>
                  
  <FontAwesomeIcon 
  className="text-[20px] font-black"
  icon={faPlus}/>
                </div>
              </div>
 
              <Buttons
                canContinue={skills.length > 0 || customSkills.length > 0}
                onBack={() => setStep(3)}
                onContinue={() => setStep(5)}
              />
            </div>
          )}
 




          {/* ══ STEP 5 ══ */}
          {step === 5 && (
            <div className={info}>
 
              <StepLabel current={5} />
 
              <div className='flex flex-col gap-1'>
                <h1 className={`text-[28px] sm:text-[36px] md:text-[40px] font-bold
                  ${isDark ? 'text-white' : 'text-white'}`}>
                  How much time do you  <p className={one}>have?</p>
                </h1>
                <p className={`italic font-medium text-[13px] sm:text-[15px]
                  ${isDark ? 'text-[#A897FF]' : 'text-white/80'}`}>
                  Karina will adjust the depth and pace of your roadmap to fit your schedule.
                </p>
              </div>
 
              {/* timeline options */}
              <div className='flex flex-col gap-2 sm:gap-3'>
                {timelineOptions.map((opt) => (
                  <div key={opt.id}
                    onClick={() => setTimeline(opt.id)}
                    className='flex items-center justify-between
                      p-3 sm:p-4 rounded-[12px] cursor-pointer
                      transition-all duration-200 hover:scale-[1.01]'
                    style={{
                      border: timeline === opt.id
                        ? isDark ? '1px solid rgba(99,103,255,0.8)' : '1.5px solid #111'
                        : isDark ? '1px solid rgba(255,255,255,0.1)' : '1.5px solid #e5e7eb',
                      background: timeline === opt.id
                        ? isDark ? 'rgba(99,103,255,0.15)' : '#f9fafb'
                        : 'transparent'
                    }}>
                    <div className='flex items-center gap-3'>
                      <span className='text-[20px] sm:text-[24px]'>{opt.emoji}</span>
                      <div>
                        <p className={`font-bold text-[14px] sm:text-[15px]
                          ${isDark ? 'text-white' : 'text-black'}`}>{opt.label}</p>
                        <p className={`text-[11px] sm:text-[13px]
                          ${isDark ? 'text-white/40' : 'text-black/50'}`}>{opt.sub}</p>
                      </div>
                    </div>
                    {/* radio circle */}
                    <div className='w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]
                      rounded-full flex items-center justify-center flex-shrink-0'
                      style={{
                        border: timeline === opt.id
                          ? isDark ? '2px solid #6367FF' : '2px solid #111'
                          : '2px solid #d1d5db',
                        background: timeline === opt.id
                          ? isDark ? '#6367FF' : '#111'
                          : 'transparent'
                      }}>
                      {timeline === opt.id && (
                        <div className='w-[6px] h-[6px] rounded-full bg-white'/>
                      )}
                    </div>
                  </div>
                ))}
              </div>
 
       <Buttons
  canContinue={canContinueStep5}
  onBack={() => setStep(4)}
  onContinue={async () => {
    setStep(6)
    await generateRoadmap()
  }}
  label='Build My Roadmap'
/>
</div>
          )}




          {/* ══ STEP 6 — loading ══ */}
          {step === 6 && (
  <div className={info}>
    <h1 className={`text-[24px] sm:text-[32px] font-bold
      ${isDark ? 'text-white' : 'text-white'}`}>
      Building your <p className={one}>roadmap</p>
    </h1>

    <p className={`text-[15px] sm:text-[20px]
      ${isDark ? 'text-white/50' : 'text-white/80'}`}>
      Karina is personalising everything for {name}...
    </p>

    {loading && <p className="text-white/50 mt-4">Generating...</p>}

    {!loading && roadmapData && (
      <div className="mt-6 text-white text-sm">
        ✅ Roadmap Ready
      </div>
    )}
  </div>
)}
        </div>
 
        {/* ── PROGRESS BAR ── */}
      <div className='absolute bottom-2 left-0 right-0 flex justify-center'>
          <div className='flex justify-center items-center gap-2 sm:gap-3'>
            {[0,1,2,3,4].map((i) => (
              <div key={i} className='h-[4px] sm:h-[5px] rounded-[20px] transition-all duration-300'
                style={{
                  width: i < step ? '32px' : '20px',
                  background: i < step
                    ? isDark ? '#ffffff' : '#6367FF'
                    : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)',
                  boxShadow: i < step && isDark ? '0 0 10px rgba(99,103,255,0.8)' : 'none',
                }}
              />
            ))}
          </div>
        </div>
 
      </div>
    </div>
  )
}
 
export default page