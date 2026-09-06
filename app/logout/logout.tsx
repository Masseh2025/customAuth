"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function LogOut() {
  return (
    <Button
      onClick={async () => {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        const message = await res.json().then(redirect("/signup"));
        console.log(message);
      }}
    >
      logout
    </Button>
  );
}
