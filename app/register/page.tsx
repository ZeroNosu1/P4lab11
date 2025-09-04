'use client'

import { useState } from 'react'

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [msg, setMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      setMsg(data.error || 'สมัครสมาชิกสำเร็จ! ลองไปล็อกอิน')
      if (!data.error) setForm({ username: '', password: '' })
    } catch {
      setMsg('เกิดข้อผิดพลาดในการสมัครสมาชิก')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
          >
            Register
          </button>
        </form>

        {msg && <p className="mt-4 text-center text-red-600">{msg}</p>}

        <div className="mt-6 text-center text-sm text-gray-600">
          มีบัญชีแล้ว?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            ไปหน้า Login
          </a>
        </div>
      </div>
    </main>
  )
}
