import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  } else {
    redirect("/jobs");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
    </div>
  );
}
