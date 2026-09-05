"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SignIn() {
  const [message, setMessage] = useState<string | undefined>();

  return (
    <>
      <h1>sign in page</h1>
      <form
        action={async (form: FormData) => {
          const password = form.get("password");
          const email = form.get("email");
          const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password,
              email,
            }),
          });
          const signedIn = await res.json();

          setMessage(signedIn.message);
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
      <p>mes:{!message ? "" : message}</p>
    </>
  );
}
