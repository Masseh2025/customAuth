"use client";

import { Button } from "@/components/ui/button";

export default function LogOutPage() {
  return (
    <Button
      onClick={async () => {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        const message = await res.json();
        console.log(message);
      }}
    >
      logout
    </Button>
  );
}
