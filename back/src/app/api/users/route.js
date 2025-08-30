import connectionToDb from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { responseFormat } from "@/response/response";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function POST(req) {
  try {
    await connectionToDb();
    const { name, password } = await req.json();

    const newUser = new User({ name, password });
    await newUser.save();

    return responseFormat(200, newUser, "Usuario registrado", null, corsHeaders)
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}


export async function GET() {
  try {
    await connectionToDb();
    const users = await User.find();
    return NextResponse.json(users, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}


export async function PUT(req) {
  try {
    await connectionToDb();
    const { id, name } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(id, { name }, { new: true });
    return NextResponse.json(updatedUser, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}


export async function DELETE(req) {
  try {
    await connectionToDb();
    const { id } = await req.json();

    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "Usuario eliminado" }, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}
