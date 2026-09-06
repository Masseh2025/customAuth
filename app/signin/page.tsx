import { redirect } from "next/navigation";
import { SignIn } from "./(components)/signin";
import getUser from "@/lib/auth";

export default async function SignInPage() {
  const user = await getUser();
  if (user) redirect("/main");
  return <SignIn />;
}
