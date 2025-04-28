import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists in the database
    const [user] = await db.query("SELECT * FROM User WHERE email = ?", [email]);
    const foundUser = (user as any[])[0];

    if (!foundUser) {
      console.log("User not found:", email);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare submitted password with stored hash
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) {
      console.log("Invalid password for:", email);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token valid for 7 days
    const token = jwt.sign(
      { userId: foundUser.id, email: foundUser.email, role: foundUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Create a response
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role
        }
      },
      { status: 200 }
    );

    // Set token cookie with security options
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      path: "/",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}


