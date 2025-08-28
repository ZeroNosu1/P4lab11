import AdmissionForm from '@/app/components/AdmissionForm';
import { getStudentById } from '@/app/actions/studentActions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface EditStudentPageProps {
  params: {
    id: string;
  };
}

export default async function EditStudentPage({ params }: EditStudentPageProps) {
  const studentId = parseInt(params.id);
  const student = await getStudentById(studentId);

  if (!student) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-emerald-50 text-gray-800 relative overflow-hidden py-8">
      {/* Background ลายโรงเรียน */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_98%,rgba(0,0,0,0.03)_99%),linear-gradient(90deg,transparent_98%,rgba(0,0,0,0.03)_99%)] bg-[size:50px_50px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-block text-blue-600 hover:text-blue-800 font-medium bg-blue-50/50 px-3 py-1 rounded shadow-sm hover:shadow-md transition"
          >
            ← กลับไปหน้าหลัก
          </Link>
        </div>

        <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-blue-100">
          <AdmissionForm student={student} isEdit={true} />
        </div>

        {/* footer เพิ่มเติม */}
        <div className="text-center text-sm text-gray-500 mt-8">
          📚 โรงเรียนตัวอย่าง — Academic Year 2025
        </div>
      </div>
    </main>
  );
}
