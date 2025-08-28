'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export type StudentFormData = {
  firstName: string;
  lastName: string;
  major: string;
  faculty: string;
  email: string;
  phone: string;
};

export async function createStudent(formData: FormData) {
  try {
    const data: StudentFormData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      major: formData.get('major') as string,
      faculty: formData.get('faculty') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    await prisma.student.create({
      data,
    });

    revalidatePath('/');
    redirect('/');
  } catch (error) {
    console.error('Error creating student:', error);
    // throw new Error('Failed to create student');
  }
}

export async function updateStudent(id: number, formData: FormData) {
  try {
    const data: StudentFormData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      major: formData.get('major') as string,
      faculty: formData.get('faculty') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    await prisma.student.update({
      where: { id },
      data,
    });

    revalidatePath('/');
    redirect('/');
  } catch (error) {
    console.error('Error updating student:', error);
    throw new Error('Failed to update student');
  }
}

export async function deleteStudent(id: number) {
  try {
    await prisma.student.delete({
      where: { id },
    });

    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error('Failed to delete student');
  }
}

export async function getStudents() {
  try {
    return await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}

export async function getStudentById(id: number) {
  try {
    return await prisma.student.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    return null;
  }
}