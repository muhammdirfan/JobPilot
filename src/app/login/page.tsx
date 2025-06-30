"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Sign in to JobPilot</h1>
      <button
        onClick={() => signIn("github")}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Sign in with GitHub
      </button>
      <button
        onClick={() => signIn("google")}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
