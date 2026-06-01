"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";

interface ExamPeriod {
  id: number;
  name: string;
  examType: string;
  durationMinutes: number;
  startDate: string;
  endDate: string;
}

interface SchoolClass {
  id: number;
  grade: number;
  section: string;
}
interface Subject {
  id: number;
  name: string;
}
interface Teacher {
  id: number;
  fullName: string;
  subjects: { id: number }[];
}
interface Room {
  id: number;
  name: string;
}

interface Exam {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  examType: string;
  subject: Subject;
  schoolClass: SchoolClass;
  teacher: { fullName: string };
  room: Room;
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

// Fixed term types — name is auto-generated from these, admin can still edit it
const EXAM_TYPES = [
  {
    value: "FIRST TERM",
    label: "First Term",
    defaultName: "First Term",
    defaultDuration: 60,
  },
  {
    value: "SECOND TERM",
    label: "Second Term",
    defaultName: "Second Term",
    defaultDuration: 120,
  },
  {
    value: "THIRD TERM",
    label: "Third Term",
    defaultName: "Third Term",
    defaultDuration: 180,
  },
] as const;

type ExamTypeValue = (typeof EXAM_TYPES)[number]["value"];

const addMinutes = (time: string, minutes: number): string => {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};

const currentYear = new Date().getFullYear();

const initialForm = {
  examPeriodId: "",
  classId: "",
  subjectId: "",
  teacherId: "",
  roomId: "",
  date: "",
  startTime: "",
  endTime: "",
};

const initialPeriodForm = {
  examType: "" as ExamTypeValue | "",
  name: "",
  durationMinutes: 60,
  startDate: "",
  endDate: "",
};

export default function AdminExamsPage() {
  const [examPeriods, setExamPeriods] = useState<ExamPeriod[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [roomsFetched, setRoomsFetched] = useState(false);
  const [timeError, setTimeError] = useState("");

  const [showPeriodForm, setShowPeriodForm] = useState(false);
  const [periodForm, setPeriodForm] = useState(initialPeriodForm);
  const [periodLoading, setPeriodLoading] = useState(false);
  const [periodDateError, setPeriodDateError] = useState("");

  const [reminderData, setReminderData] = useState<ExamReminderData | null>(
    null,
  );
  const [autoLoading, setAutoLoading] = useState(false);
  const [autoResult, setAutoResult] = useState<{
    scheduled: number;
    skipped: number;
    errors: string[];
  } | null>(null);
  const [showIncomplete, setShowIncomplete] = useState(false);

  const activeExamPeriod = examPeriods.find((ep) => {
    const today = new Date().toISOString().split("T")[0];
    return ep.startDate <= today && ep.endDate >= today;
  });

  const selectedPeriodDuration =
    examPeriods.find((ep) => String(ep.id) === form.examPeriodId)
      ?.durationMinutes ?? null;

  useEffect(() => {
    fetchAll();
    fetchReminders();
  }, []);

  const fetchAll = async () => {
    const [periodsRes, classesRes, subjectsRes, teachersRes, examsRes] =
      await Promise.all([
        api.get("/exam-periods"),
        api.get("/school-class"),
        api.get("/subject"),
        api.get("/teachers"),
        api.get("/exams"),
      ]);
    setExamPeriods(periodsRes.data);
    setClasses(classesRes.data);
    setSubjects(subjectsRes.data);
    setTeachers(teachersRes.data);
    setExams(examsRes.data);
  };

  const fetchReminders = async () => {
    try {
      const res = await api.get<ExamReminderData>("/exams/reminders");
      setReminderData(res.data);
    } catch {
      /* non-critical */
    }
  };

  const runAutoSchedule = async () => {
    setAutoLoading(true);
    setAutoResult(null);
    try {
      const res = await api.post("/exams/auto-schedule");
      setAutoResult(res.data);
      showSuccess(`${res.data.scheduled} exam(s) scheduled!`);
      fetchAll();
      fetchReminders();
    } catch (err: any) {
      showError(err.response?.data?.message || "Auto-schedule failed");
    }
    setAutoLoading(false);
  };

  // ── Period form ────────────────────────────────────────────────────────────

  const validatePeriodDates = (start: string, end: string) => {
    if (!start || !end) return true;
    if (end <= start) {
      setPeriodDateError("End date must be after start date");
      return false;
    }
    setPeriodDateError("");
    return true;
  };

  const handlePeriodChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setPeriodForm((prev) => {
      const next = {
        ...prev,
        [name]: name === "durationMinutes" ? Number(value) : value,
      };

      // When exam type changes: auto-fill name and reset duration to default
      if (name === "examType") {
        const match = EXAM_TYPES.find((t) => t.value === value);
        if (match) {
          next.name = `${match.defaultName} ${currentYear}`;
          next.durationMinutes = match.defaultDuration;
        } else {
          next.name = "";
          next.durationMinutes = 60;
        }
      }

      if (name === "startDate" || name === "endDate") {
        validatePeriodDates(
          name === "startDate" ? value : prev.startDate,
          name === "endDate" ? value : prev.endDate,
        );
      }
      return next;
    });
  };

  const handleCreatePeriod = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!periodForm.examType) {
      showError("Select a term type");
      return;
    }
    if (!validatePeriodDates(periodForm.startDate, periodForm.endDate)) return;
    setPeriodLoading(true);
    try {
      const res = await api.post("/exam-periods", periodForm);
      showSuccess("Exam period created!");
      setExamPeriods((prev) => [...prev, res.data]);
      setForm((prev) => ({ ...prev, examPeriodId: String(res.data.id) }));
      setPeriodForm(initialPeriodForm);
      setShowPeriodForm(false);
      fetchReminders();
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to create exam period");
    }
    setPeriodLoading(false);
  };

  // ── Exam form ──────────────────────────────────────────────────────────────

  const validateTimes = (start: string, end: string) => {
    if (!start || !end) return true;
    if (end <= start) {
      setTimeError("End time must be after start time");
      return false;
    }
    setTimeError("");
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "startTime") {
        next.endTime =
          value && selectedPeriodDuration
            ? addMinutes(value, selectedPeriodDuration)
            : "";
        validateTimes(value, next.endTime);
      }
      if (name === "endTime") validateTimes(prev.startTime, value);

      if (["startTime", "endTime", "examPeriodId"].includes(name)) {
        next.roomId = "";
        setAvailableRooms([]);
        setRoomsFetched(false);
      }

      if (name === "examPeriodId") {
        const period = examPeriods.find((ep) => String(ep.id) === value);
        if (prev.startTime && period) {
          next.endTime = addMinutes(prev.startTime, period.durationMinutes);
        }
      }

      return next;
    });

    if (name === "subjectId") {
      setForm((prev) => ({ ...prev, subjectId: value, teacherId: "" }));
      setFilteredTeachers(
        teachers.filter((t) => t.subjects?.some((s) => s.id === Number(value))),
      );
    }
  };

  const checkRooms = async () => {
    const { date, startTime, endTime } = form;
    if (!date || !startTime || !endTime) {
      showError("Select date and time first");
      return;
    }
    if (!validateTimes(startTime, endTime)) return;
    setRoomsLoading(true);
    setRoomsFetched(false);
    setForm((prev) => ({ ...prev, roomId: "" }));
    try {
      const res = await api.get("/rooms/available", {
        params: { date, startTime, endTime },
      });
      setAvailableRooms(res.data);
      setRoomsFetched(true);
    } catch {
      showError("Could not fetch available rooms");
    }
    setRoomsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.roomId) {
      showError("Please select a room");
      return;
    }
    if (!form.examPeriodId) {
      showError("Please select an exam period");
      return;
    }
    if (timeError) return;

    const period = examPeriods.find(
      (ep) => String(ep.id) === form.examPeriodId,
    );
    setLoading(true);
    try {
      await api.post("/exams", {
        examPeriodId: Number(form.examPeriodId),
        classId: Number(form.classId),
        subjectId: Number(form.subjectId),
        teacherId: Number(form.teacherId),
        roomId: Number(form.roomId),
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        examType: period?.examType,
      });
      showSuccess("Exam scheduled successfully!");
      setForm(initialForm);
      setAvailableRooms([]);
      setRoomsFetched(false);
      fetchAll();
      fetchReminders();
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to create exam");
    }
    setLoading(false);
  };

  const isTimeReady = form.date && form.startTime && form.endTime && !timeError;
  const allComplete = reminderData?.completeness.allComplete ?? false;
  const incompleteClasses = reminderData?.completeness.incompleteClasses ?? [];

  return (
    <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Schedule Exam</h2>

      {/* ── Exam Periods ──────────────────────────────────────────────────── */}
      <section
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          marginBottom: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            background: "#f9fafb",
            borderBottom: examPeriods.length > 0 ? "1px solid #e5e7eb" : "none",
          }}
        >
          <div>
            <span style={{ fontWeight: 600, fontSize: "14px" }}>
              Exam Periods
            </span>
            {examPeriods.length > 0 && (
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                {examPeriods.length} period{examPeriods.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setShowPeriodForm((v) => !v);
              setPeriodDateError("");
            }}
            style={{
              fontSize: "13px",
              padding: "5px 14px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              background: showPeriodForm ? "#f3f4f6" : "white",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {showPeriodForm ? "✕ Cancel" : "+ New Period"}
          </button>
        </div>

        {/* ── Period creation form ── */}
        {showPeriodForm && (
          <form
            onSubmit={handleCreatePeriod}
            style={{
              padding: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              borderBottom:
                examPeriods.length > 0 ? "1px solid #e5e7eb" : "none",
              background: "#fafafa",
            }}
          >
            {/* Row 1: term type dropdown + auto-filled editable name */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <Field label="Term type *">
                <select
                  name="examType"
                  value={periodForm.examType}
                  onChange={handlePeriodChange}
                  required
                >
                  <option value="">Select term type</option>
                  {EXAM_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Period name (auto-filled, editable)">
                <input
                  type="text"
                  name="name"
                  value={periodForm.name}
                  onChange={handlePeriodChange}
                  placeholder="Select a term type first"
                  required
                />
              </Field>
            </div>

            {/* Row 2: dates + duration + submit */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 130px auto",
                gap: "12px",
                alignItems: "flex-end",
              }}
            >
              <Field label="Start date">
                <input
                  type="date"
                  name="startDate"
                  value={periodForm.startDate}
                  onChange={handlePeriodChange}
                  required
                />
              </Field>
              <Field label="End date">
                <input
                  type="date"
                  name="endDate"
                  value={periodForm.endDate}
                  onChange={handlePeriodChange}
                  min={periodForm.startDate || undefined}
                  required
                />
              </Field>
              <Field label="Duration (min)">
                <input
                  type="number"
                  name="durationMinutes"
                  value={periodForm.durationMinutes}
                  onChange={handlePeriodChange}
                  min={30}
                  max={300}
                  required
                />
              </Field>
              <button
                type="submit"
                disabled={
                  periodLoading || !!periodDateError || !periodForm.examType
                }
                style={{
                  padding: "8px 18px",
                  borderRadius: "6px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  cursor: periodLoading ? "not-allowed" : "pointer",
                  fontWeight: 500,
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                }}
              >
                {periodLoading ? "Creating..." : "Create"}
              </button>
            </div>

            {periodForm.examType && (
              <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
                Default duration for{" "}
                {EXAM_TYPES.find((t) => t.value === periodForm.examType)?.label}
                :{" "}
                {
                  EXAM_TYPES.find((t) => t.value === periodForm.examType)
                    ?.defaultDuration
                }{" "}
                min — adjust above if needed.
              </p>
            )}
            {periodDateError && (
              <p style={{ color: "red", fontSize: "13px", margin: 0 }}>
                {periodDateError}
              </p>
            )}
          </form>
        )}

        {/* Periods list */}
        {examPeriods.length > 0 ? (
          <div
            style={{
              padding: "12px 18px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {examPeriods.map((ep) => {
              const today = new Date().toISOString().split("T")[0];
              const isActive = ep.startDate <= today && ep.endDate >= today;
              const isPast = ep.endDate < today;
              return (
                <div
                  key={ep.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13px",
                    padding: "6px 0",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: isActive
                        ? "#22c55e"
                        : isPast
                          ? "#d1d5db"
                          : "#fbbf24",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontWeight: 500, flex: 1 }}>{ep.name}</span>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "99px",
                      background: "#f1f5f9",
                      color: "#475569",
                    }}
                  >
                    {ep.examType}
                  </span>
                  <span style={{ color: "#6b7280", fontSize: "12px" }}>
                    {ep.durationMinutes} min
                  </span>
                  <span style={{ color: "#6b7280" }}>
                    {ep.startDate} – {ep.endDate}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "99px",
                      background: isActive
                        ? "#dcfce7"
                        : isPast
                          ? "#f3f4f6"
                          : "#fef9c3",
                      color: isActive
                        ? "#15803d"
                        : isPast
                          ? "#9ca3af"
                          : "#92400e",
                    }}
                  >
                    {isActive ? "Active" : isPast ? "Past" : "Upcoming"}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          !showPeriodForm && (
            <div
              style={{
                padding: "20px 18px",
                color: "#6b7280",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              No exam periods yet. Create one to get started.
            </div>
          )
        )}
      </section>

      {/* ── Reminders + Auto-scheduler ─────────────────────────────────────── */}
      {reminderData && (
        <section
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            marginBottom: "28px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 18px",
              background: allComplete
                ? "#f0fdf4"
                : !reminderData.hasActivePeriod
                  ? "#fef2f2"
                  : "#fffbeb",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "16px" }}>
              {allComplete ? "✅" : !reminderData.hasActivePeriod ? "🔴" : "🟡"}
            </span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 500,
                flex: 1,
                color: allComplete
                  ? "#15803d"
                  : !reminderData.hasActivePeriod
                    ? "#dc2626"
                    : "#92400e",
              }}
            >
              {allComplete
                ? "All exams are scheduled for the active period."
                : !reminderData.hasActivePeriod
                  ? "No active exam period — create one above."
                  : `${reminderData.completeness.completeClasses}/${reminderData.completeness.totalClasses} classes have all exams scheduled.`}
            </span>
            {!allComplete &&
              reminderData.hasActivePeriod &&
              incompleteClasses.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowIncomplete((v) => !v)}
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {showIncomplete
                    ? "Hide details"
                    : `Show ${incompleteClasses.length} class(es)`}
                </button>
              )}
          </div>

          {showIncomplete && incompleteClasses.length > 0 && (
            <div
              style={{
                padding: "12px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                borderBottom: "1px solid #e5e7eb",
                background: "#fafafa",
              }}
            >
              {incompleteClasses.map((c) => (
                <div
                  key={c.classId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ fontWeight: 600, minWidth: "110px" }}>
                    Grade {c.grade}-{c.section}
                  </span>
                  <span style={{ color: "#6b7280", flex: 1 }}>
                    Missing: {c.missingSubjects.join(", ")}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        classId: String(c.classId),
                      }));
                      window.scrollTo({ top: 400, behavior: "smooth" });
                    }}
                    style={{
                      fontSize: "12px",
                      color: "#2563eb",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Fill ↓
                  </button>
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={runAutoSchedule}
              disabled={
                autoLoading || !reminderData.hasActivePeriod || allComplete
              }
              style={{
                padding: "9px 20px",
                borderRadius: "7px",
                border: "none",
                background:
                  autoLoading || !reminderData.hasActivePeriod || allComplete
                    ? "#e5e7eb"
                    : "#0f172a",
                color:
                  autoLoading || !reminderData.hasActivePeriod || allComplete
                    ? "#9ca3af"
                    : "white",
                fontWeight: 600,
                fontSize: "13px",
                cursor:
                  autoLoading || !reminderData.hasActivePeriod || allComplete
                    ? "not-allowed"
                    : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              📅{" "}
              {autoLoading
                ? "Scheduling..."
                : allComplete
                  ? "All Scheduled"
                  : "Auto-Schedule Exams"}
            </button>
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>
              Uses each period's duration to set exam end times automatically.
            </span>
          </div>

          {autoResult && (
            <div
              style={{
                margin: "0 18px 14px",
                padding: "12px 14px",
                borderRadius: "8px",
                background:
                  autoResult.errors.length > 0 ? "#fef2f2" : "#f0fdf4",
                border: `1px solid ${autoResult.errors.length > 0 ? "#fecaca" : "#bbf7d0"}`,
                fontSize: "13px",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: autoResult.errors.length > 0 ? "6px" : 0,
                  color: autoResult.errors.length > 0 ? "#dc2626" : "#15803d",
                }}
              >
                ✓ {autoResult.scheduled} exam(s) scheduled
                {autoResult.skipped > 0 && `, ${autoResult.skipped} skipped`}
              </div>
              {autoResult.errors.map((e, i) => (
                <div key={i} style={{ color: "#dc2626", marginTop: "3px" }}>
                  • {e}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Active period banner */}
      {activeExamPeriod ? (
        <div
          style={{
            background: "#fefce8",
            border: "1px solid #fde047",
            borderRadius: "8px",
            padding: "10px 16px",
            marginBottom: "24px",
            fontSize: "14px",
          }}
        >
          Active: <strong>{activeExamPeriod.name}</strong> (
          {activeExamPeriod.examType} · {activeExamPeriod.durationMinutes} min ·{" "}
          {activeExamPeriod.startDate} – {activeExamPeriod.endDate})
        </div>
      ) : (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fca5a5",
            borderRadius: "8px",
            padding: "10px 16px",
            marginBottom: "24px",
            fontSize: "14px",
          }}
        >
          No active exam period today. Create one above before scheduling exams.
        </div>
      )}

      {/* ── Exam scheduling form ───────────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Field label="Exam Period">
          <select
            name="examPeriodId"
            value={form.examPeriodId}
            onChange={handleChange}
            required
          >
            <option value="">Select exam period</option>
            {examPeriods.map((ep) => (
              <option key={ep.id} value={ep.id}>
                {ep.name} — {ep.examType} ({ep.durationMinutes} min ·{" "}
                {ep.startDate} – {ep.endDate})
              </option>
            ))}
          </select>
        </Field>

        <Field label="Class">
          <select
            name="classId"
            value={form.classId}
            onChange={handleChange}
            required
          >
            <option value="">Select class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                Grade {c.grade}-{c.section}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Subject">
          <select
            name="subjectId"
            value={form.subjectId}
            onChange={handleChange}
            required
          >
            <option value="">Select subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Teacher">
          <select
            name="teacherId"
            value={form.teacherId}
            onChange={handleChange}
            required
            disabled={!form.subjectId}
          >
            <option value="">
              {form.subjectId ? "Select teacher" : "Select a subject first"}
            </option>
            {filteredTeachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.fullName}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Date">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </Field>

        <Field
          label={`Time slot${selectedPeriodDuration ? ` — end auto-set to ${selectedPeriodDuration} min` : ""}`}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              required
            />
          </div>
          {timeError && (
            <p style={{ color: "red", fontSize: "13px", margin: "4px 0 0" }}>
              {timeError}
            </p>
          )}
        </Field>

        <button
          type="button"
          onClick={checkRooms}
          disabled={!isTimeReady || roomsLoading}
        >
          {roomsLoading ? "Checking..." : "Check available rooms"}
        </button>

        {roomsFetched && availableRooms.length > 0 && (
          <Field label="Room">
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {availableRooms.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, roomId: String(r.id) }))
                  }
                  style={{
                    padding: "6px 14px",
                    borderRadius: "6px",
                    border: "1px solid",
                    borderColor:
                      form.roomId === String(r.id) ? "#2563eb" : "#d1d5db",
                    background:
                      form.roomId === String(r.id) ? "#eff6ff" : "white",
                    cursor: "pointer",
                  }}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </Field>
        )}

        {roomsFetched && availableRooms.length === 0 && (
          <p style={{ color: "red", fontSize: "13px" }}>
            No rooms available for this time slot
          </p>
        )}

        <button type="submit" disabled={loading || !form.roomId}>
          {loading ? "Scheduling..." : "Schedule Exam"}
        </button>
      </form>

      {/* ── Date sheet ─────────────────────────────────────────────────────── */}
      <h3 style={{ marginTop: "48px" }}>Exam Date Sheet</h3>
      {exams.length === 0 ? (
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          No exams scheduled yet.
        </p>
      ) : (
        <table
          border={1}
          cellPadding={8}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th>Class</th>
              <th>Subject</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Room</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>
                  Grade {exam.schoolClass?.grade}-{exam.schoolClass?.section}
                </td>
                <td>{exam.subject?.name}</td>
                <td>{exam.examType}</td>
                <td>{exam.date}</td>
                <td>
                  {exam.startTime} – {exam.endTime}
                </td>
                <td>{exam.room?.name}</td>
                <td>{exam.teacher?.fullName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
