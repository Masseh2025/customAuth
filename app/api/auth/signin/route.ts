import { db } from "@/db";
import { users } from "@/db/schema";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
export async function POST(req: Request) {
  // Get req for email and password

  const { email, password } = await req.json();

  //Verify it
  const [user] = await db.select().from(users).where(eq(users.email, email));
  const isCorrect = await argon2.verify(user.passwordHash, password);
  console.log(isCorrect);

  //Create session
  console.log(email, password);
  return Response.json({ email, password, isCorrect });
}
