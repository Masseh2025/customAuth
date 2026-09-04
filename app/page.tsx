"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { users } from "@/db/schema";

export default function Home() {
  return (
    <>
      <h1>Home</h1>

      <form
        action={async (form: FormData) => {
          const password = form.get("password");
          const promise = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password,
            }),
          });
          const data = await promise.json();
          return console.log(data, password);
        }}
      >
        <Input
          type="password"
          placeholder="put a  password"
          name="password"
          id="password"
        />
        <Input type="email" placeholder="put a email" name="email" id="email" />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
