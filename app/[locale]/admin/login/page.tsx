'use client'

import { useState } from 'react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // 👈 مهم جداً
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
        localStorage.setItem('is_admin', 'true')
      window.location.href = '/admin' // reload الصفحة مع الكوكي
    } else {
      setError(data.message || 'Login failed')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-center">Admin Login</h1>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded" required />

      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded" required />

      <button type="submit" disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
