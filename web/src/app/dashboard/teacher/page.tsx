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
import styled from "styled-components";

// ── Local Aesthetic Components ────────────────────────────────────────────────
const PendingAlertCard = styled.div`
  background-color: #fffbeb;
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
`;

const AlertBadge = styled.span`
  background: #f59e0b;
  color: #ffffff;
  border: 1.5px solid var(--border-color, #1a1a1a);
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  display: inline-block;
  margin-bottom: 10px;
`;

const ActionPillButton = styled.button`
  background-color: var(--bg-color, #ffffff);
  color: var(--button-text, #1a1a1a);
  border: 2px solid var(--border-color, #1a1a1a);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 0.6rem 1.4rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 0 var(--border-color, #1a1a1a);
  text-transform: uppercase;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 0 var(--border-color, #1a1a1a);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 0 var(--border-color, #1a1a1a);
  }
`;

const PrimaryPillButton = styled(ActionPillButton)`
  background-color: var(--accent-color, #f2b72b);
`;

const ScheduleRowItem = styled.div<{ $isNext?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 180px 120px;
  align-items: center;
  padding: 12px 18px;
  background: ${(props) =>
    props.$isNext ? "#fef3c7" : "var(--bg-secondary, #f9f8f3)"};
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 14px;
  margin-bottom: 10px;
  font-weight: 800;
  font-size: 0.85rem;
  box-shadow: ${(props) =>
    props.$isNext ? "0 3px 0 var(--border-color, #1a1a1a)" : "none"};

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const TagPill = styled.span`
  background: var(--bg-color, #ffffff);
  border: 1.5px solid var(--border-color, #1a1a1a);
  padding: 3px 12px;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 800;
  justify-self: start;
`;

export default function TeacherOverview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pendingData, setPendingData] = useState<any[]>([]);

  const todayDate = new Date().toISOString().split("T")[0];

  const todayPending = pendingData.filter((p: any) => p.date === todayDate);
  const previousPending = pendingData.filter((p: any) => p.date < todayDate);

  const hasPendingAttendance = pendingData.length > 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [dashboardRes, pendingRes] = await Promise.all([
          api.get("/teachers/dashboard"),
          api.get("/attendance/pending?teacherId=1"),
        ]);

        setData(dashboardRes.data);
        setPendingData(pendingRes.data || []);
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

  return (
    <DashboardContainer>
      <Container>
        {/* ⚠️ Pending Attendance Banner */}
        {hasPendingAttendance && (
          <PendingAlertCard>
            <AlertBadge>
              ⚠️ {pendingData.length} PENDING ATTENDANCE RECORDS
            </AlertBadge>

            {todayPending.length > 0 && (
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                <strong>Today:</strong>
                {todayPending.map((p: any) => (
                  <div key={`${p.scheduleId}-${p.date}`}>
                    • {p.subject} ({p.startTime})
                  </div>
                ))}
              </div>
            )}

            {previousPending.length > 0 && (
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                <strong>Previous Days:</strong>
                {previousPending.map((p: any) => (
                  <div key={`${p.scheduleId}-${p.date}`}>
                    • {p.subject} ({p.date}) — {p.startTime}
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: "16px" }}>
              <Link href="/dashboard/teacher/attendance">
                <PrimaryPillButton>Take Attendance Now</PrimaryPillButton>
              </Link>
            </div>
          </PendingAlertCard>
        )}

        {/* 📊 Stat Cards Section */}
        <StatsGrid>
          <StatCard>
            <div className="label">STUDENTS</div>
            <div className="value">{students.length}</div>
          </StatCard>

          <StatCard>
            <div className="label">CLASSES TODAY</div>
            <div className="value">{todaySchedules.length}</div>
          </StatCard>

          <StatCard>
            <div className="label">NEXT CLASS</div>
            <div className="value" style={{ fontSize: "1rem" }}>
              {nextClass
                ? `${nextClass.subject?.name} (${nextClass.startTime})`
                : "No more today"}
            </div>
          </StatCard>

          <StatCard>
            <div className="label">SUBJECTS</div>
            <div className="value">{subjects.length}</div>
          </StatCard>
        </StatsGrid>

        {/* ⚡ Quick Action Pill Buttons */}
        <SectionCard style={{ marginTop: "24px" }}>
          <SectionHeader>
            <h3 style={{ textTransform: "uppercase", fontWeight: 900 }}>
              Quick Actions
            </h3>
          </SectionHeader>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "16px",
              flexWrap: "wrap",
            }}
          >
            <Link href="/dashboard/teacher/attendance">
              <PrimaryPillButton>Take Attendance</PrimaryPillButton>
            </Link>

            <Link href="/dashboard/teacher/students">
              <ActionPillButton>Students</ActionPillButton>
            </Link>

            <Link href="/dashboard/teacher/schedule">
              <ActionPillButton>Schedule</ActionPillButton>
            </Link>
          </div>
        </SectionCard>

        {/* 📅 Today Schedule List */}
        <SectionCard style={{ marginTop: "24px" }}>
          <SectionHeader>
            <h3 style={{ textTransform: "uppercase", fontWeight: 900 }}>
              Today's Schedule
            </h3>
          </SectionHeader>

          <div style={{ marginTop: "16px" }}>
            {todaySchedules.map((s: any) => (
              <ScheduleRowItem key={s.id} $isNext={nextClass?.id === s.id}>
                <div>
                  <span style={{ fontSize: "0.9rem" }}>
                    {s.subject?.name || "Unknown"}
                  </span>
                  {nextClass?.id === s.id && (
                    <TagPill
                      style={{
                        marginLeft: "10px",
                        background: "#f2b72b",
                      }}
                    >
                      UPCOMING NEXT
                    </TagPill>
                  )}
                </div>
                <TagPill>
                  {s.startTime} – {s.endTime}
                </TagPill>
                <TagPill>RM: {s.room?.name || "—"}</TagPill>
              </ScheduleRowItem>
            ))}

            {todaySchedules.length === 0 && (
              <div
                style={{
                  padding: "16px",
                  fontWeight: 700,
                  color: "#666",
                  textAlign: "center",
                }}
              >
                No classes scheduled for today.
              </div>
            )}
          </div>
        </SectionCard>
      </Container>
    </DashboardContainer>
  );
}
