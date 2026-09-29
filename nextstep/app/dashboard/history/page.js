'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const HistoryPage = ({ isDark, accent }) => {
  const router = useRouter()
  const [historyItems, setHistoryItems] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('roadmapHistory')
    if (!stored) return

    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        setHistoryItems(parsed)
      }
    } catch (err) {
      console.error('Failed to parse roadmapHistory', err)
    }
  }, [])

  const handleOpen = (item) => {
    localStorage.setItem('roadmap', JSON.stringify(item.data))
    router.push('/dashboard')
  }

  return (
    <div
      className='min-h-[100dvh] w-full overflow-auto py-6'
      style={{
        backgroundImage: isDark
          ? `linear-gradient(to right, #25297D, #171A4F, #101236, #070817), radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)`
          : `radial-gradient(circle, rgba(99,104,255,0.95) 1px, transparent 1px)`,
        backgroundSize: isDark ? 'cover, 24px 24px' : '24px 24px',
        backgroundBlendMode: isDark ? 'overlay' : 'normal'
      }}
    >
      <div className='mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4'>
        {historyItems.length > 0 ? (
          historyItems.map((item) => (
            <button
              key={item.id}
              type='button'
              onClick={() => handleOpen(item)}
              className={`w-full rounded-[26px] border p-5 text-left transition-all duration-200 hover:-translate-y-1 ${isDark ? 'border-[#6367FF]/20 bg-[#07081B]/90 text-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]' : 'border-[#6367FF]/20 bg-white shadow-[0_15px_30px_rgba(99,103,255,0.12)]'}`}
            >
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                  <p className='text-sm uppercase tracking-[0.22em] text-[#6367FF] opacity-90'>Saved roadmap</p>
                  <div className='mt-2 flex items-center gap-3'>
                    <h2 className='text-xl font-semibold'>{item.title}</h2>
                    {item.count > 1 && (
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${isDark ? 'bg-[#6367FF]/20 text-white' : 'bg-[#6367FF]/10 text-[#471396]'}`}>
                        {item.count}x
                      </span>
                    )}
                  </div>
                </div>
                <div className='text-sm opacity-70'>{new Date(item.savedAt).toLocaleString()}</div>
              </div>
              <p className='mt-3 text-sm opacity-80'>Tap to open this roadmap in the dashboard.</p>
            </button>
          ))
        ) : (
          <div className={`rounded-[24px] border p-8 text-center ${isDark ? 'border-[#6367FF]/20 bg-[#07081B]/80 text-white' : 'border-[#6367FF]/20 bg-white/90 text-[#111]'}`}>
            <p className='text-lg font-semibold'>No saved roadmaps yet.</p>
            <p className='mt-2 text-sm opacity-80'>Generate a roadmap first, then it will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryPage