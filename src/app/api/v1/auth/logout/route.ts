import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
     const response = NextResponse.json({
    message: "Logout successfully"
     }, { status: 200 })

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" as string,
      expires: new Date(0),
      path: "/",
      sameSite: "lax",
    })

    return response;
    
  } catch (error) {
     return NextResponse.json({
       message: "Something went wrong"
     }, { status: 500 })
  }
}
