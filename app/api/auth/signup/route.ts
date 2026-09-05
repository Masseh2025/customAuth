import { db } from "@/db";
import { users } from "@/db/schema";
import argon2 from "argon2";

export async function POST(req: Request) {
  // get passwordHash and hash email
  const { password, email } = await req.json();
  const hashedPassord = await argon2.hash(password);
  // insert
  const user = await db.insert(users).values({
    passwordHash: hashedPassord,
    email,
  });
}
