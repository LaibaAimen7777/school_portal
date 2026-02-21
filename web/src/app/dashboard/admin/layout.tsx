"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;

  .sidebar {
    width: 250px;
    background: #0874f0b6;
    box-shadow: 5px 0 20px rgba(0, 0, 0, 0.05);
    padding: 30px 20px;

    h2 {
      margin-bottom: 40px;
    }

    button {
      display: block;
      width: 100%;
      margin-bottom: 15px;
      padding: 10px;
      border: none;
      background: #e33232;
      border-radius: 10px;
      cursor: pointer;
      text-align: left;
      transition: 0.2s;

      &:hover {
        background: #0070f3;
        color: white;
      }
    }
  }

  .content {
    flex: 1;
    background: linear-gradient(160deg, #1ba2d375, #e49205);
    padding: 40px;
  }
`;

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

    // ✅ Auth passed
    setChecked(true);
  }, [router]);

  // 🚫 Prevent UI flicker + premature redirect
  if (!checked) return null;

  return (
    <LayoutWrapper>
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <button onClick={() => router.push("/dashboard/admin/students")}>
          Students
        </button>
        <button onClick={() => router.push("/dashboard/admin/create-student")}>
          Create Student
        </button>
        <button onClick={() => router.push("/dashboard/admin/teachers")}>
          Teachers
        </button>
      </div>

      <div className="content">{children}</div>
    </LayoutWrapper>
  );
}
