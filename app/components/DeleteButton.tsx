'use client';

import { useState } from 'react';
import { deleteStudent } from '@/app/actions/studentActions';

interface DeleteButtonProps {
  studentId: number;
  studentName: string;
}

export default function DeleteButton({ studentId, studentName }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`คุณต้องการลบข้อมูลของ ${studentName} ใช่หรือไม่?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteStudent(studentId);
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('เกิดข้อผิดพลาดในการลบข้อมูล');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-1 rounded text-sm transition duration-200"
    >
      {isDeleting ? 'กำลังลบ...' : 'ลบ'}
    </button>
  );
}