import connectMongoDB from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const { name, email, status } = await request.json();
    await connectMongoDB();
    const user = await User.findByIdAndUpdate(id, { name, email, status });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ id }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
