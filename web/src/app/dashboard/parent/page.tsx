"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

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

  if (loading)
    return (
      <Screen>
        <p style={{ color: "#64748b" }}>Loading portal…</p>
      </Screen>
    );
  if (error)
    return (
      <Screen>
        <p style={{ color: "#dc2626" }}>{error}</p>
      </Screen>
    );
  if (!data || data.children.length === 0)
    return (
      <Screen>
        <p style={{ color: "#64748b" }}>No children linked to this account.</p>
      </Screen>
    );

  const child = data.children[activeChild];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ background: "#0f172a", padding: "24px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              margin: "0 0 2px",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "#94a3b8",
              textTransform: "uppercase",
            }}
          >
            Parent Portal
          </p>
          <h1
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: 700,
              color: "white",
            }}
          >
            {data.parent.fatherName} / {data.parent.motherName}
          </h1>
        </div>
      </div>

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}
      >
        {/* Child switcher */}
        {data.children.length > 1 && (
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            {data.children.map((c, i) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveChild(i);
                  setActiveTab("Schedule");
                }}
                style={{
                  padding: "9px 20px",
                  borderRadius: "99px",
                  border: "2px solid",
                  borderColor: i === activeChild ? "#0f172a" : "#e2e8f0",
                  background: i === activeChild ? "#0f172a" : "white",
                  color: i === activeChild ? "white" : "#374151",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                {c.firstName} {c.lastName}
              </button>
            ))}
          </div>
        )}

        {/* Child header */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "22px 26px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "13px",
              background: "#0f172a",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "18px",
              flexShrink: 0,
            }}
          >
            {child.firstName[0]}
            {child.lastName[0]}
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{ fontWeight: 700, fontSize: "17px", marginBottom: "3px" }}
            >
              {child.firstName} {child.lastName}
            </div>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              Roll #{child.rollNumber}
              {child.schoolClass &&
                ` · Grade ${child.schoolClass.grade}-${child.schoolClass.section}`}
            </div>
          </div>

          {/* Attendance pills */}
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              {
                label: "Attendance",
                value:
                  child.attendance.percentage != null
                    ? `${child.attendance.percentage}%`
                    : "—",
                color: pctColor(child.attendance.percentage),
              },
              {
                label: "Present",
                value: child.attendance.present,
                color: "#15803d",
              },
              {
                label: "Absent",
                value: child.attendance.absent,
                color: "#dc2626",
              },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{ fontSize: "19px", fontWeight: 700, color: s.color }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "16px",
            background: "white",
            padding: "5px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "9px 12px",
                borderRadius: "8px",
                border: "none",
                background: tab === activeTab ? "#0f172a" : "transparent",
                color: tab === activeTab ? "white" : "#64748b",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
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
        </div>
      </div>
    </div>
  );
}

