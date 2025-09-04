'use client'
import { useEffect, useState } from 'react'

type User = { id: string; username: string; role: "user" | "admin" }

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState<string>('')

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users', { credentials: 'include' })
      if (!res.ok) throw new Error('โหลดข้อมูลล้มเหลว')
      const data = await res.json()
      setUsers(data.users ?? [])
    } catch {
      setMessage('โหลดข้อมูลผู้ใช้ล้มเหลว')
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const changeRole = async (id: string, role: "user" | "admin") => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, role }),
      })
      const data = await res.json()
      setMessage(data.message)
      fetchUsers()
    } catch {
      setMessage('เปลี่ยน role ล้มเหลว')
    }
  }

  const deleteUser = async (id: string) => {
    if (!confirm('คุณต้องการลบผู้ใช้นี้ใช่หรือไม่?')) return
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      setMessage(data.message)
      fetchUsers()
    } catch {
      setMessage('ลบผู้ใช้ล้มเหลว')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">จัดการผู้ใช้</h1>
      {message && <p className="text-red-600 mb-4">{message}</p>}
      <table className="w-full table-auto border-collapse">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? users.map(u => (
            <tr key={u.id} className="even:bg-gray-100">
              <td className="border px-4 py-2">{u.username}</td>
              <td className="border px-4 py-2">
                <select
                  value={u.role}
                  onChange={e => changeRole(u.id, e.target.value as "user" | "admin")}
                  className={`px-2 py-1 rounded ${u.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-white hover:bg-red-100 text-red-600 hover:text-red-800 border border-red-600 px-4 py-1 rounded transition"
                >
                  ลบ
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td className="border px-4 py-2 text-center" colSpan={3}>ไม่มีผู้ใช้</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
