'use client'

import { useState } from 'react'

interface User {
  id: string
  username: string
  role: string
  createdAt: string
}

interface Props {
  users: User[]
}

export default function AdminTable({ users: initialUsers }: Props) {
  const [users, setUsers] = useState(initialUsers)

  const changeRole = async (id: string, newRole: string) => {
    const res = await fetch('/api/admin/change-role', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, role: newRole }),
    })
    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u))
    } else {
      alert('เปลี่ยน role ไม่สำเร็จ')
    }
  }

  const deleteUser = async (id: string) => {
    if (!confirm('ลบผู้ใช้นี้จริงหรือไม่?')) return
    const res = await fetch('/api/admin/delete-user', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      setUsers(prev => prev.filter(u => u.id !== id))
    } else {
      alert('ลบผู้ใช้ไม่สำเร็จ')
    }
  }

  return (
    <table className="table-auto border-collapse border border-gray-300 mt-4">
      <thead>
        <tr>
          <th className="border px-2 py-1">Username</th>
          <th className="border px-2 py-1">Role</th>
          <th className="border px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td className="border px-2 py-1">{u.username}</td>
            <td className="border px-2 py-1">{u.role}</td>
            <td className="border px-2 py-1 space-x-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => changeRole(u.id, u.role === 'user' ? 'admin' : 'user')}
              >
                {u.role === 'user' ? 'Promote to Admin' : 'Demote to User'}
              </button>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => deleteUser(u.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
