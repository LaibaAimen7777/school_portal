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

  const teachesSeniorGrades = schedules.some(
    (s: any) => s.schoolClass?.grade === 9 || s.schoolClass?.grade === 10,
  );

  return (
    <DashboardContainer>
      <Container>
        <StatsGrid>
          <StatCard>
            <div className="label">Total Students</div>
            <div className="value">{students.length}</div>
          </StatCard>
          <StatCard>
            <div className="label">Total Classes</div>
            <div className="value">{schedules.length}</div>
          </StatCard>
          <StatCard>
            <div className="label">Today's Classes</div>
            <div className="value">{todaySchedules.length}</div>
          </StatCard>
          <StatCard>
            <div className="label">Subjects</div>
            <div className="value">{subjects.length}</div>
          </StatCard>
        </StatsGrid>

        {teachesSeniorGrades && (
          <SectionCard>
            <SectionHeader>
              <h3>Assignments</h3>
              <button>Upload Assignment</button>
            </SectionHeader>
          </SectionCard>
        )}

        <SectionCard>
          <SectionHeader>
            <h3>Marks Management</h3>
            <Link href="/dashboard/teacher/marks">
              <button>Enter Marks</button>
            </Link>
          </SectionHeader>
        </SectionCard>

        <SectionCard>
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
                  <tr key={s.id}>
                    <td>{s.subject?.name || "Unknown Subject"}</td>
                    <td>
                      {s.startTime || "N/A"} - {s.endTime || "N/A"}
                    </td>
                    <td>{s.room?.name || "TBD"}</td>
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
