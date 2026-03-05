"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { ArrowLeft, Loader2 } from "lucide-react";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase().trim();

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const isAdmin =
    ADMIN_EMAIL && user?.email?.toLowerCase() === ADMIN_EMAIL;

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login?redirect=/admin");
      return;
    }
    if (!isAdmin) {
      router.replace("/");
    }
  }, [user, loading, isAdmin, router]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-teal-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to site
            </Link>
            <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
          </div>
          <span className="text-sm text-slate-500">{user.email}</span>
        </div>
      </header>
      <main className="container mx-auto px-4 md:px-8 py-8">{children}</main>
    </div>
  );
}
