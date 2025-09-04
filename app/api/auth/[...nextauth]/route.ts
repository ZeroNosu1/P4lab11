// /app/api/login/route.ts
import NextAuth, { NextAuthOptions, Session, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import type { JWT } from 'next-auth/jwt'
import { PrismaAdapter } from "@next-auth/prisma-adapter"

// เพิ่ม type สำหรับ user
type UserWithRole = User & { role: string; id: string }

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  adapter:PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        })
        if (!user) return null
        const ok = await bcrypt.compare(credentials.password, user.password)
        if (!ok) return null
        return { id: user.id, username: user.username, role: user.role } as UserWithRole
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: UserWithRole }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...(session.user || {}),
        id: token.id as string,
        username: token.username as string,
        role: token.role as string,
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }