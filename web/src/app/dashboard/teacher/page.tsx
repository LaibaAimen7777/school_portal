"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import {
  DashboardContainer,
  Container,
  HeaderCard,
  HeaderContent,
  TeacherInfo,
  Avatar,
  TeacherDetails,
  BadgeGroup,
  Badge,
  TeachingSince,
  DateDisplay,
  StatsGrid,
  StatCard,
  SectionCard,
  SectionHeader,
  TableWrapper,
  DaySelector,
  DayButton,
  StudentCount,
  LoadingContainer,
} from "@/wrappers/teacherDashboard";

export default function TeacherOverview() {
  const [data, setData] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/teachers/dashboard");
        console.log("API Response:", res.data);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <p>Loading...</p>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <LoadingContainer>
        <p>Error: {error}</p>
      </LoadingContainer>
    );
  }

  if (!data) {
    return (
      <LoadingContainer>
        <p>No data available</p>
      </LoadingContainer>
    );
  }

  // Safe data access with fallbacks
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

  const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
  const filteredSchedules = schedules.filter(
    (s: any) => !selectedDay || s.dayOfWeek === selectedDay,
  );

  // Safe access for teacher info with fallbacks
  const teacherName = teacher.fullName || "Teacher";
  const teacherInitial = teacherName.charAt(0).toUpperCase();
  // Get subject names from the subjects array
  const subjectNames = subjects.map((s: any) => s.name).join(", ");
  const teacherGrade = teacher.grade || "N/A";
  const teacherJoiningYear = teacher.hireDate
    ? new Date(teacher.hireDate).getFullYear()
    : "N/A";

  const teachesSeniorGrades = schedules.some(
    (s: any) => s.schoolClass?.grade === 9 || s.schoolClass?.grade === 10,
  );

  return (
    <DashboardContainer>
      <Container>
        {/* Stats Grid */}
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
            </SectionHeader>

            <button>Upload Assignment</button>
          </SectionCard>
        )}
        <SectionCard>
          <SectionHeader>
            <h3>Marks Management</h3>
          </SectionHeader>

          <button>Enter Marks</button>
        </SectionCard>

        {/* Today's Schedule Section */}
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
