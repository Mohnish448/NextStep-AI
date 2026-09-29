'use client'
import { useEffect, useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useRouter } from 'next/navigation'

const THEMES = [
  { label: 'Purple', primary: '#6367FF', secondary: '#a78bfa', light: '#f0f0ff', lightText: '#4b4fcc', bg: '#f8f8ff' },
  { label: 'Blue',   primary: '#7AE2CF', secondary: '#60a5fa', light: '#eff6ff', lightText: '#1d4ed8', bg: '#f8f8ff' },
  { label: 'Green',  primary: '#4B5694', secondary: '#4B5694', light: '#f0fdf4', lightText: '#15803d', bg: '#f8f8ff' },
  { label: 'Rose',   primary: '#e11d48', secondary: '#fb7185', light: '#fff1f2', lightText: '#be123c', bg: '#f8f8ff' },
  { label: 'Orange', primary: '#111844', secondary: '#111844', light: '#fff7ed', lightText: '#c2410c', bg: '#f8f8ff' },
  { label: 'B&W',    primary: '#111111', secondary: '#555555', light: '#f3f3f3', lightText: '#333333', bg: '#ffffff', grayscale: true },
]

const Page = () => {
  const router = useRouter()
  const page1Ref = useRef(null)
  const page2Ref = useRef(null)

  const [roadmapData, setRoadmapData] = useState([])
  const [careerData, setCareerData] = useState(null)
  const [theme, setTheme] = useState(THEMES[0])

  useEffect(() => {
    const stored = localStorage.getItem("roadmap")
    if (!stored) return
    const parsed = JSON.parse(stored)
    setRoadmapData(parsed.roadmap || [])
    setCareerData(parsed.careerDestination || null)
  }, [])

  const handleDownload = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = 210

    const canvas1 = await html2canvas(page1Ref.current, { scale: 2, useCORS: true, backgroundColor: theme.bg })
    const img1 = canvas1.toDataURL('image/png')
    const imgHeight1 = (canvas1.height * pageWidth) / canvas1.width
    pdf.addImage(img1, 'PNG', 0, 0, pageWidth, imgHeight1)

    pdf.addPage()

    const canvas2 = await html2canvas(page2Ref.current, { scale: 2, useCORS: true, backgroundColor: theme.bg })
    const img2 = canvas2.toDataURL('image/png')
    const imgHeight2 = (canvas2.height * pageWidth) / canvas2.width
    pdf.addImage(img2, 'PNG', 0, 0, pageWidth, imgHeight2)

    pdf.save(`${careerData?.bestRole || 'Career'}-Roadmap.pdf`)
  }

  const firstHalf = roadmapData.slice(0, 3)
  const secondHalf = roadmapData.slice(3, 6)

  const PhaseCard = ({ phase }) => (
    <div style={{ marginBottom: '32px' }}>

      {/* header strip */}
      <div style={{
        background: theme.grayscale
          ? '#222'
          : `linear-gradient(90deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        padding: '12px 20px',
        borderRadius: '10px 10px 0 0',
      }}>
        <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600, opacity: 0.85 }}>
          {String(phase.id).padStart(2, '0')} &nbsp;·&nbsp;
        </span>
        <span style={{ color: '#fff', fontSize: '16px', fontWeight: 700 }}>
          {phase.title}
        </span>
      </div>

      {/* body */}
      <div style={{ padding: '16px 20px 4px 20px', background: '#fff', borderRadius: '0 0 10px 10px' }}>

        <div style={{
          background: theme.light,
          borderRadius: '8px',
          padding: '8px 14px',
          marginBottom: '10px',
          fontSize: '13px',
          color: theme.lightText
        }}>
          <strong>Outcome:</strong> {phase.outcome}
        </div>

        <div style={{ fontSize: '13px', color: '#444', marginBottom: '12px', lineHeight: '1.6' }}>
          <strong style={{ color: '#111' }}>Description:</strong> {phase.description}
        </div>

        <div style={{ marginBottom: '10px' }}>
          {phase.tasks?.map((task, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start',
              gap: '8px', marginBottom: '5px',
              fontSize: '13px', color: '#333'
            }}>
              <span style={{ color: theme.primary, fontSize: '16px', lineHeight: '1.2', flexShrink: 0 }}>•</span>
              {task}
            </div>
          ))}
        </div>

        <div style={{ fontSize: '13px', color: theme.primary, fontWeight: 600, marginBottom: '12px' }}>
          Duration: {phase.duration}
        </div>

      </div>
    </div>
  )

  const PageTitle = ({ pageNum }) => (
    <div style={{ marginBottom: '28px', borderBottom: `3px solid ${theme.primary}`, paddingBottom: '12px' }}>
      <div style={{ fontSize: '26px', fontWeight: 800, color: theme.primary }}>
        {careerData?.bestRole} Roadmap
      </div>
      <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>Page {pageNum} of 2</div>
    </div>
  )

  return (
    <div className='min-h-screen flex flex-col items-center justify-start gap-8 py-12 bg-gray-100'>

      {/* top UI */}
      <div className='w-full flex-col flex items-center justify-center gap-4 pt-4'>

        <p className='font-medium text-[22px] italic text-[#4B5694] text-center px-4'>
          Your career plan has been successfully generated. Download the PDF to keep it with you.
        </p>

        {/* color picker */}
        <div className='flex items-center gap-2 flex-wrap justify-center'>
          <span className='text-[13px] font-semibold text-gray-500 mr-1'>Theme:</span>
          {THEMES.map((t) => (
            <button
              key={t.label}
              onClick={() => setTheme(t)}
              title={t.label}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: t.grayscale ? 'linear-gradient(135deg, #000 50%, #fff 50%)' : t.primary,
                border: theme.label === t.label ? '3px solid #000' : '3px solid transparent',
                cursor: 'pointer',
                outline: theme.label === t.label ? '2px solid #fff' : 'none',
                boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                transition: 'transform 0.15s',
                transform: theme.label === t.label ? 'scale(1.18)' : 'scale(1)'
              }}
            />
          ))}
          <span className='text-[12px] text-gray-400 ml-1'>— {theme.label}</span>
        </div>

        {/* buttons */}
        <div className='flex justify-center items-center gap-4'>
          <button
            onClick={() => router.back()}
            className='bg-blue-500 hover:bg-blue-700 hover:scale-105 transition transform text-white font-bold py-2 px-4 rounded-[10px] border-2 border-black'>
            Go Back
          </button>
          <button
            onClick={handleDownload}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px] border-2 border-black hover:scale-105 transition transform'>
            Download PDF
          </button>
        </div>
      </div>

      {/* PAGE 1 */}
      <div ref={page1Ref} style={{ background: theme.bg, width: '900px', padding: '40px' }}>
        <PageTitle pageNum={1} />
        {firstHalf.map((phase) => <PhaseCard key={phase.id} phase={phase} />)}
      </div>

      {/* PAGE 2 */}
      <div ref={page2Ref} style={{ background: theme.bg, width: '900px', padding: '40px', marginTop: '40px' }}>
        <PageTitle pageNum={2} />
        {secondHalf.map((phase) => <PhaseCard key={phase.id} phase={phase} />)}
      </div>

    </div>
  )
}

export default Page