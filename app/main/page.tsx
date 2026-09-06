import { Button } from "@/components/ui/button";
import getUser from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MainPage() {
  const user = await getUser();
  if (!user) redirect("/signup");
  return (
    <>
      <Button>
        <Link href="/logout">Logout</Link>
      </Button>
      {user ? "your signed in" : "please sign in"}
      <h1>Main page</h1>;
    </>
  );
}
