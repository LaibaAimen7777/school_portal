"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

interface User {
  id: number;
  username: string;
  role: string;
  password: string;
  can_login: boolean;
  is_active: boolean;
  must_change_password: boolean;
  created_at: string;
}

interface Parent {
  id: number;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  students: {
    id: number;
    firstName: string;
    lastName: string;
  }[];
  user: User;
}

export default function ParentsPage() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [resettingId, setResettingId] = useState<number | null>(null);
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  } | null>(null);

  useEffect(() => {
    fetchParents();
  }, []);

  useEffect(() => {
    if (credentials) {
      setTimeout(() => {
        handleDownloadPDF();
      }, 500);
    }
  }, [credentials]);

  const fetchParents = async () => {
    try {
      const res = await api.get("/parent");
      setParents(res.data);
    } catch {
      console.error("Failed to load parents");
    }
    setLoading(false);
  };

  const resetPassword = async (parentId: number) => {
    setResettingId(parentId);

    try {
      const res = await api.post(`/parent/${parentId}/reset-password`);

      const { username, temporaryPassword } = res.data;

      setCredentials({
        username,
        password: temporaryPassword,
      });
    } catch {
      alert("Failed to reset password");
    }

    setResettingId(null);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("parentCredentialCard");
    if (!element) return;

    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    pdf.save(`Parent-${credentials?.username}-Credentials.pdf`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Parents</h2>

      {parents.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <div>
            <strong>{p.fatherName}</strong> & {p.motherName}
          </div>

          <div>📞 {p.phone}</div>
          <div>📧 {p.email}</div>

          <div style={{ marginTop: "8px" }}>
            <strong>Children:</strong>{" "}
            {p.students.map((s) => `${s.firstName} ${s.lastName}`).join(", ")}
          </div>

          <button
            onClick={() => resetPassword(p.user.id)}
            disabled={resettingId === p.id}
            style={{
              marginTop: "10px",
              padding: "6px 10px",
              background: "#ef4444",
              color: "white",
              borderRadius: "6px",
              border: "none",
            }}
          >
            {resettingId === p.id ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      ))}
      {credentials && (
        <>
          <div
            id="parentCredentialCard"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
              marginTop: "20px",
              background: "#fff",
              maxWidth: "400px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0 }}>Parent Credentials</h3>
              <button onClick={() => window.print()}>🖨️ Print</button>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <strong>Username:</strong> {credentials.username}
            </div>

            <div>
              <strong>Password:</strong>{" "}
              <span style={{ fontWeight: "bold" }}>{credentials.password}</span>
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
            }}
          >
            📥 Download PDF
          </button>
        </>
      )}
    </div>
  );
}
