'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type ThemeContextType = { 
  theme: string; 
  toggleTheme: () => void;
  mounted: boolean; // إضافة حالة للتأكد من تحميل الكومبوننت
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  // التحقق من الثيم المحفوظ عند تحميل الكومبوننت
  useEffect(() => {
    // التأكد من أننا في المتصفح
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light'
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
    setMounted(true)
  }, [])

  // تطبيق التغييرات على الـ DOM عند تغيير الثيم
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark')
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export default useTheme