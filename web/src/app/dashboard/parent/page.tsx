"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import * as S from "@/wrappers/parentPortalStyles";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ScheduleItem {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  subject: string | null;
  teacher: string | null;
  room: string | null;
}

interface Teacher {
  id: number;
  fullName: string;
  subjects: string[];
}

interface AttendanceRecord {
  date: string;
  status: "PRESENT" | "ABSENT";
  subject: string | null;
}

interface Mark {
  id: number;
  subject: string | null;
  examType: string | null;
  examPeriod: string | null;
  date: string | null;
  score: number;
}

interface Child {
  id: number;
  firstName: string;
  lastName: string;
  rollNumber: string;
  schoolClass: { grade: number; section: string } | null;
  schedule: ScheduleItem[];
  teachers: Teacher[];
  attendance: {
    total: number;
    present: number;
    absent: number;
    percentage: number | null;
    recent: AttendanceRecord[];
  };
  marks: Mark[];
}

interface PortalData {
  parent: { fatherName: string; motherName: string };
  children: Child[];
}

// ── Constants ─────────────────────────────────────────────────────────────────
const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
const TABS = ["Schedule", "Teachers", "Attendance", "Marks"] as const;
type Tab = (typeof TABS)[number];

// ── Helper functions ──────────────────────────────────────────────────────────
const getPercentColor = (pct: number | null): string => {
  if (pct == null) return "#64748b";
  if (pct >= 85) return "#22c55e";
  if (pct >= 70) return "#f59e0b";
  return "#ef4444";
};

const getScoreColor = (score: number): string => {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
};

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ParentPortalPage() {
  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeChild, setActiveChild] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("Schedule");

  useEffect(() => {
    api
      .get<PortalData>("/parent/portal")
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load portal data. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <S.LoadingScreen>Loading portal...</S.LoadingScreen>;
  }

  if (error) {
    return <S.ErrorScreen>{error}</S.ErrorScreen>;
  }

  if (!data || data.children.length === 0) {
    return (
      <S.LoadingScreen>No children linked to this account.</S.LoadingScreen>
    );
  }

  const child = data.children[activeChild];

  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <S.HeaderLabel>Parent Portal</S.HeaderLabel>
          <S.HeaderTitle>
            {data.parent.fatherName} / {data.parent.motherName}
          </S.HeaderTitle>
        </S.HeaderContent>
      </S.Header>

      <S.MainContent>
        {/* Child switcher */}
        {data.children.length > 1 && (
          <S.ChildSwitcher>
            {data.children.map((c, i) => (
              <S.ChildButton
                key={c.id}
                $active={i === activeChild}
                onClick={() => {
                  setActiveChild(i);
                  setActiveTab("Schedule");
                }}
              >
                {c.firstName} {c.lastName}
              </S.ChildButton>
            ))}
          </S.ChildSwitcher>
        )}

        {/* Child header */}
        <S.ChildHeader>
          <S.ChildAvatar>
            {child.firstName[0]}
            {child.lastName[0]}
          </S.ChildAvatar>

          <S.ChildInfo>
            <h3>
              {child.firstName} {child.lastName}
            </h3>
            <p>
              Roll #{child.rollNumber}
              {child.schoolClass &&
                ` · Grade ${child.schoolClass.grade}-${child.schoolClass.section}`}
            </p>
          </S.ChildInfo>

          <S.StatsContainer>
            <S.StatItem>
              <S.StatValue
                $color={getPercentColor(child.attendance.percentage)}
              >
                {child.attendance.percentage != null
                  ? `${child.attendance.percentage}%`
                  : "—"}
              </S.StatValue>
              <S.StatLabel>Attendance</S.StatLabel>
            </S.StatItem>
            <S.StatItem>
              <S.StatValue $color="#22c55e">
                {child.attendance.present}
              </S.StatValue>
              <S.StatLabel>Present</S.StatLabel>
            </S.StatItem>
            <S.StatItem>
              <S.StatValue $color="#ef4444">
                {child.attendance.absent}
              </S.StatValue>
              <S.StatLabel>Absent</S.StatLabel>
            </S.StatItem>
          </S.StatsContainer>
        </S.ChildHeader>

        {/* Tabs */}
        <S.TabsContainer>
          {TABS.map((tab) => (
            <S.TabButton
              key={tab}
              $active={tab === activeTab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </S.TabButton>
          ))}
        </S.TabsContainer>

        {/* Tab panels */}
        <S.TabPanel>
          {activeTab === "Schedule" && (
            <ScheduleTab schedule={child.schedule} />
          )}
          {activeTab === "Teachers" && (
            <TeachersTab teachers={child.teachers} />
          )}
          {activeTab === "Attendance" && (
            <AttendanceTab attendance={child.attendance} />
          )}
          {activeTab === "Marks" && <MarksTab marks={child.marks} />}
        </S.TabPanel>
      </S.MainContent>
    </S.Container>
  );
}

