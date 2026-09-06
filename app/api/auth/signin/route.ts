import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import getUser from "@/lib/auth";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
export async function POST(req: Request) {
  // Get req for email and password

  const { email, password } = await req.json();

  //Verify it
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user)
    return Response.json(
      { message: "invalid user or password" },
      { status: 401 },
    );

  const isCorrect = await argon2.verify(user.passwordHash, password);

  if (!isCorrect) return Response.json({ message: "Inavlid user or password" });

  //Create session

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const [session] = await db
    .insert(sessions)
    .values({
      userId: user.id,
      expiresAt,
    })
    .returning();

  // Create session cookie

  const cookieStore = await cookies();

  cookieStore.set("session", session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  // Send response
  console.log(email, password);
  return Response.json({ message: "login succsesfull dawg" });
}
