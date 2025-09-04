import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const users = await prisma.user.findMany({
    select: { id: true, username: true, role: true }
  })

  return NextResponse.json({ users })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { id, role }: { id: string, role: "user" | "admin" } = await req.json()
  if (!id || !role) return NextResponse.json({ message: 'ข้อมูลไม่ครบ' }, { status: 400 })

  await prisma.user.update({ where: { id }, data: { role } })
  return NextResponse.json({ message: 'เปลี่ยน role สำเร็จ' })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ message: 'ID ไม่ถูกต้อง' }, { status: 400 })

  await prisma.user.delete({ where: { id } })
  return NextResponse.json({ message: 'ลบผู้ใช้สำเร็จ' })
}
