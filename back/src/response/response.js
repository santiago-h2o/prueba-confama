import { NextResponse } from "next/server";

export const responseFormat = (status, data, message, error, corsHeaders) => {
  try {
    return NextResponse.json(
      { status, data, message, error },
      {
        status,
        headers: corsHeaders,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
};
