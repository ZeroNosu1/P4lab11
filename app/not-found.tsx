import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600 mb-6">ไม่พบข้อมูลที่คุณต้องการ</p>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition duration-200"
        >
          กลับไปหน้าหลัก
        </Link>
      </div>
    </main>
  );
}