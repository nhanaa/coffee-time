import connectMongoDB from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, status } = await request.json();

    await connectMongoDB();

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    const user = await User.create({ name, email, status });
    return NextResponse.json({ user }, { status: 201 })
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

}

export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find({});
    return NextResponse.json({ users });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ id }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
