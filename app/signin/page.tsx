"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  return (
    <>
      <h1>sign in page</h1>
      <form
        action={async (form: FormData) => {
          const password = form.get("password");
          const email = form.get("email");
          const data = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password,
              email,
            }),
          });
          const signedIn = await data.json();
          console.log(signedIn);
        }}
      >
        <Input
          required
          type="password"
          placeholder="put in your  password"
          name="password"
          id="password"
        />
        <Input
          required
          type="email"
          placeholder="put in your email"
          name="email"
          id="email"
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
