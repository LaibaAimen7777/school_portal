"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;

  .sidebar {
    width: 250px;
    background: #fffefb;
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
      background: #f4f4f4;
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
    background: linear-gradient(160deg, #fdf6e3, #f7f3ec);
    padding: 40px;
  }
`;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

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
