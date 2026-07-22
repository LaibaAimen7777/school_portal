"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/services/api";
import * as S from "@/wrappers/dashboardReminder";
import {
  DashboardHeaderCard,
  UserIconWrapper,
} from "@/wrappers/adminLayoutStyles";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaSyncAlt,
  FaTrashAlt,
  FaTimes,
  FaRegCalendarAlt,
  FaChalkboardTeacher,
  FaUserPlus,
  FaArrowRight,
  FaChevronDown,
  FaClock,
  FaUser,
} from "react-icons/fa";

interface Reminder {
  type: "warning" | "error";
  message: string;
  link?: string;
}

interface RemindersData {
  reminders: Reminder[];
  completeness: {
    totalClasses: number;
    completeClasses: number;
    allComplete: boolean;
    incompleteClasses: {
      classId: number;
      grade: number;
      section: string;
      missingSubjects: string[];
    }[];
  };
  workload: {
    overloadedTeachers: { teacherName: string; weeklyPeriods: number }[];
    uncoveredSubjects: string[];
  };
}

export default function DashboardReminders() {
  const router = useRouter();

  const [data, setData] = useState<RemindersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoLoading, setAutoLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [autoResult, setAutoResult] = useState<{
    scheduled: number;
    skipped: number;
    errors: string[];
  } | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/schedule/reminders");
      setData(res.data);
    } catch {
      console.error("Failed to fetch reminders");
    }
    setLoading(false);
  };

  const runAutoSchedule = async (clearFirst = false) => {
    setAutoLoading(true);
    setAutoResult(null);
    setShowConfirm(false);
    try {
      const res = clearFirst
        ? await api.delete("/schedule/clear-and-regenerate")
        : await api.post("/schedule/auto");
      setAutoResult(res.data);
      fetchReminders();
    } catch (err: any) {
      setAutoResult({
        scheduled: 0,
        skipped: 0,
        errors: [err.response?.data?.message || "Auto-schedule failed"],
      });
    }
    setAutoLoading(false);
  };

  if (loading) return null;
  if (!data) return null;

  const { reminders, completeness, workload } = data;
  const hasIssues = reminders.length > 0;

  return (
    <S.Container>
      {/* ── Floating Hero Header Pill (Dashboard Only) ── */}
      <DashboardHeaderCard>
        <div className="header-left">
          <UserIconWrapper>
            <FaUser />
          </UserIconWrapper>
          <h1>ADMIN DASHBOARD</h1>
        </div>
        <div className="header-right">
          <Image
            src="/images/admin-illustration.png"
            alt="Admin Illustration"
            width={110}
            height={75}
            style={{ objectFit: "contain", height: "auto" }}
          />
        </div>
      </DashboardHeaderCard>
      <S.Card>
        <S.ButtonGroup>
          <S.PrimaryButton
            onClick={() => runAutoSchedule(false)}
            disabled={autoLoading || completeness.allComplete}
            $disabled={completeness.allComplete}
          >
            <FaRegCalendarAlt />
            {autoLoading
              ? "Running..."
              : completeness.allComplete
                ? "All Scheduled"
                : "Run Auto-Schedule"}
          </S.PrimaryButton>

          {!showConfirm ? (
            <S.SecondaryButton
              onClick={() => setShowConfirm(true)}
              disabled={autoLoading}
            >
              <FaSyncAlt />
              Regenerate
            </S.SecondaryButton>
          ) : (
            <S.ConfirmContainer>
              <S.ConfirmText>Clears all schedules!</S.ConfirmText>
              <S.DangerButton onClick={() => runAutoSchedule(true)}>
                <FaTrashAlt />
                Confirm
              </S.DangerButton>
              <S.CancelButton onClick={() => setShowConfirm(false)}>
                <FaTimes />
                Cancel
              </S.CancelButton>
            </S.ConfirmContainer>
          )}
        </S.ButtonGroup>

        {autoResult && (
          <S.ResultBox $hasError={autoResult.errors.length > 0}>
            <S.ResultTitle>
              <FaCheckCircle />
              {autoResult.scheduled} slot(s) scheduled
              {autoResult.skipped > 0 && `, ${autoResult.skipped} skipped`}
            </S.ResultTitle>
            {autoResult.errors.map((e, i) => (
              <S.ErrorItem key={i}>• {e}</S.ErrorItem>
            ))}
          </S.ResultBox>
        )}
      </S.Card>

      {/* ── Reminders ───────────────── */}
      {hasIssues && (
        <S.RemindersCard>
          <S.RemindersHeader>
            <FaExclamationTriangle />
            Action Required ({reminders.length})
          </S.RemindersHeader>

          {reminders.map((r, i) => (
            <S.ReminderItem key={i} $type={r.type}>
              <S.ReminderMessage $type={r.type}>
                {r.type === "error" ? "🔴" : "🟡"} {r.message}
              </S.ReminderMessage>
              {r.link && (
                <S.ReminderButton onClick={() => router.push(r.link!)}>
                  Fix <FaArrowRight />
                </S.ReminderButton>
              )}
            </S.ReminderItem>
          ))}
        </S.RemindersCard>
      )}

      {/* ── Incomplete Classes ───────────────── */}
      {completeness.incompleteClasses.length > 0 && (
        <S.ExpandableCard>
          <S.ExpandButton
            onClick={() =>
              setExpanded(expanded === "classes" ? null : "classes")
            }
            $expanded={expanded === "classes"}
          >
            <span>
              <FaRegCalendarAlt /> Timetable completeness —{" "}
              {completeness.completeClasses}/{completeness.totalClasses}
            </span>
            <S.ExpandIcon $expanded={expanded === "classes"}>
              <FaChevronDown />
            </S.ExpandIcon>
          </S.ExpandButton>

          {expanded === "classes" && (
            <S.ExpandContent>
              {completeness.incompleteClasses.map((c) => (
                <S.IncompleteClassItem key={c.classId}>
                  <S.ClassInfo>
                    <strong>
                      Grade {c.grade}-{c.section}
                    </strong>
                    <S.MissingSubjects>
                      Missing: {c.missingSubjects.join(", ")}
                    </S.MissingSubjects>
                  </S.ClassInfo>
                  <S.SmallButton
                    onClick={() =>
                      router.push(
                        `/dashboard/admin/schedule/create?classId=${c.classId}`,
                      )
                    }
                  >
                    Schedule <FaArrowRight />
                  </S.SmallButton>
                </S.IncompleteClassItem>
              ))}
            </S.ExpandContent>
          )}
        </S.ExpandableCard>
      )}

      {/* ── Teacher workload ───────────────── */}
      {(workload.overloadedTeachers.length > 0 ||
        workload.uncoveredSubjects.length > 0) && (
        <S.ExpandableCard>
          <S.ExpandButton
            onClick={() =>
              setExpanded(expanded === "teachers" ? null : "teachers")
            }
            $expanded={expanded === "teachers"}
          >
            <span>
              <FaChalkboardTeacher /> Teacher workload issues
            </span>
            <S.ExpandIcon $expanded={expanded === "teachers"}>
              <FaChevronDown />
            </S.ExpandIcon>
          </S.ExpandButton>

          {expanded === "teachers" && (
            <S.ExpandContent>
              {workload.uncoveredSubjects.length > 0 && (
                <S.WarningBox>
                  <FaExclamationTriangle />
                  Subjects with no teacher:{" "}
                  {workload.uncoveredSubjects.join(", ")}
                </S.WarningBox>
              )}
              {workload.overloadedTeachers.map((t, i) => (
                <S.TeacherItem key={i}>
                  <S.TeacherName>
                    <FaClock /> {t.teacherName}
                  </S.TeacherName>
                  <S.TeacherPeriods>
                    {t.weeklyPeriods} periods/week
                  </S.TeacherPeriods>
                </S.TeacherItem>
              ))}
              <S.AddButtonContainer>
                <S.AddTeacherButton
                  onClick={() => router.push("/dashboard/admin/create-teacher")}
                >
                  <FaUserPlus />
                  Add new teacher
                </S.AddTeacherButton>
              </S.AddButtonContainer>
            </S.ExpandContent>
          )}
        </S.ExpandableCard>
      )}

      {/* ── All good ───────────────── */}
      {!hasIssues && completeness.allComplete && (
        <S.SuccessMessage>
          <FaCheckCircle />
          All classes are fully scheduled and teacher workloads look healthy.
        </S.SuccessMessage>
      )}
    </S.Container>
  );
}
