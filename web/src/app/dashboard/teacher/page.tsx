"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import {
  DashboardContainer,
  Container,
  StatsGrid,
  StatCard,
  SectionCard,
  SectionHeader,
  TableWrapper,
  LoadingContainer,
} from "@/wrappers/teacherDashboard";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { showError } from "@/components/ui/toast";

export default function TeacherOverview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/teachers/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
        showError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!data) {
    return (
      <LoadingContainer>
        <p>No data available</p>
      </LoadingContainer>
    );
  }

  const teacher = data.teacher || {};
  const students = data.students || [];
  const schedules = teacher.schedules || [];
  const subjects = teacher.subjects || [];

  const today = new Date().getDay();
  const dayMap = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const todaySchedules = schedules.filter(
    (s: any) => s.dayOfWeek === dayMap[today],
  );

  const now = new Date();

  const nextClass = schedules
    .filter((s: any) => {
      if (s.dayOfWeek !== dayMap[today]) return false;
      if (!s.startTime) return false;

      const [h, m] = s.startTime.split(":");
      const classTime = new Date();
      classTime.setHours(Number(h), Number(m), 0);

      return classTime > now;
    })
    .sort((a: any, b: any) => a.startTime.localeCompare(b.startTime))[0];

  const uniqueGrades = new Set(
    schedules.map((s: any) => s.schoolClass?.grade).filter(Boolean),
  );

  const seniorClassesCount = schedules.filter(
    (s: any) => s.schoolClass?.grade >= 9,
  ).length;

  // const teachesSeniorGrades = schedules.some(
  //   (s: any) => s.schoolClass?.grade === 9 || s.schoolClass?.grade === 10,
  // );

  return (
    <DashboardContainer>
      <Container>
        {/* 👋 Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 600 }}>Good morning 👋</h1>
          <p style={{ color: "#666", marginTop: "4px" }}>
            Here's what's happening today
          </p>
        </div>

        {/* 📊 Stats */}
        <StatsGrid>
          <StatCard>
            <div className="label">Students</div>
            <div className="value">{students.length}</div>
          </StatCard>

          <StatCard>
            <div className="label">Classes Today</div>
            <div className="value">{todaySchedules.length}</div>
          </StatCard>

          <StatCard>
            <div className="label">Next Class</div>
            <div className="value">
              {nextClass
                ? `${nextClass.subject?.name} • ${nextClass.startTime}`
                : "No more today"}
            </div>
          </StatCard>

          <StatCard>
            <div className="label">Subjects</div>
            <div className="value">{subjects.length}</div>
          </StatCard>
        </StatsGrid>

        {/* ⚡ Quick Actions */}
        <SectionCard style={{ marginTop: "24px" }}>
          <SectionHeader>
            <h3>Quick Actions</h3>
          </SectionHeader>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "12px",
              flexWrap: "wrap",
            }}
          >
            <Link href="/dashboard/teacher/attendance">
              <button>Take Attendance</button>
            </Link>

            <Link href="/dashboard/teacher/students">
              <button>Students</button>
            </Link>

            <Link href="/dashboard/teacher/schedule">
              <button>Schedule</button>
            </Link>
          </div>
        </SectionCard>

        {/* 📅 Today */}
        <SectionCard style={{ marginTop: "24px" }}>
          <SectionHeader>
            <h3>Today's Schedule</h3>
          </SectionHeader>

          <TableWrapper>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Time</th>
                  <th>Room</th>
                </tr>
              </thead>

              <tbody>
                {todaySchedules.map((s: any) => (
                  <tr
                    key={s.id}
                    style={{
                      background:
                        nextClass?.id === s.id
                          ? "rgba(0, 120, 255, 0.08)"
                          : "transparent",
                    }}
                  >
                    <td>{s.subject?.name || "Unknown"}</td>
                    <td>
                      {s.startTime} - {s.endTime}
                    </td>
                    <td>{s.room?.name || "—"}</td>
                  </tr>
                ))}

                {todaySchedules.length === 0 && (
                  <tr>
                    <td colSpan={3}>No classes today</td>
                  </tr>
                )}
              </tbody>
            </table>
          </TableWrapper>
        </SectionCard>
      </Container>
    </DashboardContainer>
  );
}
