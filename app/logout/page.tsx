import LogOut from "./logout";
import getUser from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LogOutPage() {
  const user = await getUser();
  if (!user) redirect("/signup");
  return <LogOut />;
}
