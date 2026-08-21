import AdminLogin from "@/components/AdminLogin";
import AdminShell from "@/components/AdminShell";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) return <AdminLogin />;
  return <AdminShell />;
}
