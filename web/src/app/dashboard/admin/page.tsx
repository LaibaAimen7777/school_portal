// src/app/dashboard/admin/page.tsx
import DashboardReminders from "@/components/ui/DashboardReminders";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "24px" }}>Admin Dashboard</h2>
      <DashboardReminders />
    </div>
  );
}
