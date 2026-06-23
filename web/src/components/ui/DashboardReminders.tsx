// src/components/admin/DashboardReminders.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import * as S from "@/wrappers/dashboardReminder";
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
  FaBook,
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

interface ExamReminderData {
  hasActivePeriod: boolean;
  activePeriod: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
  } | null;
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
}

export default function DashboardReminders() {
  const router = useRouter();

  // Timetable state
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

  // Exam state
  const [examData, setExamData] = useState<ExamReminderData | null>(null);
  const [examAutoLoading, setExamAutoLoading] = useState(false);
  const [examAutoResult, setExamAutoResult] = useState<{
    scheduled: number;
    skipped: number;
    errors: string[];
  } | null>(null);

  useEffect(() => {
    fetchReminders();
    fetchExamReminders();
  }, []);

  const fetchReminders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/schedule/reminders");
      console.log("reminders", res.data);
      setData(res.data);
    } catch {
      console.error("Failed to fetch reminders");
    }
    setLoading(false);
  };

  const fetchExamReminders = async () => {
    try {
      const res = await api.get<ExamReminderData>("/exams/reminders");
      setExamData(res.data);
    } catch {
      console.error("Failed to fetch exam reminders");
    }
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

  const runExamAutoSchedule = async () => {
    setExamAutoLoading(true);
    setExamAutoResult(null);
    try {
      const res = await api.post("/exams/auto-schedule");
      setExamAutoResult(res.data);
      fetchExamReminders();
    } catch (err: any) {
      setExamAutoResult({
        scheduled: 0,
        skipped: 0,
        errors: [err.response?.data?.message || "Exam auto-schedule failed"],
      });
    }
    setExamAutoLoading(false);
  };

  if (loading) return null;
  if (!data) return null;

  const { reminders, completeness, workload } = data;
  const hasIssues = reminders.length > 0;

  const examAllComplete = examData?.completeness.allComplete ?? true;
  const examIncomplete = examData?.completeness.incompleteClasses ?? [];

  // Show exam card only if there's an active period OR exams are incomplete
  const showExamCard =
    examData && (examData.hasActivePeriod || !examAllComplete);

  return (
    <S.Container>
      {/* ── Timetable auto-schedule card ──────────────────────────────────── */}
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

      {/* ── Exam schedule card ─────────────────────────────────────────────── */}
      {showExamCard && (
        <S.Card>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaBook style={{ color: "#6b7280" }} />
              <span style={{ fontWeight: 600, fontSize: "14px" }}>
                Exam Schedule
              </span>
            </div>

            {/* Period status badge */}
            {examData?.hasActivePeriod ? (
              <span
                style={{
                  fontSize: "12px",
                  padding: "3px 10px",
                  borderRadius: "99px",
                  background: "#dcfce7",
                  color: "#15803d",
                  fontWeight: 500,
                }}
              >
                ● Active: {examData.activePeriod!.name} (
                {examData.activePeriod!.startDate} –{" "}
                {examData.activePeriod!.endDate})
              </span>
            ) : (
              <span
                style={{
                  fontSize: "12px",
                  padding: "3px 10px",
                  borderRadius: "99px",
                  background: "#fee2e2",
                  color: "#dc2626",
                  fontWeight: 500,
                }}
              >
                ● No active exam period
              </span>
            )}
          </div>

          {/* Completeness status */}
          {examData?.hasActivePeriod && (
            <div
              style={{
                fontSize: "13px",
                color: examAllComplete ? "#15803d" : "#92400e",
                background: examAllComplete ? "#f0fdf4" : "#fffbeb",
                border: `1px solid ${examAllComplete ? "#bbf7d0" : "#fde68a"}`,
                borderRadius: "7px",
                padding: "8px 12px",
                marginBottom: "12px",
              }}
            >
              {examAllComplete ? (
                <>✅ All exams scheduled for the active period.</>
              ) : (
                <>
                  🟡{" "}
                  <strong>
                    {examData.completeness.completeClasses}/
                    {examData.completeness.totalClasses}
                  </strong>{" "}
                  classes have all exams scheduled — {examIncomplete.length}{" "}
                  still missing exams.
                </>
              )}
            </div>
          )}

          {/* No active period warning */}
          {!examData?.hasActivePeriod && (
            <div
              style={{
                fontSize: "13px",
                color: "#dc2626",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "7px",
                padding: "8px 12px",
                marginBottom: "12px",
              }}
            >
              🔴 No active exam period. Create one before scheduling exams.
            </div>
          )}

          <S.ButtonGroup>
            <S.PrimaryButton
              onClick={runExamAutoSchedule}
              disabled={
                examAutoLoading || !examData?.hasActivePeriod || examAllComplete
              }
              $disabled={!examData?.hasActivePeriod || examAllComplete}
            >
              <FaBook />
              {examAutoLoading
                ? "Scheduling..."
                : examAllComplete
                  ? "All Exams Scheduled"
                  : "Auto-Schedule Exams"}
            </S.PrimaryButton>

            <S.SecondaryButton
              onClick={() => router.push("/dashboard/admin/exams")}
            >
              <FaRegCalendarAlt />
              Manage Exams
            </S.SecondaryButton>
          </S.ButtonGroup>

          {examAutoResult && (
            <S.ResultBox $hasError={examAutoResult.errors.length > 0}>
              <S.ResultTitle>
                <FaCheckCircle />
                {examAutoResult.scheduled} exam(s) scheduled
                {examAutoResult.skipped > 0 &&
                  `, ${examAutoResult.skipped} skipped`}
              </S.ResultTitle>
              {examAutoResult.errors.map((e, i) => (
                <S.ErrorItem key={i}>• {e}</S.ErrorItem>
              ))}
            </S.ResultBox>
          )}
        </S.Card>
      )}

      {/* ── Exam completeness detail ───────────────────────────────────────── */}
      {examData?.hasActivePeriod && examIncomplete.length > 0 && (
        <S.ExpandableCard>
          <S.ExpandButton
            onClick={() => setExpanded(expanded === "exams" ? null : "exams")}
            $expanded={expanded === "exams"}
          >
            <span>
              <FaBook /> Exam completeness —{" "}
              {examData.completeness.completeClasses}/
              {examData.completeness.totalClasses} classes done
            </span>
            <S.ExpandIcon $expanded={expanded === "exams"}>
              <FaChevronDown />
            </S.ExpandIcon>
          </S.ExpandButton>

          {expanded === "exams" && (
            <S.ExpandContent>
              {examIncomplete.map((c) => (
                <S.IncompleteClassItem key={c.classId}>
                  <S.ClassInfo>
                    <strong>
                      Grade {c.grade}-{c.section}
                    </strong>
                    <S.MissingSubjects>
                      Missing exams: {c.missingSubjects.join(", ")}
                    </S.MissingSubjects>
                  </S.ClassInfo>
                  <S.SmallButton
                    onClick={() =>
                      router.push(`/dashboard/admin/exams?classId=${c.classId}`)
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

      {/* ── Timetable reminders ───────────────────────────────────────────── */}
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

      {/* ── Incomplete timetable classes ──────────────────────────────────── */}
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
              {completeness.completeClasses}/{completeness.totalClasses} classes
              done
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

      {/* ── Teacher workload ──────────────────────────────────────────────── */}
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

      {/* ── All clear ─────────────────────────────────────────────────────── */}
      {!hasIssues && examAllComplete && (
        <S.SuccessMessage>
          <FaCheckCircle />
          All classes are fully scheduled, exams are set, and teacher workloads
          look healthy.
        </S.SuccessMessage>
      )}
    </S.Container>
  );
}
