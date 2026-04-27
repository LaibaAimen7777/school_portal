"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";

interface SchoolConfig {
  id: number;
  schoolStartTime: string;
  schoolEndTime: string;
  periodDurationMinutes: number;
  breakDurationMinutes: number;
  updatedAt: string;
}

//to prevent conflict in the schedules
interface ConflictItem {
  id: number;
  class: string;
  subject: string;
  teacher: string;
  day: string;
  slot: string;
  issue: string;
}

export default function SchoolConfigPage() {
  const [config, setConfig] = useState<SchoolConfig | null>(null);
  const [form, setForm] = useState({
    schoolStartTime: "",
    schoolEndTime: "",
    periodDurationMinutes: 40,
    breakDurationMinutes: 5,
  });
  const [conflicts, setConflicts] = useState<ConflictItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [timeError, setTimeError] = useState("");
  const [showConflicts, setShowConflicts] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setFetching(true);
    try {
      const res = await api.get("/school-config");
      setConfig(res.data);
      setForm({
        schoolStartTime: res.data.schoolStartTime,
        schoolEndTime: res.data.schoolEndTime,
        periodDurationMinutes: res.data.periodDurationMinutes,
        breakDurationMinutes: res.data.breakDurationMinutes,
      });
    } catch {
      showError("Failed to load school config");
    }
    setFetching(false);
  };

  const validateTimes = (start: string, end: string) => {
    if (!start || !end) return true;
    if (end <= start) {
      setTimeError("End time must be after start time");
      return false;
    }
    setTimeError("");
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = {
        ...prev,
        [name]: name.includes("Duration") ? Number(value) : value,
      };
      if (name === "schoolStartTime" || name === "schoolEndTime") {
        validateTimes(
          name === "schoolStartTime" ? value : prev.schoolStartTime,
          name === "schoolEndTime" ? value : prev.schoolEndTime,
        );
      }
      return next;
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (timeError) return;
    if (!validateTimes(form.schoolStartTime, form.schoolEndTime)) return;

    setLoading(true);
    setConflicts([]);
    setShowConflicts(false);

    try {
      const res = await api.patch("/school-config", form);
      setConfig(res.data.config);

      if (res.data.conflicts?.length > 0) {
        setConflicts(res.data.conflicts);
        setShowConflicts(true);
        showError(
          `Timing saved but ${res.data.conflicts.length} schedule(s) now fall outside school hours`,
        );
      } else {
        showSuccess("School config updated successfully!");
      }
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to update config");
    }

    setLoading(false);
  };

  const handleDeleteConflict = async (scheduleId: number) => {
    try {
      await api.delete(`/schedule/${scheduleId}`);
      setConflicts((prev) => prev.filter((c) => c.id !== scheduleId));
      showSuccess("Schedule removed");
    } catch {
      showError("Failed to remove schedule");
    }
  };

  // Compute preview of period slots
  const computePeriods = () => {
    if (!form.schoolStartTime || !form.schoolEndTime) return [];
    const periods: { label: string; start: string; end: string }[] = [];
    const toMins = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };
    const toTime = (mins: number) => {
      const h = Math.floor(mins / 60)
        .toString()
        .padStart(2, "0");
      const m = (mins % 60).toString().padStart(2, "0");
      return `${h}:${m}`;
    };

    let cursor = toMins(form.schoolStartTime);
    const end = toMins(form.schoolEndTime);
    let i = 1;

    while (cursor + form.periodDurationMinutes <= end) {
      const pEnd = cursor + form.periodDurationMinutes;
      periods.push({
        label: `Period ${i}`,
        start: toTime(cursor),
        end: toTime(pEnd),
      });
      cursor = pEnd + form.breakDurationMinutes;
      i++;
    }

    return periods;
  };

  const periods = computePeriods();

  if (fetching) {
    return <div style={{ padding: "32px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "32px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "4px" }}>School Configuration</h2>
      {config && (
        <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "32px" }}>
          Last updated: {new Date(config.updatedAt).toLocaleString()}
        </p>
      )}

      <form
        onSubmit={handleSave}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* Timings */}
        <section>
          <h3 style={{ marginBottom: "12px", fontSize: "15px" }}>
            School Hours
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Field label="Start time">
              <input
                type="time"
                name="schoolStartTime"
                value={form.schoolStartTime}
                onChange={handleChange}
                required
              />
            </Field>
            <Field label="End time">
              <input
                type="time"
                name="schoolEndTime"
                value={form.schoolEndTime}
                onChange={handleChange}
                required
              />
            </Field>
          </div>
          {timeError && (
            <p style={{ color: "red", fontSize: "13px", marginTop: "6px" }}>
              {timeError}
            </p>
          )}
        </section>

        {/* Period settings */}
        <section>
          <h3 style={{ marginBottom: "12px", fontSize: "15px" }}>
            Period Settings
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Field label="Period duration (minutes)">
              <input
                type="number"
                name="periodDurationMinutes"
                value={form.periodDurationMinutes}
                onChange={handleChange}
                min={20}
                max={120}
                required
              />
            </Field>
            <Field label="Break duration (minutes)">
              <input
                type="number"
                name="breakDurationMinutes"
                value={form.breakDurationMinutes}
                onChange={handleChange}
                min={0}
                max={30}
                required
              />
            </Field>
          </div>
        </section>

        {/* Period preview */}
        {periods.length > 0 && (
          <section>
            <h3 style={{ marginBottom: "12px", fontSize: "15px" }}>
              Period Preview{" "}
              <span
                style={{ fontWeight: 400, color: "#6b7280", fontSize: "13px" }}
              >
                ({periods.length} periods fit in these hours)
              </span>
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {periods.map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: "6px 12px",
                    background: "#f1f5f9",
                    borderRadius: "6px",
                    fontSize: "13px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <strong>{p.label}</strong> {p.start} – {p.end}
                </div>
              ))}
            </div>
            {periods.length === 0 && (
              <p style={{ color: "#6b7280", fontSize: "13px" }}>
                No full periods fit in the selected hours.
              </p>
            )}
          </section>
        )}

        <button
          type="submit"
          disabled={loading || !!timeError}
          style={{ alignSelf: "flex-start", padding: "10px 24px" }}
        >
          {loading ? "Saving..." : "Save Configuration"}
        </button>
      </form>

      {/* Conflict panel */}
      {showConflicts && conflicts.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            border: "1px solid #fca5a5",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#fef2f2",
              padding: "12px 16px",
              borderBottom: "1px solid #fca5a5",
            }}
          >
            <strong style={{ color: "#b91c1c" }}>
              ⚠️ {conflicts.length} schedule(s) now fall outside school hours
            </strong>
            <p
              style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}
            >
              These must be deleted or rescheduled to avoid conflicts.
            </p>
          </div>

          <table
            cellPadding={10}
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#fafafa",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <th style={{ textAlign: "left" }}>Class</th>
                <th style={{ textAlign: "left" }}>Subject</th>
                <th style={{ textAlign: "left" }}>Teacher</th>
                <th style={{ textAlign: "left" }}>Day</th>
                <th style={{ textAlign: "left" }}>Slot</th>
                <th style={{ textAlign: "left" }}>Issue</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {conflicts.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td>{c.class}</td>
                  <td>{c.subject}</td>
                  <td>{c.teacher}</td>
                  <td>{c.day}</td>
                  <td>{c.slot}</td>
                  <td style={{ color: "#b91c1c", fontSize: "12px" }}>
                    {c.issue}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteConflict(c.id)}
                      style={{
                        color: "#dc2626",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                        padding: "2px 8px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
