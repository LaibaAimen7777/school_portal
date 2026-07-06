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
}

interface PortalData {
  parent: { id: number; fatherName: string; motherName: string };
  children: Child[];
  mustChangePassword: boolean;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
const TABS = ["Schedule", "Teachers", "Attendance"] as const;
type Tab = (typeof TABS)[number];

// ── Helper functions ──────────────────────────────────────────────────────────
const getPercentColor = (pct: number | null): string => {
  if (pct == null) return "#64748b";
  if (pct >= 85) return "#22c55e";
  if (pct >= 70) return "#f59e0b";
  return "#ef4444";
};

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ParentPortalPage() {
  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeChild, setActiveChild] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("Schedule");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

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

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        `/parent/change-password`,
        {
          password: newPassword, // 👈 send password in body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Password changed:", res.data);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  const child = data.children[activeChild];

  return (
    <S.Container>
      {data.mustChangePassword && (
        <div
          style={{
            background: "#fef3c7",
            border: "1px solid #f59e0b",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#92400e", fontWeight: 500 }}>
            ⚠️ Please change your password for security
          </span>

          <button
            onClick={() => setShowPasswordModal(true)}
            style={{
              padding: "6px 12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Change Password
          </button>
        </div>
      )}
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
        </S.TabPanel>
      </S.MainContent>
      {showPasswordModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "400px",
              background: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Change Password</h3>

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleChangePassword}
                disabled={changingPassword}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                {changingPassword ? "Updating..." : "Update"}
              </button>

              <button
                onClick={() => setShowPasswordModal(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#e5e7eb",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