// ── Schedule ──────────────────────────────────────────────────────────────────
function ScheduleTab({ schedule }: { schedule: ScheduleItem[] }) {
  if (!schedule.length) return <Empty text="No schedule set yet." />;

  const byDay = DAYS.reduce<Record<string, ScheduleItem[]>>((acc, d) => {
    acc[d] = schedule
      .filter((s) => s.dayOfWeek === d)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    return acc;
  }, {});

  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "22px",
      }}
    >
      {DAYS.filter((d) => byDay[d].length > 0).map((day) => (
        <div key={day}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#94a3b8",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            {day[0] + day.slice(1).toLowerCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {byDay[day].map((s) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "11px 15px",
                  background: "#f8fafc",
                  borderRadius: "9px",
                  border: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    minWidth: "108px",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.startTime} – {s.endTime}
                </div>
                <div style={{ fontWeight: 600, fontSize: "14px", flex: 1 }}>
                  {s.subject ?? "—"}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>
                  {s.teacher ?? "—"}
                </div>
                {s.room && (
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 9px",
                      background: "#e2e8f0",
                      borderRadius: "99px",
                      color: "#475569",
                    }}
                  >
                    {s.room}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Teachers ──────────────────────────────────────────────────────────────────
function TeachersTab({ teachers }: { teachers: Teacher[] }) {
  if (!teachers.length) return <Empty text="No teachers assigned yet." />;
  return (
    <div
      style={{
        padding: "24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
        gap: "12px",
      }}
    >
      {teachers.map((t) => (
        <div
          key={t.id}
          style={{
            padding: "16px",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            display: "flex",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "9px",
              background: "#0f172a",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "14px",
              flexShrink: 0,
            }}
          >
            {t.fullName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <div
              style={{ fontWeight: 600, fontSize: "14px", marginBottom: "6px" }}
            >
              {t.fullName}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {t.subjects.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: "11px",
                    padding: "2px 8px",
                    background: "#f1f5f9",
                    borderRadius: "99px",
                    color: "#475569",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Attendance ────────────────────────────────────────────────────────────────
function AttendanceTab({ attendance }: { attendance: Child["attendance"] }) {
  const pct = attendance.percentage;
  return (
    <div style={{ padding: "24px" }}>
      {/* Progress bar */}
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "14px" }}>
            Overall attendance
          </span>
          <span style={{ fontWeight: 700, color: pctColor(pct) }}>
            {pct != null ? `${pct}%` : "—"}
          </span>
        </div>
        <div
          style={{
            height: "9px",
            background: "#f1f5f9",
            borderRadius: "99px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct ?? 0}%`,
              background: pctColor(pct),
              borderRadius: "99px",
              transition: "width 0.5s",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "12px",
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          <span>
            Total:{" "}
            <strong style={{ color: "#0f172a" }}>{attendance.total}</strong>
          </span>
          <span style={{ color: "#15803d" }}>
            Present: <strong>{attendance.present}</strong>
          </span>
          <span style={{ color: "#dc2626" }}>
            Absent: <strong>{attendance.absent}</strong>
          </span>
        </div>
      </div>

      {/* Recent records */}
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "#94a3b8",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        Recent records
      </div>
      {attendance.recent.length === 0 ? (
        <Empty text="No attendance records yet." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {attendance.recent.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 14px",
                background: "#f8fafc",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  minWidth: "100px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {r.date}
              </div>
              <div style={{ flex: 1, fontSize: "13px" }}>
                {r.subject ?? "—"}
              </div>
              <span
                style={{
                  fontSize: "11px",
                  padding: "3px 10px",
                  borderRadius: "99px",
                  fontWeight: 600,
                  background: r.status === "PRESENT" ? "#dcfce7" : "#fee2e2",
                  color: r.status === "PRESENT" ? "#15803d" : "#dc2626",
                }}
              >
                {r.status === "PRESENT" ? "Present" : "Absent"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Marks ─────────────────────────────────────────────────────────────────────
function MarksTab({ marks }: { marks: Mark[] }) {
  if (!marks.length) return <Empty text="No exam results yet." />;
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
            {["Subject", "Type", "Period", "Date", "Score"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "13px 20px",
                  textAlign: "left",
                  fontWeight: 600,
                  color: "#94a3b8",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {marks.map((m) => (
            <tr key={m.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "12px 20px", fontWeight: 500 }}>
                {m.subject ?? "—"}
              </td>
              <td style={{ padding: "12px 20px", color: "#64748b" }}>
                {m.examType ?? "—"}
              </td>
              <td style={{ padding: "12px 20px", color: "#64748b" }}>
                {m.examPeriod ?? "—"}
              </td>
              <td
                style={{
                  padding: "12px 20px",
                  color: "#64748b",
                  whiteSpace: "nowrap",
                }}
              >
                {m.date ?? "—"}
              </td>
              <td style={{ padding: "12px 20px" }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "15px",
                    color: scoreColor(m.score),
                  }}
                >
                  {m.score}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Shared helpers ────────────────────────────────────────────────────────────
function pctColor(pct: number | null) {
  if (pct == null) return "#64748b";
  if (pct >= 85) return "#15803d";
  if (pct >= 70) return "#92400e";
  return "#dc2626";
}

function scoreColor(score: number) {
  if (score >= 80) return "#15803d";
  if (score >= 60) return "#92400e";
  return "#dc2626";
}

function Empty({ text }: { text: string }) {
  return (
    <div
      style={{
        padding: "48px 24px",
        textAlign: "center",
        color: "#94a3b8",
        fontSize: "14px",
      }}
    >
      {text}
    </div>
  );
}

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
