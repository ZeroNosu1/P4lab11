import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const { currentPassword, newPassword } = await req.json()
    const user = await prisma.user.findUnique({ where: { id: token.id as string } })
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

    const valid = await bcrypt.compare(currentPassword, user.password)
    if (!valid) return NextResponse.json({ message: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' }, { status: 400 })

    const hashed = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } })

    return NextResponse.json({ message: 'เปลี่ยนรหัสผ่านสำเร็จ' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
