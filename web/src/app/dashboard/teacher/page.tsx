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
  LoadingContainer,
} from "@/wrappers/teacherDashboard";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { showError } from "@/components/ui/toast";
import styled from "styled-components";

// ── Redesigned Styled Components ──────────────────────────────────────────────
const WelcomeHero = styled.div`
  background-color: var(--bg-container, #ffffff);
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 24px;
  box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const HeroText = styled.div`
  h1 {
    font-size: 1.6rem;
    font-weight: 900;
    text-transform: uppercase;
    color: var(--text-color, #1a1a1a);
    margin: 0 0 6px 0;
  }

  p {
    font-size: 0.9rem;
    font-weight: 700;
    color: #64748b;
    margin: 0;
  }
`;

const QuickActionGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ActionPillButton = styled.button`
  background-color: var(--bg-color, #ffffff);
  color: var(--button-text, #1a1a1a);
  border: 2px solid var(--border-color, #1a1a1a);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 0.65rem 1.4rem;
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

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const ScheduleRowItem = styled.div<{ $isNext?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: ${(props) =>
    props.$isNext ? "#fef3c7" : "var(--bg-secondary, #ffffff)"};
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 16px;
  font-weight: 800;
  font-size: 0.9rem;
  box-shadow: ${(props) =>
    props.$isNext
      ? "0 4px 0 var(--border-color, #1a1a1a)"
      : "0 2px 0 rgba(0,0,0,0.05)"};
  transition: all 0.2s ease;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const ScheduleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  .subject-title {
    font-size: 1rem;
    font-weight: 900;
    color: var(--text-color, #1a1a1a);
  }
`;

const ScheduleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const TagPill = styled.span<{ $accent?: boolean }>`
  background: ${(props) =>
    props.$accent ? "#f2b72b" : "var(--bg-color, #ffffff)"};
  border: 1.5px solid var(--border-color, #1a1a1a);
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 800;
  color: #1a1a1a;
`;

export default function TeacherOverview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dashboardRes = await api.get("/teachers/dashboard");
        setData(dashboardRes.data);
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

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <DashboardContainer>
      <Container>
        {/* 🌟 Header Banner */}
        <WelcomeHero>
          <HeroText>
            <h1>Welcome Back, {teacher.name || "Teacher"} </h1>
            <p>{formattedDate} — Here is your teaching schedule for today.</p>
          </HeroText>

          <QuickActionGroup>
            <Link href="/dashboard/teacher/attendance">
              <PrimaryPillButton>Take Attendance</PrimaryPillButton>
            </Link>
            <Link href="/dashboard/teacher/students">
              <ActionPillButton>Students</ActionPillButton>
            </Link>
            <Link href="/dashboard/teacher/schedule">
              <ActionPillButton>Schedule</ActionPillButton>
            </Link>
          </QuickActionGroup>
        </WelcomeHero>

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
            <div className="value" style={{ fontSize: "1.1rem" }}>
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

        {/* 📅 Today Schedule List */}
        <SectionCard style={{ marginTop: "24px" }}>
          <SectionHeader>
            <h3 style={{ textTransform: "uppercase", fontWeight: 900 }}>
              Today's Schedule
            </h3>
          </SectionHeader>

          <ScheduleList>
            {todaySchedules.map((s: any) => (
              <ScheduleRowItem key={s.id} $isNext={nextClass?.id === s.id}>
                <ScheduleInfo>
                  <span className="subject-title">
                    {s.subject?.name || "Unknown Subject"}
                  </span>
                  {nextClass?.id === s.id && (
                    <TagPill $accent>UPCOMING NEXT</TagPill>
                  )}
                </ScheduleInfo>

                <ScheduleMeta>
                  <TagPill>
                    {s.startTime} – {s.endTime}
                  </TagPill>
                  <TagPill>RM: {s.room?.name || "—"}</TagPill>
                </ScheduleMeta>
              </ScheduleRowItem>
            ))}

            {todaySchedules.length === 0 && (
              <div
                style={{
                  padding: "2rem",
                  fontWeight: 700,
                  color: "#64748b",
                  textAlign: "center",
                }}
              >
                No classes scheduled for today.
              </div>
            )}
          </ScheduleList>
        </SectionCard>
      </Container>
    </DashboardContainer>
  );
}
