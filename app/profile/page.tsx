'use client'

import { useState } from 'react'

export default function ProfilePage() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [msg, setMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.newPassword !== form.confirmPassword) {
      setMsg('รหัสผ่านใหม่ไม่ตรงกัน')
      return
    }

    const res = await fetch('/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setMsg(data.message || 'สำเร็จ')
    setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Profile / Change Password</h1>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Change Password</button>
      </form>
      {msg && <p className="mt-2">{msg}</p>}
    </main>
  )
}
