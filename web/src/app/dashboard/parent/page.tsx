"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/services/api";
import * as S from "@/wrappers/parentPortalStyles";
import { useRouter } from "next/navigation";

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
  if (pct == null) return "var(--text-color)";
  if (pct >= 85) return "#22c55e";
  if (pct >= 70) return "#f59e0b";
  return "#ef4444";
};

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ParentPortalPage() {
  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeChild, setActiveChild] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("Schedule");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const router = useRouter();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  const child = data.children[activeChild];

  const allChildrenNames = data.children
    .map((c) => `${c.firstName} ${c.lastName}`)
    .join(", ");

  return (
    <S.Container>
      {/* Top Banner Header using App Logo */}
      <S.BannerHeader>
        <S.BannerHeaderContent>
          <S.LogoWrapper>
            <Image
              src="/images/logo.png"
              alt="School Logo"
              width={50}
              height={50}
              priority
            />
          </S.LogoWrapper>
          <S.BannerTitle>PARENT PORTAL</S.BannerTitle>

          <S.LogoutButton onClick={handleLogout}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </S.LogoutButton>
        </S.BannerHeaderContent>
      </S.BannerHeader>

      <S.MainContent>
        {/* Warning Banner */}
        {data.mustChangePassword && (
          <S.WarningBanner>
            <S.WarningMessage>
              <S.WarningIcon>⚠️</S.WarningIcon>
              <span>Please change your password for security.</span>
            </S.WarningMessage>
            <S.BannerButton onClick={() => setShowPasswordModal(true)}>
              Change Password
            </S.BannerButton>
          </S.WarningBanner>
        )}

        {/* Parent Summary Card */}
        <S.ParentSummaryCard>
          <S.ParentAvatar>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </S.ParentAvatar>
          <S.ParentDetails>
            <h2>
              {data.parent.fatherName} & {data.parent.motherName}
            </h2>
            <p>{allChildrenNames}</p>
          </S.ParentDetails>
          <S.IllustrationWrapper>
            <img
              src="/images/children-illustration.png"
              alt="Children Illustration"
            />
          </S.IllustrationWrapper>
        </S.ParentSummaryCard>

        {/* Child Switcher */}
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

        {/* Child Header Card */}
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

        {/* Navigation Tabs */}
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

        {/* Active Tab View */}
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

      {/* Change Password Modal */}
      {showPasswordModal && (
        <PasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </S.Container>
  );
}

// ── Password Modal ────────────────────────────────────────────────────────────
function PasswordModal({ onClose }: { onClose: () => void }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setModalError("Passwords do not match.");
      return;
    }

    setChangingPassword(true);
    setModalError(null);

    try {
      const token = localStorage.getItem("token");
      await api.post(
        `/parent/change-password`,
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      onClose();
    } catch (err: any) {
      setModalError(
        err.response?.data?.message || "Failed to update password.",
      );
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalCard onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <h3>Change Password</h3>
          <p>Please enter your new security credentials below.</p>
        </S.ModalHeader>

        <form onSubmit={handleChangePassword}>
          <S.InputGroup>
            <S.Label htmlFor="new-password">New Password</S.Label>
            <S.Input
              id="new-password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="confirm-password">Confirm Password</S.Label>
            <S.Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </S.InputGroup>

          {modalError && <S.ModalError>{modalError}</S.ModalError>}

          <S.ModalActions>
            <S.SecondaryButton type="button" onClick={onClose}>
              Cancel
            </S.SecondaryButton>
            <S.PrimaryButton type="submit" disabled={changingPassword}>
              {changingPassword ? "Updating..." : "Update Password"}
            </S.PrimaryButton>
          </S.ModalActions>
        </form>
      </S.ModalCard>
    </S.ModalOverlay>
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
    <S.ScheduleWrapper>
      {DAYS.filter((d) => byDay[d].length > 0).map((day) => (
        <S.ScheduleDay key={day}>
          <S.ScheduleDayTitle>
            {day[0] + day.slice(1).toLowerCase()}
          </S.ScheduleDayTitle>
          <S.ScheduleList>
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
          </S.ScheduleList>
        </S.ScheduleDay>
      ))}
    </S.ScheduleWrapper>
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
        <S.AttendanceList>
          {attendance.recent.map((r, i) => (
            <S.AttendanceRecord key={i}>
              <S.AttendanceDate>{r.date}</S.AttendanceDate>
              <S.AttendanceSubject>{r.subject ?? "—"}</S.AttendanceSubject>
              <S.AttendanceStatus $status={r.status}>
                {r.status === "PRESENT" ? "Present" : "Absent"}
              </S.AttendanceStatus>
            </S.AttendanceRecord>
          ))}
        </S.AttendanceList>
      )}
    </S.AttendanceSection>
  );
}