// ── Schedule Tab ──────────────────────────────────────────────────────────────
function ScheduleTab({ schedule }: { schedule: ScheduleItem[] }) {
  if (!schedule.length) {
    return <S.EmptyState>No schedule set yet.</S.EmptyState>;
  }

  const byDay = DAYS.reduce<Record<string, ScheduleItem[]>>((acc, d) => {
    acc[d] = schedule
      .filter((s) => s.dayOfWeek === d)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    return acc;
  }, {});

  return (
    <div style={{ padding: "var(--spacing-xl)" }}>
      {DAYS.filter((d) => byDay[d].length > 0).map((day) => (
        <S.ScheduleDay key={day}>
          <S.ScheduleDayTitle>
            {day[0] + day.slice(1).toLowerCase()}
          </S.ScheduleDayTitle>
          {byDay[day].map((s) => (
            <S.ScheduleItem key={s.id}>
              <S.ScheduleTime>
                {s.startTime} – {s.endTime}
              </S.ScheduleTime>
              <S.ScheduleSubject>{s.subject ?? "—"}</S.ScheduleSubject>
              <S.ScheduleTeacher>{s.teacher ?? "—"}</S.ScheduleTeacher>
              {s.room && <S.RoomBadge>{s.room}</S.RoomBadge>}
            </S.ScheduleItem>
          ))}
        </S.ScheduleDay>
      ))}
    </div>
  );
}

// ── Teachers Tab ──────────────────────────────────────────────────────────────
function TeachersTab({ teachers }: { teachers: Teacher[] }) {
  if (!teachers.length) {
    return <S.EmptyState>No teachers assigned yet.</S.EmptyState>;
  }

  return (
    <S.TeachersGrid>
      {teachers.map((t) => (
        <S.TeacherCard key={t.id}>
          <S.TeacherAvatar>
            {t.fullName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </S.TeacherAvatar>
          <S.TeacherInfo>
            <h4>{t.fullName}</h4>
            <S.SubjectTags>
              {t.subjects.map((s) => (
                <S.SubjectTag key={s}>{s}</S.SubjectTag>
              ))}
            </S.SubjectTags>
          </S.TeacherInfo>
        </S.TeacherCard>
      ))}
    </S.TeachersGrid>
  );
}

// ── Attendance Tab ────────────────────────────────────────────────────────────
function AttendanceTab({ attendance }: { attendance: Child["attendance"] }) {
  const pct = attendance.percentage;
  const pctColor = getPercentColor(pct);

  return (
    <S.AttendanceSection>
      <S.ProgressBarContainer>
        <S.ProgressHeader>
          <S.ProgressLabel>Overall attendance</S.ProgressLabel>
          <S.ProgressPercent $color={pctColor}>
            {pct != null ? `${pct}%` : "—"}
          </S.ProgressPercent>
        </S.ProgressHeader>
        <S.ProgressBar>
          <S.ProgressFill $width={pct ?? 0} $color={pctColor} />
        </S.ProgressBar>
        <S.AttendanceStats>
          <S.AttendanceStat>
            Total: <strong>{attendance.total}</strong>
          </S.AttendanceStat>
          <S.AttendanceStat>
            Present: <strong>{attendance.present}</strong>
          </S.AttendanceStat>
          <S.AttendanceStat>
            Absent: <strong>{attendance.absent}</strong>
          </S.AttendanceStat>
        </S.AttendanceStats>
      </S.ProgressBarContainer>

      <S.RecentTitle>Recent records</S.RecentTitle>
      {attendance.recent.length === 0 ? (
        <S.EmptyState>No attendance records yet.</S.EmptyState>
      ) : (
        attendance.recent.map((r, i) => (
          <S.AttendanceRecord key={i}>
            <S.AttendanceDate>{r.date}</S.AttendanceDate>
            <S.AttendanceSubject>{r.subject ?? "—"}</S.AttendanceSubject>
            <S.AttendanceStatus $status={r.status}>
              {r.status === "PRESENT" ? "Present" : "Absent"}
            </S.AttendanceStatus>
          </S.AttendanceRecord>
        ))
      )}
    </S.AttendanceSection>
  );
}

// ── Marks Tab ─────────────────────────────────────────────────────────────────
function MarksTab({ marks }: { marks: Mark[] }) {
  if (!marks.length) {
    return <S.EmptyState>No exam results yet.</S.EmptyState>;
  }

  return (
    <S.MarksTable>
      <S.StyledTable>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Type</th>
            <th>Period</th>
            <th>Date</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((m) => (
            <tr key={m.id}>
              <td>{m.subject ?? "—"}</td>
              <td>{m.examType ?? "—"}</td>
              <td>{m.examPeriod ?? "—"}</td>
              <td>{m.date ?? "—"}</td>
              <td>
                <S.ScoreCell $score={m.score}>{m.score}</S.ScoreCell>
              </td>
            </tr>
          ))}
        </tbody>
      </S.StyledTable>
    </S.MarksTable>
  );
}
