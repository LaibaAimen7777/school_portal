// src/components/admin/DashboardReminders.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

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
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Auto-schedule card */}
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "20px",
          background: "white",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <button
            onClick={() => runAutoSchedule(false)}
            disabled={autoLoading || completeness.allComplete}
            style={{
              whiteSpace: "nowrap",
              padding: "8px 18px",
              borderRadius: "6px",
              border: "none",
              background: completeness.allComplete ? "#e5e7eb" : "#2563eb",
              color: completeness.allComplete ? "#9ca3af" : "white",
              cursor: completeness.allComplete ? "not-allowed" : "pointer",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            {autoLoading
              ? "Running..."
              : completeness.allComplete
                ? "All scheduled ✓"
                : "Run Auto-Schedule"}
          </button>

          {/* Regenerate — always available */}
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              disabled={autoLoading}
              style={{
                whiteSpace: "nowrap",
                padding: "8px 18px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                background: "white",
                color: "#374151",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              🔄 Regenerate
            </button>
          ) : (
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "12px",
                  color: "#b91c1c",
                  whiteSpace: "nowrap",
                }}
              >
                Clears all schedules!
              </span>
              <button
                onClick={() => runAutoSchedule(true)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#dc2626",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "1px solid #e2e8f0",
                  background: "white",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Auto-schedule result */}
        {autoResult && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              borderRadius: "6px",
              background: autoResult.errors.length > 0 ? "#fef9c3" : "#f0fdf4",
              border: `1px solid ${autoResult.errors.length > 0 ? "#fde047" : "#86efac"}`,
              fontSize: "13px",
            }}
          >
            <p style={{ margin: "0 0 4px", fontWeight: 500 }}>
              ✅ {autoResult.scheduled} slot(s) scheduled
              {autoResult.skipped > 0 && `, ⚠️ ${autoResult.skipped} skipped`}
            </p>
            {autoResult.errors.map((e, i) => (
              <p key={i} style={{ margin: "2px 0", color: "#b45309" }}>
                • {e}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Reminders */}
      {hasIssues && (
        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            overflow: "hidden",
            background: "white",
          }}
        >
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid #f3f4f6",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            ⚠️ Action Required ({reminders.length})
          </div>

          {reminders.map((r, i) => (
            <div
              key={i}
              style={{
                padding: "12px 20px",
                borderBottom:
                  i < reminders.length - 1 ? "1px solid #f9fafb" : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                background: r.type === "error" ? "#fef2f2" : "#fffbeb",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: r.type === "error" ? "#b91c1c" : "#92400e",
                }}
              >
                {r.type === "error" ? "🔴" : "🟡"} {r.message}
              </span>
              {r.link && (
                <button
                  onClick={() => router.push(r.link!)}
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                    padding: "4px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  Fix →
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Incomplete classes detail */}
      {completeness.incompleteClasses.length > 0 && (
        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            overflow: "hidden",
            background: "white",
          }}
        >
          <button
            onClick={() =>
              setExpanded(expanded === "classes" ? null : "classes")
            }
            style={{
              width: "100%",
              padding: "14px 20px",
              border: "none",
              borderBottom:
                expanded === "classes" ? "1px solid #f3f4f6" : "none",
              background: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            <span>
              📋 Schedule completeness — {completeness.completeClasses}/
              {completeness.totalClasses} classes done
            </span>
            <span>{expanded === "classes" ? "▲" : "▼"}</span>
          </button>

          {expanded === "classes" && (
            <div>
              {completeness.incompleteClasses.map((c) => (
                <div
                  key={c.classId}
                  style={{
                    padding: "10px 20px",
                    borderBottom: "1px solid #f9fafb",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "13px",
                  }}
                >
                  <div>
                    <strong>
                      Grade {c.grade}-{c.section}
                    </strong>
                    <span style={{ color: "#6b7280", marginLeft: "8px" }}>
                      Missing: {c.missingSubjects.join(", ")}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard/admin/schedule/create?classId=${c.classId}`,
                      )
                    }
                    style={{
                      fontSize: "12px",
                      padding: "4px 10px",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    Schedule →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Teacher workload detail */}
      {(workload.overloadedTeachers.length > 0 ||
        workload.uncoveredSubjects.length > 0) && (
        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            overflow: "hidden",
            background: "white",
          }}
        >
          <button
            onClick={() =>
              setExpanded(expanded === "teachers" ? null : "teachers")
            }
            style={{
              width: "100%",
              padding: "14px 20px",
              border: "none",
              borderBottom:
                expanded === "teachers" ? "1px solid #f3f4f6" : "none",
              background: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            <span>👨‍🏫 Teacher workload issues</span>
            <span>{expanded === "teachers" ? "▲" : "▼"}</span>
          </button>

          {expanded === "teachers" && (
            <div>
              {workload.uncoveredSubjects.length > 0 && (
                <div
                  style={{
                    padding: "12px 20px",
                    borderBottom: "1px solid #f9fafb",
                    background: "#fef2f2",
                    fontSize: "13px",
                    color: "#b91c1c",
                  }}
                >
                  🔴 Subjects with no teacher:{" "}
                  {workload.uncoveredSubjects.join(", ")}
                </div>
              )}
              {workload.overloadedTeachers.map((t, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 20px",
                    borderBottom: "1px solid #f9fafb",
                    fontSize: "13px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>🟡 {t.teacherName}</span>
                  <span style={{ color: "#92400e" }}>
                    {t.weeklyPeriods} periods/week
                  </span>
                </div>
              ))}
              <div style={{ padding: "10px 20px" }}>
                <button
                  onClick={() => router.push("/dashboard/admin/create-teacher")}
                  style={{
                    fontSize: "13px",
                    padding: "6px 14px",
                    border: "1px solid #2563eb",
                    borderRadius: "6px",
                    background: "white",
                    color: "#2563eb",
                    cursor: "pointer",
                  }}
                >
                  + Add new teacher
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!hasIssues && (
        <div
          style={{
            padding: "16px 20px",
            borderRadius: "10px",
            background: "#f0fdf4",
            border: "1px solid #86efac",
            fontSize: "13px",
            color: "#166534",
          }}
        >
          ✅ All classes are fully scheduled and teacher workloads look healthy.
        </div>
      )}
    </div>
  );
}
