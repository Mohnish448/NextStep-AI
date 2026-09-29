'use client'
import { useState, useEffect } from 'react'

const THEMES = [
  {
    name: 'purple',
    accent: '#6367FF',
  },
  {
    name: 'dark',
    accent: '#6367FF',
  },
  {
    name: 'white',
    accent: '#6367FF',
  },
]
export function useTheme() {
  const [themeIndex, setThemeIndex] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('themeIndex')
    if (saved !== null) setThemeIndex(Number(saved))
  }, [])

  const toggleDark = () => {
    setThemeIndex(prev => {
      const next = (prev + 1) % THEMES.length
      localStorage.setItem('themeIndex', String(next))
      return next
    })
  }

  const current = THEMES[themeIndex]

 return {
  theme: current.name,
  accent: current.accent,
  isDark: current.name === 'dark',
  isPurple: current.name === 'purple',
  toggleDark,
  togglePurple: toggleDark,
}
}