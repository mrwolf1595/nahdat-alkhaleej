// models/AdminUser.ts
import mongoose, { Schema, Document, models } from 'mongoose'

export interface IAdminUser extends Document {
  email: string
  password: string
  role: 'admin' | 'editor'
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
  },
  { timestamps: true }
)

const AdminUser = models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema)

export default AdminUser
