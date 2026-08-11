"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";
import * as S from "@/wrappers/schoolConfigStyles";

interface SchoolConfig {
  id: number;
  schoolStartTime: string;
  schoolEndTime: string;
  periodDurationMinutes: number;
  breakDurationMinutes: number;
  breakAfterPeriod: number;
  fridayEndTime: string | null;
  updatedAt: string;
}

interface GradeOverride {
  id: number;
  grade: number;
  endTime: string | null;
  fridayEndTime: string | null;
}

interface ConflictItem {
  id: number;
  class: string;
  subject: string;
  teacher: string;
  day: string;
  slot: string;
  issue: string;
}

interface ClassItem {
  id: number;
  grade: number;
  section: string;
  maxStrength: number;
  currentStrength: number;
}

type PeriodEntry = {
  label: string;
  start: string;
  end: string;
  isBreakAfter: boolean; // break comes after this period
};

export default function SchoolConfigPage() {
  const [config, setConfig] = useState<SchoolConfig | null>(null);
  const [form, setForm] = useState({
    schoolStartTime: "",
    schoolEndTime: "",
    periodDurationMinutes: 40,
    breakDurationMinutes: 20,
    breakAfterPeriod: 4,
    fridayEndTime: "",
  });
  const [conflicts, setConflicts] = useState<ConflictItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [timeError, setTimeError] = useState("");
  const [showConflicts, setShowConflicts] = useState(false);

  // Classes state
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [newGrade, setNewGrade] = useState<number>(1);
  const [newSection, setNewSection] = useState<string>("A");
  const [newMaxStrength, setNewMaxStrength] = useState<number>(30);
  const [addingClass, setAddingClass] = useState(false);

  // Grade overrides state
  const [gradeOverrides, setGradeOverrides] = useState<GradeOverride[]>([]);
  const [newOverride, setNewOverride] = useState({
    grade: 1,
    endTime: "",
    fridayEndTime: "",
  });
  const [addingOverride, setAddingOverride] = useState(false);

  // Period preview: which grade to preview (null = school default)
  const [previewGrade, setPreviewGrade] = useState<number | "">("");

  useEffect(() => {
    fetchConfig();
    fetchClasses();
    fetchGradeOverrides();
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
        breakAfterPeriod: res.data.breakAfterPeriod ?? 4,
        fridayEndTime: res.data.fridayEndTime ?? "",
      });
    } catch {
      showError("Failed to load school config");
    }
    setFetching(false);
  };

  const fetchClasses = async () => {
    const res = await api.get("/school-class");
    setClasses(res.data);
  };

  const fetchGradeOverrides = async () => {
    try {
      const res = await api.get("/school-config/grade-overrides");
      setGradeOverrides(res.data);
    } catch {
      // fail silently — table may not exist yet
    }
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
      const isNumeric =
        name.includes("Duration") || name === "breakAfterPeriod";
      const next = { ...prev, [name]: isNumeric ? Number(value) : value };
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
      const res = await api.patch("/school-config", {
        ...form,
        fridayEndTime: form.fridayEndTime || null,
      });
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

  const handleAddOverride = async () => {
    if (!newOverride.endTime && !newOverride.fridayEndTime) {
      return showError("Set at least one time override");
    }
    if (gradeOverrides.find((o) => o.grade === newOverride.grade)) {
      return showError(
        `Grade ${newOverride.grade} already has an override — edit or delete it first`,
      );
    }
    setAddingOverride(true);
    try {
      await api.post("/school-config/grade-overrides", {
        grade: newOverride.grade,
        endTime: newOverride.endTime || null,
        fridayEndTime: newOverride.fridayEndTime || null,
      });
      showSuccess(`Grade ${newOverride.grade} override added`);
      fetchGradeOverrides();
      setNewOverride({ grade: 1, endTime: "", fridayEndTime: "" });
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to add override");
    }
    setAddingOverride(false);
  };

  const handleDeleteOverride = async (grade: number) => {
    try {
      await api.delete(`/school-config/grade-overrides/${grade}`);
      setGradeOverrides((prev) => prev.filter((o) => o.grade !== grade));
      showSuccess(`Grade ${grade} override removed`);
    } catch {
      showError("Failed to remove override");
    }
  };

  // Core period computation — accepts a specific end time so we can preview
  // any grade or the Friday variant.
  const computePeriods = (endTimeOverride?: string): PeriodEntry[] => {
    const startTime = form.schoolStartTime;
    const endTime = endTimeOverride || form.schoolEndTime;
    if (!startTime || !endTime || endTime <= startTime) return [];

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

    const periods: PeriodEntry[] = [];
    let cursor = toMins(startTime);
    const end = toMins(endTime);
    let i = 1;

    while (cursor + form.periodDurationMinutes <= end) {
      const pEnd = cursor + form.periodDurationMinutes;
      const isBreakAfter = i === form.breakAfterPeriod;

      periods.push({
        label: `Period ${i}`,
        start: toTime(cursor),
        end: toTime(pEnd),
        isBreakAfter,
      });

      // Break only after the designated period, not every period
      cursor = isBreakAfter ? pEnd + form.breakDurationMinutes : pEnd;
      i++;
    }

    return periods;
  };

  // Resolve effective end times for the preview grade
  const resolveEndTimes = () => {
    const override =
      previewGrade !== ""
        ? gradeOverrides.find((o) => o.grade === previewGrade)
        : null;

    const regularEnd = override?.endTime || form.schoolEndTime;
    const fridayEnd =
      override?.fridayEndTime ||
      form.fridayEndTime ||
      override?.endTime ||
      form.schoolEndTime;

    return { regularEnd, fridayEnd };
  };

  const { regularEnd, fridayEnd } = resolveEndTimes();
  const periods = computePeriods(regularEnd);
  const fridayPeriods =
    form.fridayEndTime ||
    (previewGrade !== "" &&
      gradeOverrides.find((o) => o.grade === previewGrade)?.fridayEndTime)
      ? computePeriods(fridayEnd)
      : [];

  const breakTime =
    periods.find((p) => p.isBreakAfter) !== undefined
      ? (() => {
          const bp = periods.find((p) => p.isBreakAfter)!;
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
          const breakStart = toMins(bp.end);
          const breakEnd = breakStart + form.breakDurationMinutes;
          return `${bp.end} – ${toTime(breakEnd)}`;
        })()
      : null;

  if (fetching) {
    return (
      <S.LoadingContainer>Loading school configuration...</S.LoadingContainer>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>School Configuration</S.Title>
        {config && (
          <S.LastUpdated>
            Last updated: {new Date(config.updatedAt).toLocaleString()}
          </S.LastUpdated>
        )}
      </S.Header>

      <S.Form onSubmit={handleSave}>
        {/* ── School Hours ── */}
        <S.Section>
          <S.SectionTitle>School Hours</S.SectionTitle>
          <S.Grid>
            <S.Field>
              <S.Label>Start time</S.Label>
              <S.Input
                type="time"
                name="schoolStartTime"
                value={form.schoolStartTime}
                onChange={handleChange}
                required
              />
            </S.Field>
            <S.Field>
              <S.Label>Default end time</S.Label>
              <S.Input
                type="time"
                name="schoolEndTime"
                value={form.schoolEndTime}
                onChange={handleChange}
                required
              />
            </S.Field>
          </S.Grid>
          {timeError && <S.ErrorText>{timeError}</S.ErrorText>}
        </S.Section>

        {/* ── Period & Break Settings ── */}
        <S.Section>
          <S.SectionTitle>Period &amp; Break Settings</S.SectionTitle>
          <S.Grid>
            <S.Field>
              <S.Label>Period duration (minutes)</S.Label>
              <S.Input
                type="number"
                name="periodDurationMinutes"
                value={form.periodDurationMinutes}
                onChange={handleChange}
                min={20}
                max={120}
                required
              />
            </S.Field>
            <S.Field>
              <S.Label>Break duration (minutes)</S.Label>
              <S.Input
                type="number"
                name="breakDurationMinutes"
                value={form.breakDurationMinutes}
                onChange={handleChange}
                min={5}
                max={60}
                required
              />
            </S.Field>
            <S.Field>
              <S.Label>Break after which period?</S.Label>
              <S.Input
                type="number"
                name="breakAfterPeriod"
                value={form.breakAfterPeriod}
                onChange={handleChange}
                min={1}
                max={10}
                required
              />
              <span
                style={{
                  fontSize: "12px",
                  opacity: 0.6,
                  marginTop: "4px",
                  display: "block",
                }}
              >
                One break per day, after this period number
              </span>
            </S.Field>
          </S.Grid>
        </S.Section>

        {/* ── Friday Short Day ── */}
        <S.Section>
          <S.SectionTitle>
            Friday Schedule{" "}
            <span
              style={{ fontWeight: 400, opacity: 0.6, fontSize: "0.85rem" }}
            >
              (optional — leave empty if Friday hours are the same)
            </span>
          </S.SectionTitle>
          <S.Grid>
            <S.Field>
              <S.Label>Friday end time</S.Label>
              <S.Input
                type="time"
                name="fridayEndTime"
                value={form.fridayEndTime}
                onChange={handleChange}
              />
              <span
                style={{
                  fontSize: "12px",
                  opacity: 0.6,
                  marginTop: "4px",
                  display: "block",
                }}
              >
                All grades dismiss earlier on Friday unless overridden per grade
              </span>
            </S.Field>
          </S.Grid>
        </S.Section>

        {/* ── Period Preview ── */}
        {periods.length > 0 && (
          <S.PeriodPreview>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
                flexWrap: "wrap",
              }}
            >
              <S.SectionTitle style={{ margin: 0 }}>
                Period Preview
              </S.SectionTitle>
              <select
                value={previewGrade}
                onChange={(e) =>
                  setPreviewGrade(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                style={{
                  padding: "4px 8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "13px",
                }}
              >
                <option value="">School default</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g}>
                    Grade {g}
                    {gradeOverrides.find((o) => o.grade === g) ? " ✦" : ""}
                  </option>
                ))}
              </select>
              <span style={{ fontSize: "13px", opacity: 0.6 }}>
                {periods.length} period{periods.length !== 1 ? "s" : ""}
                {breakTime ? ` · Break: ${breakTime}` : ""}
              </span>
            </div>

            {/* Regular day */}
            <div style={{ marginBottom: fridayPeriods.length ? "16px" : 0 }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  opacity: 0.5,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Mon – Thu{fridayPeriods.length === 0 ? " + Fri" : ""}
              </span>
              <S.BadgeContainer>
                {periods.map((p, i) => (
                  <>
                    <S.PeriodBadge key={i}>
                      <strong>{p.label}</strong> {p.start} – {p.end}
                    </S.PeriodBadge>
                    {p.isBreakAfter && breakTime && (
                      <S.PeriodBadge
                        key={`break-${i}`}
                        style={{
                          background: "#fef9c3",
                          color: "#854d0e",
                          border: "1px dashed #fbbf24",
                        }}
                      >
                        🍽 Break {breakTime}
                      </S.PeriodBadge>
                    )}
                  </>
                ))}
              </S.BadgeContainer>
            </div>

            {/* Friday day (only if different) */}
            {fridayPeriods.length > 0 && (
              <div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    opacity: 0.5,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Friday · ends {fridayEnd} · {fridayPeriods.length} period
                  {fridayPeriods.length !== 1 ? "s" : ""}
                </span>
                <S.BadgeContainer>
                  {fridayPeriods.map((p, i) => (
                    <>
                      <S.PeriodBadge
                        key={i}
                        style={{ background: "#ede9fe", color: "#5b21b6" }}
                      >
                        <strong>{p.label}</strong> {p.start} – {p.end}
                      </S.PeriodBadge>
                      {p.isBreakAfter && (
                        <S.PeriodBadge
                          key={`break-fri-${i}`}
                          style={{
                            background: "#fef9c3",
                            color: "#854d0e",
                            border: "1px dashed #fbbf24",
                          }}
                        >
                          🍽 Break {p.end} –{" "}
                          {(() => {
                            const [h, m] = p.end.split(":").map(Number);
                            const total =
                              h * 60 + m + form.breakDurationMinutes;
                            return `${Math.floor(total / 60)
                              .toString()
                              .padStart(
                                2,
                                "0",
                              )}:${(total % 60).toString().padStart(2, "0")}`;
                          })()}
                        </S.PeriodBadge>
                      )}
                    </>
                  ))}
                </S.BadgeContainer>
              </div>
            )}
          </S.PeriodPreview>
        )}

        {periods.length === 0 && form.schoolStartTime && form.schoolEndTime && (
          <S.EmptyMessage>
            No full periods fit in the selected hours.
          </S.EmptyMessage>
        )}

        <S.SaveButton type="submit" disabled={loading || !!timeError}>
          {loading ? "Saving..." : "Save Configuration"}
        </S.SaveButton>
      </S.Form>

      {/* ── Conflicts ── */}
      {showConflicts && conflicts.length > 0 && (
        <S.ConflictPanel>
          <S.ConflictHeader>
            <strong>
              ⚠️ {conflicts.length} schedule(s) now fall outside school hours
            </strong>
            <p>These must be deleted or rescheduled to avoid conflicts.</p>
          </S.ConflictHeader>

          <S.ConflictTable>
            <thead>
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Day</th>
                <th>Slot</th>
                <th>Issue</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {conflicts.map((c) => (
                <tr key={c.id}>
                  <td>{c.class}</td>
                  <td>{c.subject}</td>
                  <td>{c.teacher}</td>
                  <td>{c.day}</td>
                  <td>{c.slot}</td>
                  <S.IssueText as="td">{c.issue}</S.IssueText>
                  <td>
                    <S.DeleteButton onClick={() => handleDeleteConflict(c.id)}>
                      Delete
                    </S.DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </S.ConflictTable>
        </S.ConflictPanel>
      )}

      {/* ── Grade-specific End Times ── */}
      <S.Section style={{ marginTop: "2rem" }}>
        <S.SectionTitle>Grade-specific Dismissal Times</S.SectionTitle>
        <p style={{ fontSize: "13px", opacity: 0.6, marginBottom: "1rem" }}>
          Override the school's default end time for specific grades. Useful
          when lower grades (e.g. Grade 1–3) finish earlier than senior grades.
          Friday times here take priority over the global Friday end time above.
        </p>

        {/* Add override form */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-end",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <S.Field>
            <S.Label>Grade</S.Label>
            <S.Input
              type="number"
              min={1}
              max={10}
              value={newOverride.grade}
              onChange={(e) =>
                setNewOverride((p) => ({
                  ...p,
                  grade: Number(e.target.value),
                }))
              }
              style={{ width: "70px" }}
            />
          </S.Field>

          <S.Field>
            <S.Label>End time (Mon–Thu)</S.Label>
            <S.Input
              type="time"
              value={newOverride.endTime}
              onChange={(e) =>
                setNewOverride((p) => ({ ...p, endTime: e.target.value }))
              }
            />
          </S.Field>

          <S.Field>
            <S.Label>End time (Friday)</S.Label>
            <S.Input
              type="time"
              value={newOverride.fridayEndTime}
              onChange={(e) =>
                setNewOverride((p) => ({
                  ...p,
                  fridayEndTime: e.target.value,
                }))
              }
            />
          </S.Field>

          <S.SaveButton
            type="button"
            disabled={addingOverride}
            onClick={handleAddOverride}
            style={{ width: "auto", padding: "8px 20px" }}
          >
            {addingOverride ? "Adding..." : "+ Add Override"}
          </S.SaveButton>
        </div>

        {gradeOverrides.length === 0 ? (
          <S.EmptyMessage>
            No grade overrides yet. All grades follow the school default times.
          </S.EmptyMessage>
        ) : (
          <S.ConflictTable>
            <thead>
              <tr>
                <th>Grade</th>
                <th>End time (Mon–Thu)</th>
                <th>End time (Friday)</th>
                <th>Periods (regular)</th>
                <th>Periods (Friday)</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {[...gradeOverrides]
                .sort((a, b) => a.grade - b.grade)
                .map((o) => {
                  const regPeriods = computePeriods(
                    o.endTime || form.schoolEndTime,
                  );
                  const friPeriods =
                    o.fridayEndTime || form.fridayEndTime
                      ? computePeriods(
                          o.fridayEndTime ||
                            form.fridayEndTime ||
                            o.endTime ||
                            form.schoolEndTime,
                        )
                      : null;
                  return (
                    <tr key={o.grade}>
                      <td>Grade {o.grade}</td>
                      <td>
                        {o.endTime ?? (
                          <span style={{ opacity: 0.4 }}>same as school</span>
                        )}
                      </td>
                      <td>
                        {o.fridayEndTime ?? (
                          <span style={{ opacity: 0.4 }}>
                            {form.fridayEndTime
                              ? `global (${form.fridayEndTime})`
                              : "same as regular"}
                          </span>
                        )}
                      </td>
                      <td>{regPeriods.length} periods</td>
                      <td>
                        {friPeriods !== null ? (
                          `${friPeriods.length} periods`
                        ) : (
                          <span style={{ opacity: 0.4 }}>same as regular</span>
                        )}
                      </td>
                      <td>
                        <S.DeleteButton
                          onClick={() => handleDeleteOverride(o.grade)}
                        >
                          Delete
                        </S.DeleteButton>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </S.ConflictTable>
        )}
      </S.Section>

      {/* ── Classes & Sections ── */}
      <S.Section style={{ marginTop: "2rem" }}>
        <S.SectionTitle>Classes &amp; Sections</S.SectionTitle>

        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-end",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <S.Field>
            <S.Label>Grade</S.Label>
            <S.Input
              type="number"
              min={1}
              max={10}
              value={newGrade}
              onChange={(e) => setNewGrade(Number(e.target.value))}
              style={{ width: "80px" }}
            />
          </S.Field>

          <S.Field>
            <S.Label>Section</S.Label>
            <select
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              {"ABCDEFGHIJ".split("").map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
          </S.Field>

          <S.Field>
            <S.Label>Max Strength</S.Label>
            <S.Input
              type="number"
              min={1}
              max={60}
              value={newMaxStrength}
              onChange={(e) => setNewMaxStrength(Number(e.target.value))}
              style={{ width: "100px" }}
            />
          </S.Field>

          <S.SaveButton
            type="button"
            disabled={addingClass}
            onClick={async () => {
              setAddingClass(true);
              try {
                await api.post("/school-class", {
                  grade: newGrade,
                  section: newSection,
                  maxStrength: newMaxStrength,
                });
                showSuccess(`Grade ${newGrade}-${newSection} added`);
                const res = await api.get("/school-class");
                setClasses(res.data);
              } catch (err: any) {
                showError(err.response?.data?.message || "Failed to add class");
              }
              setAddingClass(false);
            }}
            style={{ width: "auto", padding: "8px 20px" }}
          >
            {addingClass ? "Adding..." : "+ Add Section"}
          </S.SaveButton>
        </div>

        {classes.length === 0 ? (
          <S.EmptyMessage>No classes yet. Add one above.</S.EmptyMessage>
        ) : (
          <S.ConflictTable>
            <thead>
              <tr>
                <th>Grade</th>
                <th>Section</th>
                <th>Max Strength</th>
                <th>Enrolled</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {[...classes]
                .sort(
                  (a, b) =>
                    a.grade - b.grade || a.section.localeCompare(b.section),
                )
                .map((cls) => (
                  <tr key={cls.id}>
                    <td>Grade {cls.grade}</td>
                    <td>{cls.section}</td>
                    <td>{cls.maxStrength}</td>
                    <td>
                      {cls.currentStrength} / {cls.maxStrength}
                    </td>
                    <td>
                      <S.DeleteButton
                        onClick={async () => {
                          if (
                            !confirm(
                              `Delete Grade ${cls.grade}-${cls.section}?`,
                            )
                          )
                            return;
                          try {
                            await api.delete(`/school-class/${cls.id}`);
                            setClasses((prev) =>
                              prev.filter((c) => c.id !== cls.id),
                            );
                            showSuccess("Class removed");
                          } catch (err: any) {
                            showError(
                              err.response?.data?.message ||
                                "Failed to delete class",
                            );
                          }
                        }}
                      >
                        Delete
                      </S.DeleteButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </S.ConflictTable>
        )}
      </S.Section>
    </S.Container>
  );
}
