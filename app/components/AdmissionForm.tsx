'use client';

import { useState } from 'react';
import { createStudent, updateStudent, type StudentFormData } from '@/app/actions/studentActions';

interface AdmissionFormProps {
  student?: {
    id: number;
    firstName: string;
    lastName: string;
    major: string;
    faculty: string;
    email: string;
    phone: string;
  } | null;
  isEdit?: boolean;
}

export default function AdmissionForm({ student, isEdit = false }: AdmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (isEdit && student) {
        await updateStudent(student.id, formData);
      } else {
        await createStudent(formData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faculties = [
    'วิศวกรรมศาสตร์',
    'วิทยาศาสตร์',
    'ครุศาสตร์',
    'มนุษยศาสตร์และสังคมศาสตร์',
    'แพทยศาสตร์',
    'เภสัชศาสตร์',
    'ทันตแพทยศาสตร์',
    'พยาบาลศาสตร์',
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
        {isEdit ? 'แก้ไขข้อมูลนักเรียน' : 'ระบบรับสมัครนักเรียน'}
      </h2>
      
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            ชื่อ *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={student?.firstName || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="กรุณากรอกชื่อ"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            นามสกุล *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={student?.lastName || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="กรุณากรอกนามสกุล"
          />
        </div>

        <div>
          <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">
            คณะ *
          </label>
          <select
            id="faculty"
            name="faculty"
            defaultValue={student?.faculty || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">เลือกคณะ</option>
            {faculties.map((faculty) => (
              <option key={faculty} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
            สาขาวิชา *
          </label>
          <input
            type="text"
            id="major"
            name="major"
            defaultValue={student?.major || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="เช่น วิศวกรรมคอมพิวเตอร์"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            อีเมล *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={student?.email || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            เบอร์โทรศัพท์ *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            defaultValue={student?.phone || ''}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0xx-xxx-xxxx"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          {isSubmitting ? 'กำลังบันทึก...' : isEdit ? 'อัปเดตข้อมูล' : 'สมัครเรียน'}
        </button>
      </form>
    </div>
  );
}