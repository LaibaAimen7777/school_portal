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
  updatedAt: string;
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
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [newGrade, setNewGrade] = useState<number>(1);
  const [newSection, setNewSection] = useState<string>("A");
  const [newMaxStrength, setNewMaxStrength] = useState<number>(30);
  const [addingClass, setAddingClass] = useState(false);

  useEffect(() => {
    fetchConfig();
    fetchClasses();
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

  const fetchClasses = async () => {
    const res = await api.get("/school-class");
    setClasses(res.data);
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
              <S.Label>End time</S.Label>
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

        <S.Section>
          <S.SectionTitle>Period Settings</S.SectionTitle>
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
                min={0}
                max={30}
                required
              />
            </S.Field>
          </S.Grid>
        </S.Section>

        {periods.length > 0 && (
          <S.PeriodPreview>
            <S.SectionTitle>
              Period Preview{" "}
              <span style={{ fontWeight: 400, opacity: 0.6 }}>
                ({periods.length} periods fit)
              </span>
            </S.SectionTitle>
            <S.BadgeContainer>
              {periods.map((p, i) => (
                <S.PeriodBadge key={i}>
                  <strong>{p.label}</strong> {p.start} – {p.end}
                </S.PeriodBadge>
              ))}
            </S.BadgeContainer>
          </S.PeriodPreview>
        )}

        {periods.length === 0 && (
          <S.EmptyMessage>
            No full periods fit in the selected hours.
          </S.EmptyMessage>
        )}

        <S.SaveButton type="submit" disabled={loading || !!timeError}>
          {loading ? "Saving..." : "Save Configuration"}
        </S.SaveButton>
      </S.Form>

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

      <S.Section style={{ marginTop: "2rem" }}>
        <S.SectionTitle>Classes &amp; Sections</S.SectionTitle>

        {/* Add Section Form */}
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

        {/* Classes Table */}
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
