// app/page.tsx
import StudentList from './components/StudentList'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Link from 'next/link'
import LogoutButton from './components/LogoutButton'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-emerald-50 text-gray-800 relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm">
            🏫 ระบบรับสมัครนักเรียน
          </h1>
        </div>

        {/* ถ้า login แล้ว แสดงชื่อ + Logout + Profile */}
        {session ? (
          <div className="flex justify-end mb-4 space-x-4 items-center">
            <span>สวัสดี, {session.user?.username}</span>
            
            {/* ปุ่มไปหน้า Profile */}
            <Link
              href="/profile"
              className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              👤 Profile
            </Link>

            <LogoutButton />
          </div>
        ) : (
          <p className="text-center mb-4">
            ❌ คุณยังไม่ได้เข้าสู่ระบบ
          </p>
        )}

        {/* ปุ่ม Admin */}
        {session?.user?.role === 'admin' && (
          <div className="text-center mb-6">
            <Link
              href="/admin"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              🛠 จัดการผู้ใช้ (Admin)
            </Link>
          </div>
        )}

        <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-blue-100">
          <StudentList />
        </div>
      </div>
    </main>
  )
}
