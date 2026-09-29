'use client'
import React, { useState } from 'react'

const page = ({ isDark, accent }) => {
  const accentColor = accent || '#6367FF'
  const [pushEnabled, setPushEnabled] = useState(true)
  const [emailEnabled, setEmailEnabled] = useState(false)

  return (
    <div
      className='min-h-[100dvh] w-full overflow-auto px-4 py-8'
      style={{
        backgroundImage: isDark
          ? `linear-gradient(to right, #25297D, #171A4F, #101236, #070817), radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)`
          : `radial-gradient(circle, rgba(99,104,255,0.95) 1px, transparent 1px)`,
        backgroundSize: isDark ? 'cover, 24px 24px' : '24px 24px',
        backgroundBlendMode: isDark ? 'overlay' : 'normal'
      }}>
      <div className='mx-auto flex w-full max min-h-[80vh] flex-col gap-8 sm:p-10 '>
       

        <div className='grid gap-6 xl:grid-cols-[1.4fr_0.85fr]'>
          <div className='flex flex-col gap-6'>
            <section className='min-h-[320px] rounded-[32px] border border-[#D8DBFF] bg-[#F7F8FF]/90 p-6 shadow-[0_20px_60px_rgba(99,103,255,0.08)]'>
              <div className='flex flex-col gap-3'>
                <h2 className='text-xl font-semibold text-[#10163A]'>Account</h2>
                <p className='text-sm text-slate-500'>Manage your email, password, and profile details.</p>
              </div>
              <div className='mt-6 flex flex-col gap-4'>
                <div className='flex h-[110px] min-h-[110px] items-center justify-between rounded-[26px] border border-[#D0D5FF] bg-white px-5 shadow-sm'>
                  <div>
                    <p className='text-sm font-semibold text-[#121A3A]'>Email address</p>
                    <p className='mt-2 text-sm text-slate-500'>mohnish@gmail.com</p>
                  </div>
                  <button className='h-[44px] rounded-full bg-[#6367FF] px-5 text-sm font-semibold text-white transition hover:bg-[#4B4FD9]'>Edit</button>
                </div>

                <div className='flex h-[110px] min-h-[110px] items-center justify-between rounded-[26px] border border-[#D0D5FF] bg-white px-5 shadow-sm'>
                  <div>
                    <p className='text-sm font-semibold text-[#121A3A]'>Change password</p>
                    <p className='mt-2 text-sm text-slate-500'>Last changed 30 days ago</p>
                  </div>
                  <button className='h-[44px] rounded-full bg-[#6367FF] px-5 text-sm font-semibold text-white transition hover:bg-[#4B4FD9]'>Update</button>
                </div>

                
              </div>
            </section>

            <section className='min-h-[260px] rounded-[32px] border border-[#D8DBFF] bg-[#F7F8FF]/90 p-6 shadow-[0_20px_60px_rgba(99,103,255,0.08)]'>
              <div className='flex flex-col gap-3'>
                <h2 className='text-xl font-semibold text-[#10163A]'>Notifications</h2>
                <p className='text-sm text-slate-500'>Turn reminders and updates on or off.</p>
              </div>
              <div className='mt-6 space-y-4'>
                <div className='flex h-[130px] min-h-[130px] items-center justify-between rounded-[26px] border border-[#D0D5FF] bg-white px-5 shadow-sm'>
                  <div>
                    <p className='text-sm font-semibold text-[#121A3A]'>Push notifications</p>
                    <p className='mt-2 text-sm text-slate-500'>Daily task reminders from Karina</p>
                  </div>
                  <button
                    type='button'
                    onClick={() => setPushEnabled(!pushEnabled)}
                    className={`h-[46px] w-[70px] rounded-full text-sm font-semibold transition ${pushEnabled ? 'bg-[#6367FF] text-white' : 'bg-[#E9EBFF] text-[#4B4FD9]'}`}>
                    {pushEnabled ? 'On' : 'Off'}
                  </button>
                </div>
                <div className='flex h-[130px] min-h-[130px] items-center justify-between rounded-[26px] border border-[#D0D5FF] bg-white px-5 shadow-sm'>
                  <div>
                    <p className='text-sm font-semibold text-[#121A3A]'>Email updates</p>
                    <p className='mt-2 text-sm text-slate-500'>Weekly progress reports</p>
                  </div>
                  <button
                    type='button'
                    onClick={() => setEmailEnabled(!emailEnabled)}
                    className={`h-[46px] w-[70px] rounded-full text-sm font-semibold transition ${emailEnabled ? 'bg-[#6367FF] text-white' : 'bg-[#E9EBFF] text-[#4B4FD9]'}`}>
                    {emailEnabled ? 'On' : 'Off'}
                  </button>
                </div>
              </div>
              
            </section>
          </div>

          <div className='flex flex-col gap-6'>
            <section className='min-h-[400px] rounded-[32px] border border-[#D8DBFF] bg-[#F7F8FF]/90 p-6 shadow-[0_20px_60px_rgba(99,103,255,0.08)]'>
              <div className='flex flex-col gap-3'>
                <h2 className='text-xl font-semibold text-[#10163A]'>App guide</h2>
                <p className='text-sm text-slate-500'>A quick guide to using the app features and navigation.</p>
              </div>
              <div className='mt-6 space-y-4'>
                <div className='flex h-[130px] min-h-[130px] items-center justify-between rounded-[26px] border border-[#D0D5FF] bg-white px-5 shadow-sm'>
                  <div>
                    <p className='text-sm font-semibold text-[#121A3A]'>Push notifications</p>
                    <p className='mt-2 text-sm text-slate-500'>Daily task reminders from Karina</p>
                  </div>
                  <button
                    type='button'
                    onClick={() => setPushEnabled(!pushEnabled)}
                    className={`h-[46px] w-[70px] rounded-full text-sm font-semibold transition ${pushEnabled ? 'bg-[#6367FF] text-white' : 'bg-[#E9EBFF] text-[#4B4FD9]'}`}>
                    {pushEnabled ? 'On' : 'Off'}
                  </button>
                </div>
                <div className='flex h-[130px] min-h-[130px] items-center justify-between rounded-[26px] border border-[#D0D5FF] bg-white px-5 shadow-sm'>
                  <div>
                    <p className='text-sm font-semibold text-[#121A3A]'>Email updates</p>
                    <p className='mt-2 text-sm text-slate-500'>Weekly progress reports</p>
                  </div>
                  <button
                    type='button'
                    onClick={() => setEmailEnabled(!emailEnabled)}
                    className={`h-[46px] w-[70px] rounded-full text-sm font-semibold transition ${emailEnabled ? 'bg-[#6367FF] text-white' : 'bg-[#E9EBFF] text-[#4B4FD9]'}`}>
                    {emailEnabled ? 'On' : 'Off'}
                  </button>
                </div>
              </div>
              
            </section>

            <section className='min-h-[370px] rounded-[32px] border border-[#D8DBFF] bg-[#F7F8FF]/90 p-5 shadow-[0_20px_60px_rgba(99,103,255,0.08)]'>
              <div className='flex flex-col gap-3'>
                <h2 className='text-lg font-semibold text-[#10163A]'>Danger Zone</h2>
                <p className='text-sm text-slate-500'>Sensitive actions are shown here.</p>
              </div>
              <div className='mt-5 space-y-3'>
                <button type='button' className=' h-[100px] min-h-[100px] w-full rounded-[22px] border border-[#D8DBFF] bg-white px-4 py-3 text-left text-sm font-semibold text-[#10163A] shadow-sm transition hover:bg-[#EEF2FF]'>
                  <div>Delete my roadmap</div>
                  <div className='mt-1 text-xs font-normal text-slate-500'>Remove saved roadmaps from your account.</div>
                </button>
                <button type='button' className=' h-[100px] min-h-[100px] w-full rounded-[22px] border border-[#D8DBFF] bg-white px-4 py-3 text-left text-sm font-semibold text-[#10163A] shadow-sm transition hover:bg-[#EEF2FF]'>
                  <div>Delete account</div>
                  <div className='mt-1 text-xs font-normal text-slate-500'>Permanently remove your account and data.</div>
                </button>
              </div>
            </section>
          </div>
        </div>
         <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-center '>
         
          <button
            type='button'
            className='h-[54px] min-w-[160px] rounded-full bg-[#6367FF] px-6 text-sm font-semibold 
            text-white shadow-lg shadow-[#6367FF]/20 transition hover:bg-[#4B4FD9]'>
            Save changes
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default page
