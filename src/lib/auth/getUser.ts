import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUser() {
  try {
    const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorised, please login" })
  }
  const user = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
    return user
  } catch (error) {
    return NextResponse.json({ success: false, message: "Unauthorised, please login"})
  }
}