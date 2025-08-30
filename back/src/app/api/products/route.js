import connectionToDb from "@/lib/mongoose";
import Product from "@/models/Product";
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
    const { name, description, price, category } = await req.json();
    console.log("name: ", name)
    const newProduct = new Product({
      name,
      description,
      price,
      category,
    });

    await newProduct.save();
    return responseFormat(200, newProduct, "Producto registrado", null, corsHeaders)
  } catch (error) {
    console.log("error: ", error)
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}

export async function GET() {
  try {
    await connectionToDb();
    const products = await Product.find();
    return responseFormat(200, products, "Productos obtenidos", null, corsHeaders)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}

export async function PUT(req) {
  try {
    await connectionToDb();
    const { _id, name, description, price, category } = await req.json();
    console.log("id: ", _id)
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { name, description, price, category },
      { new: true } 
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json(updatedProduct, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}

export async function DELETE(req) {
  try {
    await connectionToDb();
    const body = await req.json();
    const { id } = body;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json({ message: "Producto eliminado" }, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}
