import { NextRequest, NextResponse } from "next/server";
import { registerValidation } from "@/lib/validation/user";
import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/models/user";
import { cookies } from "next/headers";

export async function POST(NextRequest: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await NextRequest.json();

    if (!firstName || !email || !password)
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });

    const user = registerValidation.safeParse({ firstName, email, password });

    if (!user.success)
      return NextResponse.json({
        success: false,
        message: user.error.format(),
      });

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return NextResponse.json({
        success: false,
        message: "user already exists",
      });

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    if (!newUser)
      return NextResponse.json({
        success: false,
        message: "Internal server error, try again later",
      });

    const token = await newUser.generateToken()

    if (!token) return NextResponse.json({ success: false, message: "Internal server error, please try again later" })

    const cookieStore = await cookies()

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/"
    })

    return NextResponse.json({ success: true, message: "User created successfully", token: token })

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal server error, please try again later",
    });
  }
}
