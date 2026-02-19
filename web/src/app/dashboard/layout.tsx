"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.push("/login");
      return;
    }

    if (pathname.includes("/admin") && role !== "admin") {
      router.push("/dashboard");
    }

    if (pathname.includes("/teacher") && role !== "teacher") {
      router.push("/dashboard");
    }

    if (pathname.includes("/student") && role !== "student") {
      router.push("/dashboard");
    }
  }, [router, pathname]);

  return <>{children}</>;
}
