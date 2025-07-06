import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib//db/mongodb";
import User from "@/models/user";
import { LoginValidation } from "@/lib/validation/user";
import { cookies } from "next/headers";

export async function POST(NextRequest: NextRequest) {
  try {
    const { email, password } = await NextRequest.json();
    if (!email || !password)
      return NextResponse.json({
        success: false,
        message: "Please provide email and password",
      });

    const validate = LoginValidation.safeParse({ email, password });

    if (!validate.success)
      return NextResponse.json({
        success: false,
        message: validate.error.format(),
      });

    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
      });

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect)
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
      });

    const token = await user.generateToken();

    if (!token)
      return NextResponse.json({
        success: false,
        message: "Internal server error, please try again later",
      });

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true, message: "Login successfully", token: token });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal server error, please try again later",
    });
  }
}
