"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminContainer, MainContent } from "@/wrappers/adminStyles";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role !== "admin") {
      router.replace("/dashboard");
      return;
    }

    setChecked(true);
  }, [router]);

  if (!checked) return null;

  return (
    <AdminContainer>
      <MainContent style={{ marginLeft: 0, padding: 0 }}>
        {children}
      </MainContent>
    </AdminContainer>
  );
}
