'use client'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'

const getInitials = (fullName) => {
  if (!fullName) return 'NS'
  const parts = fullName.trim().split(' ').filter(Boolean)
  if (parts.length === 0) return 'NS'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// capitalizes the first letter of every word — "mohnish sharma" → "Mohnish Sharma"
const capitalizeWords = (text) => {
  if (!text) return text
  return text
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// builds the education description purely from real saved data — never invents course content
const getEducationSummary = ({ course, college, goalRole }) => {
  if (!course && !college) {
    return 'Add your course and college during onboarding to see this update automatically.'
  }

  const coursePart = course || 'your course'
  const collegePart = college || 'your college'
  const base = `Pursuing ${coursePart} at ${collegePart}`

  return goalRole
    ? `${base}, building the foundation for a career as ${goalRole}.`
    : `${base}, building the skills and foundation for what's next.`
}

const page = ({ isDark, accent }) => {
  const accentColor = accent || '#6367FF'
  const cardBg = isDark ? 'bg-[#10132D]/80 border-[#4D54F0]/40' : 'bg-white border-[#D0D5FF]'

  // ── real onboarding data, pulled from the same localStorage key the dashboard reads ──
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    college: '',
    course: '',
    goalRole: '',
  })

  // ── edit modal state ──
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [draftName, setDraftName] = useState('')
  const [draftAge, setDraftAge] = useState('')
  const [draftCollege, setDraftCollege] = useState('')
  const [draftCourse, setDraftCourse] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('roadmap')
    if (!stored) return
    try {
      const parsed = JSON.parse(stored)
      setProfile({
        name: parsed.name || '',
        age: parsed.age || '',
        college: parsed.college || '',
        course: parsed.course || '',
        goalRole: parsed.careerDestination?.bestRole || '',
      })
    } catch (err) {
      console.error('Could not read saved profile:', err)
    }
  }, [])

  const openEditModal = () => {
    setDraftName(profile.name)
    setDraftAge(profile.age)
    setDraftCollege(profile.college)
    setDraftCourse(profile.course)
    setIsEditOpen(true)
  }

  const closeEditModal = () => setIsEditOpen(false)

  const saveEdits = () => {
    const updatedProfile = {
      ...profile,
      name: capitalizeWords(draftName.trim()),
      age: draftAge.trim(),
      college: draftCollege.trim(),
      course: draftCourse.trim(),
    }

    // merge into the existing saved roadmap object so we don't lose roadmap/skills data
    try {
      const stored = localStorage.getItem('roadmap')
      const parsed = stored ? JSON.parse(stored) : {}
      const merged = {
        ...parsed,
        name: updatedProfile.name,
        age: updatedProfile.age,
        college: updatedProfile.college,
        course: updatedProfile.course,
      }
      localStorage.setItem('roadmap', JSON.stringify(merged))
    } catch (err) {
      console.error('Could not save profile edits:', err)
    }

    setProfile(updatedProfile)
    setIsEditOpen(false)
  }

  const displayName = profile.name ? capitalizeWords(profile.name) : 'Your Name'
  const displayAge = profile.age ? `Age ${profile.age}` : 'Age —'
  const displayEducation = profile.college
    ? `${profile.college}${profile.course ? ' · ' + profile.course : ''}`
    : 'Add your education in onboarding'
  const educationSummary = getEducationSummary(profile)

  // shared input styling for the modal
  const modalInputClass = `h-[44px] w-full rounded-[12px] px-4 text-[14px] font-medium outline-none transition-all
    ${isDark
      ? 'bg-white/5 border border-[#6367FF]/30 text-white placeholder:text-white/30 focus:border-[#6367FF]/80'
      : 'bg-[#F8F9FF] border border-[#D0D5FF] text-black placeholder:text-gray-400 focus:border-[#6367FF]/60'
    }`

  return (
    <div
      className='h-full w-full flex flex-col justify-center items-center overflow-hidden gap-15'
      style={{
        backgroundImage: isDark
          ? `linear-gradient(to right, #25297D, #171A4F, #101236, #070817), 
          radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)`
          : `radial-gradient(circle, rgba(99,104,255,0.95) 1px, transparent 1px)`,
        backgroundSize: isDark ? 'cover, 24px 24px' : '24px 24px',
        backgroundBlendMode: isDark ? 'overlay' : 'normal'
      }}
    >
  <div className='mx-auto flex w-full max-w-[1800px] flex-col gap-10 '>
        <div className={`rounded-[28px] border px-6 py-6 shadow-[0_24px_80px_rgba(99,103,255,0.12)] ${cardBg}`}>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex items-center gap-5'>
              <div className='relative flex h-[96px] w-[96px] items-center justify-center rounded-[24px] bg-[#6367FF] text-[32px] font-extrabold text-white shadow-lg shadow-[#6367FF]/30'>
                {getInitials(profile.name)}
              </div>
              <div className='min-w-0'>
                <p className='text-[28px] font-semibold sm:text-[32px]'>{displayName}</p>
             <p className='mt-1 text-sm font-medium' style={{
    color: isDark ? '#C7D2FE' : '#4B5563' }}> {displayEducation} </p>
                <div className='mt-4 flex flex-wrap items-center gap-3'>
                  <span className='rounded-full bg-[#E9E9FF] px-3 py-1 text-sm font-semibold text-[#3730A3]'>{displayAge}</span>
                </div>
              </div>
            </div>

            <button
              type='button'
              onClick={openEditModal}
              className='inline-flex h-[52px] w-[52px] items-center justify-center rounded-[18px] border border-[#6367FF]/25 bg-white text-[#3730A3] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
            >
              <FontAwesomeIcon icon={faPencil} size='lg' />
            </button>
          </div>
        </div>

        <div className='grid gap-5 md:grid-cols-2'>
          <div className={`rounded-[28px] border p-6 shadow-[0_22px_55px_rgba(99,103,255,0.12)] ${cardBg}`}>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-[#6B7280]'>Roadmaps Created</p>
            <div className='mt-5'>
            <div className='flex items-end gap-4'>
              <p className='text-[46px] font-bold' style={{ color: accentColor }}>3</p>
              <span className='rounded-full bg-[#EEF2FF] px-3 py-1 text-sm font-semibold text-[#4338CA]'>+1 this week</span>
            </div>
            <div className='mt-4 h-[10px] w-full overflow-hidden rounded-full bg-[#E0E7FF]'>
              <div className='h-full rounded-full bg-[#6367FF]' style={{ width: '55%' }} />
            </div>
          </div>
          </div>

          <div className={`rounded-[28px] border p-6 shadow-[0_22px_55px_rgba(99,103,255,0.12)] ${cardBg}`}>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-[#6B7280]'>Skills Added</p>
            <div className='mt-5'>
              <div className='flex items-end gap-4'>
                <p className='text-[46px] font-bold' style={{ color: accentColor }}>8</p>
                <span className='rounded-full bg-[#EEF2FF] px-3 py-1 text-sm font-semibold text-[#4338CA]'>5 unique skills</span>
              </div>
              <div className='mt-4 h-[10px] w-full overflow-hidden rounded-full bg-[#E0E7FF]'>
                <div className='h-full rounded-full bg-[#6367FF]' style={{ width: '80%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className={` rounded-[28px] border p-7 shadow-[0_22px_55px_rgba(99,103,255,0.12)] ${cardBg}`}>
          <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between '>
            <div>
              <p className='text-lg font-semibold '>Education</p>
              <p className='mt-2 max-w-[720px] text-sm leading-6 text-[#4B5563] '>
                {educationSummary}
              </p>
            </div>
            <span className='rounded-full bg-[#EDE9FE] px-4 py-2 text-sm font-semibold text-[#4338CA]'>
              {profile.college || 'College'}
            </span>
          </div>
        </div>

        <div className={`rounded-[28px] border p-6 shadow-[0_22px_55px_rgba(99,103,255,0.12)] ${cardBg}`}>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-lg font-semibold'>Skills · Most used first</p>
              <p className='mt-2 text-sm text-[#6B7280]'>Skills are ordered by usage and recent activity.</p>
            </div>
            <span className='rounded-full bg-[#E9E9FF] px-3 py-1 text-sm font-semibold text-[#3730A3]'>6 total</span>
          </div>

          <div className='mt-5 flex flex-wrap gap-3'>
            <span className='rounded-full bg-[#EEF2FF] px-4 py-2 text-sm font-semibold text-[#3730A3]'>React x3</span>
            <span className='rounded-full bg-[#EEF2FF] px-4 py-2 text-sm font-semibold text-[#3730A3]'>Python x2</span>
            <span className='rounded-full bg-[#F8FAFC] px-4 py-2 text-sm font-semibold text-[#334155]'>Excel</span>
            <span className='rounded-full bg-[#F8FAFC] px-4 py-2 text-sm font-semibold text-[#334155]'>Figma</span>
            <span className='rounded-full bg-[#F8FAFC] px-4 py-2 text-sm font-semibold text-[#334155]'>Java</span>
            <span className='rounded-full bg-[#F8FAFC] px-4 py-2 text-sm font-semibold text-[#334155]'>Machine Learning</span>
          </div>
        </div>
      </div>

      {/* ══════════ EDIT PROFILE MODAL ══════════ */}
      {isEditOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center px-4'
          style={{ background: 'rgba(8,9,30,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={closeEditModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-[460px] rounded-[24px] border p-6 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)]
              ${isDark ? 'bg-[#10132D] border-[#4D54F0]/40' : 'bg-white border-[#D0D5FF]'}`}
          >
            {/* header */}
            <div className='flex items-center justify-between'>
              <p className={`text-[20px] font-semibold ${isDark ? 'text-white' : 'text-[#111]'}`}>
                Edit Profile
              </p>
              <button
                onClick={closeEditModal}
                className={`flex h-[34px] w-[34px] items-center justify-center rounded-full transition
                  ${isDark ? 'text-white/60 hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <p className={`mt-1 text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              Update your name, age, and education.
            </p>

            {/* fields */}
            <div className='mt-6 flex flex-col gap-4'>
              <div className='flex flex-col gap-1.5'>
                <span className={`text-[13px] font-semibold ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                  Name
                </span>
                <input
                  type='text'
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder='e.g. Karina '
                  className={modalInputClass}
                />
              </div>

              <div className='flex flex-col gap-1.5'>
                <span className={`text-[13px] font-semibold ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                  Age
                </span>
                <input
                  type='number'
                  value={draftAge}
                  onChange={(e) => setDraftAge(e.target.value)}
                  placeholder='e.g. 21'
                  className={modalInputClass}
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1.5'>
                  <span className={`text-[13px] font-semibold ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                    College / University
                  </span>
                  <input
                    type='text'
                    value={draftCollege}
                    onChange={(e) => setDraftCollege(e.target.value)}
                    placeholder='e.g. Lucknow University'
                    className={modalInputClass}
                  />
                </div>

                <div className='flex flex-col gap-1.5'>
                  <span className={`text-[13px] font-semibold ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                    Course
                  </span>
                  <input
                    type='text'
                    value={draftCourse}
                    onChange={(e) => setDraftCourse(e.target.value)}
                    placeholder='e.g. BBA'
                    className={modalInputClass}
                  />
                </div>
              </div>
            </div>

            {/* actions */}
            <div className='mt-7 flex gap-3'>
              <button
                onClick={closeEditModal}
                className={`h-[46px] flex-1 rounded-[12px] font-semibold text-[14px] transition
                  ${isDark
                    ? 'border border-white/15 text-white hover:bg-white/5'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Cancel
              </button>
              <button
                onClick={saveEdits}
                className='h-[46px] flex-1 rounded-[12px] font-semibold text-[14px] text-white transition hover:opacity-90'
                style={{ background: accentColor }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default page