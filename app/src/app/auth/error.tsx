// app/auth/error.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  useEffect(() => {
    // Redirect to home after error, or show some custom error message
    setTimeout(() => {
      router.push("/"); // or wherever you want to redirect
    }, 5000);
  }, [router]);

  return (
    <div>
      <h1>Error during authentication</h1>
      <p>There was an issue during the sign-in process. Redirecting...</p>
    </div>
  );
}
