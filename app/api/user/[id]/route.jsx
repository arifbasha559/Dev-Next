import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return Response.json({ message: "No token" }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded) return Response.json({ message: "Invalid token" }, { status: 401 });

    const user = await User.findOne({ username: decodeURIComponent(params.id) }).select("-password");
    if (!user) return Response.json({ message: "User not found" }, { status: 404 });
    return Response.json({ user });
  } catch (err) {
    console.error("Error fetching profile:", err);
    return Response.json({ message: "Error fetching profile" }, { status: 500 });
  }
}


