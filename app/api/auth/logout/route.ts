import { db } from "@/db";
import { sessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function POST() {
  // get session
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session)
    return Response.json({ message: "no session" }, { status: 401 });

  // delete from db

  await db.delete(sessions).where(eq(sessions.id, session));

  //   delete from cookies

  cookieStore.delete("session");
  return Response.json({
    message: "logged out",
  });
}
