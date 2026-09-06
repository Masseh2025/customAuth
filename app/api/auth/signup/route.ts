import { db } from "@/db";
import { users } from "@/db/schema";
import argon2 from "argon2";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  // get email and hash password
  const { password, email } = await req.json();
  // check if email exists and if it does reject
  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (user) return Response.json({ message: "something went wrong" });
  //   hash password
  const hashedPassord = await argon2.hash(password);

  // insert
  await db.insert(users).values({
    passwordHash: hashedPassord,
    email,
  });
}
