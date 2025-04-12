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

    // Generate JWT token
    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email, role: foundUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token in cookie
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
    
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

