import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/models/user";
import { registerValidation } from "@/lib/validation/user";

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = await req.json();

    const validation = registerValidation.safeParse({
      firstName,
      lastName,
      email,
      password,
    })

    if (!validation.success) {
      const issue = validation.error.issues[0];
      return NextResponse.json({
        message: issue.message,
      }, { status: 400 })
    }

    await connectToDatabase();

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    })

    const token = await user.generateToken();

    const response = NextResponse.json({
      message: "User created successfully",
      id: user._id,
      token: token,
    }, { status: 201 })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" as string,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    })

    return response;
    
  } catch (error) {
    if ((error as any).code === 11000) {
      return NextResponse.json({
        message: "Email already exists",
      }, { status: 400 })
    }
    
    return NextResponse.json({
      message: "Something went wrong",
      error: (error as Error).message,
    }, { status: 500 })
  }
}
