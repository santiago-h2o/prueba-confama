import connectionToDb from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { responseFormat } from "@/response/response";
import jwt from "jsonwebtoken";

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:3001",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

const SECRET_KEY = process.env.KEY_JWT


export async function POST(req) {
    try {
        await connectionToDb();
        const { name, password } = await req.json();
        console.log("name: ", name)
        console.log("password: ", password)

        const user = await User.findOne({ name });
        if (!user) {
            return responseFormat(404, null, "Usuario no encontrado", null, corsHeaders)

        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return responseFormat(401, null, "Contraseña incorrecta", null, corsHeaders)
        }
        const token = jwt.sign({ name: user.name, id: user.id }, SECRET_KEY, {});
        return responseFormat(200, token, "Usuario registrado", null, corsHeaders)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
    }
}