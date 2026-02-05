import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/models/user";
import { LoginValidation } from "@/lib/validation/user";

export async function POST(req: Request) {
  try {
    const {
      email,
      password,
    } = await req.json();

    const validation = LoginValidation.safeParse({
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

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({
        message: "User not found",
      }, { status: 404 })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return NextResponse.json({
        message: "Invalid password",
      }, { status: 400 })
    }

    const token = await user.generateToken();

    const response = NextResponse.json({
      message: "Loggedin successfully",
      id: user._id,
      token: token,
    }, { status: 200 })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" as string,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    })

    return response;
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "Something went wrong",
      error: (error as Error).message,
    }, { status: 500 })
  }
}
