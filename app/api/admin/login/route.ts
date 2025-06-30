import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing credentials' }, { status: 400 })
    }

    await connectDB()

    const admin = await AdminUser.findOne({ email })

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign({ adminId: admin._id.toString(), role: admin.role }, JWT_SECRET, {
      expiresIn: '2h'
    })

    const response = new NextResponse(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 2,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('[LOGIN ERROR]', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
