import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Hisab from "@/models/hisab";

export async function POST(req: Request) {
  try {
    const { name, type, amount, description } = await req.json();

    if (!name || !type || !amount) {
      return NextResponse.json({
        mesaage: "Missing required fields",
      }, { status: 400 })
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({
        message: "Unauthorized",
      }, { status: 401 })
    }

    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!)
    } catch (error) {
      return NextResponse.json({
        message: "Invalid token",
      }, { status: 401 })
    }

    await connectToDatabase();

    const hisab = await Hisab.create({
      name,
      type,
      amount,
      description,
      user: (decoded as any).id,
    })

    if (!hisab) {
      return NextResponse.json({
        message: "Failed to create record, Try again later",
      }, { status: 500 })
    }

    return NextResponse.json({
      message: "Record created",
    }, { status: 201 })
    
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message || "Something went wrong",
    }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({
        message: "Unauthorized",
      }, { status: 401 })
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json({
        message: "Invalid token",
      }, { status: 401 })
    }

    await connectToDatabase();

    const hisab = await Hisab.find({ user: (decoded as any).id }).sort({ createdAt: -1 });

    return NextResponse.json({
      data: hisab,
    }, { status: 200 })
    
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message || "Something went wrong",
    }, { status: 500 })
  }
}

