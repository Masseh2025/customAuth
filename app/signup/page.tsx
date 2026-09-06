import getUser from "@/lib/auth";
import SignUp from "./signup";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const user = await getUser();
  if (user) redirect("main");
  return <SignUp />;
}
