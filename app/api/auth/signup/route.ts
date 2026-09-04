import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: Request, res) {
  // get passwordHash and email
  const { password } = await req.json();
  console.log(password);
  //
  const usersInfo = await db.select().from(users);
  return Response.json({ data: usersInfo });
}
