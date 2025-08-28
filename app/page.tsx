import StudentList from './components/StudentList';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-emerald-50 text-gray-800 relative overflow-hidden">
      {/* Background ลายโรงเรียน */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_98%,rgba(0,0,0,0.03)_99%),linear-gradient(90deg,transparent_98%,rgba(0,0,0,0.03)_99%)] bg-[size:50px_50px]"></div>

      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm">
            🏫 ระบบรับสมัครนักเรียน
          </h1>
          <p className="text-gray-600 text-lg mt-2 font-medium">
            จัดการข้อมูลการสมัครเรียนอย่างง่ายดาย เหมือนห้องเรียนออนไลน์
          </p>
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-blue-100">
          <StudentList />
        </div>

        {/* footer เพิ่มเติม */}
        <div className="text-center text-sm text-gray-500 mt-8">
          📚 โรงเรียนตัวอย่าง — Academic Year 2025
        </div>
      </div>
    </main>
  );
}
