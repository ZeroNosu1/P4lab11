import Link from "next/link";
import { getStudents } from "@/app/actions/studentActions";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function StudentList() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role || "user"; // ถ้าไม่มี session จะถือว่าเป็น user

  const students = await getStudents();

  if (students.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>ยังไม่มีข้อมูลนักเรียน</p>
        {/* ✅ ให้ทั้ง admin และ user เห็นปุ่มเพิ่ม */}
        <Link
          href="/add"
          className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
        >
          เพิ่มนักเรียนคนแรก
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          รายชื่อนักเรียน ({students.length} คน)
        </h2>

        {/* ✅ ให้ทั้ง admin และ user เห็นปุ่มเพิ่ม */}
        <Link
          href="/add"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200"
        >
          เพิ่มนักเรียนใหม่
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg shadow-md p-4 border"
          >
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {student.firstName} {student.lastName}
              </h3>
              <p className="text-sm text-gray-600">{student.faculty}</p>
              <p className="text-sm text-gray-600">{student.major}</p>
            </div>

            <div className="mb-3 text-sm text-gray-700">
              <p>
                <span className="font-medium">อีเมล:</span> {student.email}
              </p>
              <p>
                <span className="font-medium">เบอร์:</span> {student.phone}
              </p>
            </div>

            <div className="text-xs text-gray-500 mb-3">
              <p>
                สมัครเมื่อ:{" "}
                {new Date(student.createdAt).toLocaleDateString("th-TH")}
              </p>
            </div>

            <div className="flex gap-2">
              {/* ✅ ปุ่มแก้ไข → ให้ user และ admin เห็น */}
              <Link
                href={`/edit/${student.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition duration-200"
              >
                แก้ไข
              </Link>

              {/* ✅ ปุ่มลบ → เฉพาะ admin เท่านั้น */}
              {role === "admin" && (
                <DeleteButton
                  studentId={student.id}
                  studentName={`${student.firstName} ${student.lastName}`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
