import { cookies } from "next/headers";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const store = await cookies();
  const secret = process.env.ADMIN_SECRET ?? "change-this-secret";
  const isAuth = store.get("admin_token")?.value === secret;

  if (!isAuth) return <AdminLogin />;
  return <AdminDashboard />;
}
