import "server-only";

import { db } from "@/db";
import { sessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export default async function getUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return undefined;
  const [userSession] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionCookie));

  if (!userSession) return undefined;

  //   check expiresAt
  if (userSession.expiresAt < new Date()) {
    await db.delete(sessions).where(eq(sessions.id, sessionCookie));
    return undefined;
  }
  console.log(userSession);
  return userSession.userId;
}
