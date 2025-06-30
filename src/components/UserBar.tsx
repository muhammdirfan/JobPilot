"use client";

import { useSession, signOut } from "next-auth/react";

export default function UserBar() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center justify-between p-4 sticky gap-2 bg-black opacity-80">
      <header className="ml-4 text-xl font-bold text-white">
        JobPilot Dashboard
      </header>
      <div className="mr-4">
        <span className="text-sm text-white py-2">
          Hello, {session.user?.name || session.user?.email}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-red-500 underline text-sm pl-3"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
