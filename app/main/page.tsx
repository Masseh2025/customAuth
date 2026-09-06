import getUser from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MainPage() {
  const user = await getUser();
  if (!user) redirect("/signup");
  return (
    <>
      {user ? "your signed in" : "please sign in"}
      <h1>Main page</h1>;
    </>
  );
}
