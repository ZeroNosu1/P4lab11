import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) {
      return NextResponse.json({ error: 'กรอกข้อมูลไม่ครบ' }, { status: 400 })
    }

    const exists = await prisma.user.findUnique({ where: { username } })
    if (exists) {
      return NextResponse.json({ error: 'username นี้ถูกใช้แล้ว' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { username, password: hashed },
      select: { id: true, username: true, role: true },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
