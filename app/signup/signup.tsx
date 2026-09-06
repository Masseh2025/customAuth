"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";

import { useState } from "react";

export default function SignUp() {
  const [message, setMessage] = useState<string | undefined>();
  return (
    <>
      <h1>Sign up page</h1>
      <form
        action={async (form: FormData) => {
          const password = form.get("password");
          const email = form.get("email");
          const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password,
              email,
            }),
          });
          const data = await res.json();

          if (data.message) setMessage(data.message);
        }}
      >
        <Input
          type="password"
          placeholder="put a  password"
          name="password"
          id="password"
          required
        />
        <Input
          type="email"
          placeholder="put a email"
          name="email"
          id="email"
          required
        />
        <Button type="submit">Submit</Button>
      </form>
      <p>{message ? message : ""}</p>
      <div className="border-foreground border-t-2">
        <p>Already have a account?</p>

        <Button className="w-fit">
          <Link href="signin">Sign in</Link>
        </Button>
      </div>
    </>
  );
}
