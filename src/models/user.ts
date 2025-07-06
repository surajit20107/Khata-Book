import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  avatar?: string;
  roles: string[];
  records: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(value);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  avatar: {
    type: String,
    trim: true,
    default: "",
  },
  roles: {
    type: [String],
    default: ["user"],
    enum: ["user", "admin", "moderator"],
  },
  records: [
    {
      type: Schema.Types.ObjectId,
      ref: "Hisab"
    }
  ]
}, {timestamps: true});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next()
  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next(error as Error)
  }
})

userSchema.methods.comparePassword = async function (password:string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function (): Promise<string> {
  return await jwt.sign({
    id: this._id,
    email: this.email,
  }, process.env.JWT_SECRET || "surajit", {
    expiresIn: "1d"
  })
}

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;