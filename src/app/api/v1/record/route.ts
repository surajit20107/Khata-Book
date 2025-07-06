import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Hisab from "@/models/hisab";
import { getUser } from "@/lib/auth/getUser";

export async function GET() {
  try {
    await connectToDatabase()
    const hisab = await Hisab.find()
    return NextResponse.json({ success: true, data: hisab})
  } catch (error) {
    console.log(error)
  }
}

export async function POST(NextRequest: NextRequest) {
  try {
    const { name, type, amount, description } = await NextRequest.json()
    if (!name || !type || !amount) return NextResponse.json({ success: false, message: "Please provide all required fields" })
    
    await connectToDatabase()

    const user = await getUser()
    if (!user) return NextResponse.json({ success: false, message: "Unauthorised, please login" })

    const newHisab = Hisab.create({
      name,
      type,
      amount,
      description,
    })

    if (!newHisab) return NextResponse.json({ success: false, message: "Something went wrong please try again" })

    return NextResponse.json({ success: true, message: "New record created" })
    
  } catch (error) {
    console.log(error)
  }
}

export async function DELETE(NextRequest: NextRequest) {
  try {
    const { id } = await NextRequest.json()
    await connectToDatabase()
    const hisab = await Hisab.findByIdAndDelete(id)
    if (!hisab) return NextResponse.json({ success: false, message: "Record not found" })
    return NextResponse.json({ success: true, message: "Record deleted" })
  } catch (error) {
    console.log(error)
  }
}
