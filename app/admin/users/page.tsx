import { prisma } from '@/lib/prisma'

export const revalidate = 0 // ให้ fetch ใหม่ทุกครั้ง

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin / Manage Users</h1>
      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border p-2">Username</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2 space-x-2">
                <form action={`/api/admin/change-role`} method="POST" className="inline">
                  <input type="hidden" name="userId" value={user.id} />
                  <select name="role" defaultValue={user.role} className="border p-1 rounded">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button type="submit" className="px-2 py-1 bg-yellow-500 text-white rounded">Change Role</button>
                </form>
                <form action={`/api/admin/delete-user`} method="POST" className="inline">
                  <input type="hidden" name="userId" value={user.id} />
                  <button type="submit" className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
