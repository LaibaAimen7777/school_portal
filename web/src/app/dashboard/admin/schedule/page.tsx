"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import {
  Container,
  Header,
  Title,
  AddButton,
  FilterSection,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  EmptyState,
  LoadingState,
  WeekView,
  DayColumn,
  DayTitle,
} from "@/wrappers/adminSchedule";

interface Schedule {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  teacher: { id: number; fullName: string };
  subject: { id: number; name: string };
  schoolClass: { id: number; grade: number; section: string };
  room: { id: number; name: string };
}

interface Teacher {
  id: number;
  fullName: string;
}

interface SchoolClass {
  id: number;
  grade: number;
  section: string;
}

interface SchoolConfig {
  schoolStartTime: string;
  schoolEndTime: string;
  periodDurationMinutes: number;
  breakDurationMinutes: number;
}

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

const formatDay = (day: string) => day.charAt(0) + day.slice(1).toLowerCase();

const formatTime = (time: string) => time.substring(0, 5);

// Generate time slots from school config
function generateTimeSlots(config: SchoolConfig): string[] {
  const [sh, sm] = config.schoolStartTime.split(":").map(Number);
  const [eh, em] = config.schoolEndTime.split(":").map(Number);
  const startMins = sh * 60 + sm;
  const endMins = eh * 60 + em;
  const slots: string[] = [];
  const PERIOD_MINS = config.periodDurationMinutes;
  const BREAK_MINS = config.breakDurationMinutes;
  let cursor = startMins;
  while (cursor < endMins) {
    const slotEnd = cursor + PERIOD_MINS;
    if (slotEnd > endMins) break;
    const h = Math.floor(cursor / 60)
      .toString()
      .padStart(2, "0");
    const m = (cursor % 60).toString().padStart(2, "0");
    slots.push(`${h}:${m}`);
    cursor += PERIOD_MINS + BREAK_MINS;
  }
  return slots;
}

const SUBJECT_COLORS = [
  { bg: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8" },
  { bg: "#f0fdf4", border: "#bbf7d0", text: "#15803d" },
  { bg: "#fdf4ff", border: "#e9d5ff", text: "#7e22ce" },
  { bg: "#fff7ed", border: "#fed7aa", text: "#c2410c" },
  { bg: "#fef2f2", border: "#fecaca", text: "#b91c1c" },
  { bg: "#f0fdfa", border: "#99f6e4", text: "#0f766e" },
  { bg: "#fefce8", border: "#fde68a", text: "#b45309" },
  { bg: "#f8fafc", border: "#cbd5e1", text: "#334155" },
];

function getSubjectColor(subjectId: number) {
  return SUBJECT_COLORS[subjectId % SUBJECT_COLORS.length];
}

export default function ScheduleDisplayPage() {
  const router = useRouter();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [config, setConfig] = useState<SchoolConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "week">("grid");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [schedules, selectedDay, selectedClass, selectedTeacher]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [schedulesRes, teachersRes, classesRes, configRes] =
        await Promise.allSettled([
          api.get("/schedule"),
          api.get("/teachers"),
          api.get("/school-class"),
          api.get("/school-config"),
        ]);

      if (schedulesRes.status === "fulfilled") {
        setSchedules(schedulesRes.value.data);
        setFilteredSchedules(schedulesRes.value.data);
      }
      if (teachersRes.status === "fulfilled")
        setTeachers(teachersRes.value.data);
      if (classesRes.status === "fulfilled") setClasses(classesRes.value.data);
      if (configRes.status === "fulfilled") setConfig(configRes.value.data);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...schedules];
    if (selectedDay)
      filtered = filtered.filter((s) => s.dayOfWeek === selectedDay);
    if (selectedClass)
      filtered = filtered.filter(
        (s) => s.schoolClass.id === parseInt(selectedClass),
      );
    if (selectedTeacher)
      filtered = filtered.filter(
        (s) => s.teacher.id === parseInt(selectedTeacher),
      );
    filtered.sort((a, b) => {
      const d = DAYS.indexOf(a.dayOfWeek) - DAYS.indexOf(b.dayOfWeek);
      return d !== 0 ? d : a.startTime.localeCompare(b.startTime);
    });
    setFilteredSchedules(filtered);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this schedule slot?")) return;
    setDeletingId(id);
    try {
      await api.delete(`/schedule/${id}`);
      setSchedules((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete schedule");
    }
    setDeletingId(null);
  };

  const clearFilters = () => {
    setSelectedDay("");
    setSelectedClass("");
    setSelectedTeacher("");
  };

  const timeSlots = config ? generateTimeSlots(config) : [];

  const findSchedulesInSlot = (day: string, slotStart: string) =>
    filteredSchedules.filter(
      (s) => s.dayOfWeek === day && formatTime(s.startTime) === slotStart,
    );

  const schedulesByDay = DAYS.reduce(
    (acc, day) => {
      acc[day] = filteredSchedules
        .filter((s) => s.dayOfWeek === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
      return acc;
    },
    {} as Record<string, Schedule[]>,
  );

  if (loading) {
    return (
      <Container>
        <LoadingState>
          <div className="loading-dots">
            <span />
            <span />
            <span />
          </div>
          <p>Loading schedules...</p>
        </LoadingState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Schedule Management</Title>
        <div style={{ display: "flex", gap: "8px" }}>
          <AddButton
            onClick={() => router.push("/dashboard/admin/schedule/create")}
          >
            + Create Schedule
          </AddButton>
        </div>
      </Header>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Total slots", value: schedules.length },
          {
            label: "Classes covered",
            value: new Set(schedules.map((s) => s.schoolClass.id)).size,
          },
          {
            label: "Teachers assigned",
            value: new Set(schedules.map((s) => s.teacher.id)).size,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: "14px 20px",
              borderRadius: "12px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              minWidth: "140px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: "20px",
                display: "block",
                color: "#0f172a",
              }}
            >
              {stat.value}
            </span>
            <span style={{ fontSize: "12px", color: "#64748b" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <FilterSection>
        <FilterGroup>
          <FilterLabel>View:</FilterLabel>
          <FilterSelect
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as "grid" | "week")}
            style={{ width: "130px" }}
          >
            <option value="grid">Grid View</option>
            <option value="week">Week View</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Day:</FilterLabel>
          <FilterSelect
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">All Days</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {formatDay(d)}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Class:</FilterLabel>
          <FilterSelect
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                Grade {c.grade}-{c.section}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Teacher:</FilterLabel>
          <FilterSelect
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="">All Teachers</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.fullName}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        {(selectedDay || selectedClass || selectedTeacher) && (
          <FilterGroup>
            <button
              onClick={clearFilters}
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid var(--border-color, #e2e8f0)",
                borderRadius: "6px",
                background: "white",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Clear filters ✕
            </button>
          </FilterGroup>
        )}
      </FilterSection>

      {filteredSchedules.length === 0 ? (
        <EmptyState>
          <p>No schedules found</p>
          <button
            onClick={() =>
              router.push(
                `/dashboard/admin/schedule/create?classId=${selectedClass}`,
              )
            }
          >
            Create your first schedule
          </button>
        </EmptyState>
      ) : viewMode === "grid" ? (
        /* ── GRID VIEW ── */
        <div style={{ overflowX: "auto" }}>
          {config === null && (
            <p
              style={{
                color: "#b45309",
                fontSize: "13px",
                marginBottom: "8px",
              }}
            >
              ⚠️ School config not found — time slots may not match. Set it up
              in <a href="/dashboard/admin/config">School Config</a>.
            </p>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `80px repeat(5, minmax(140px, 1fr))`,
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              overflow: "hidden",
              minWidth: "780px",
              background: "#ffffff",
            }}
          >
            {/* Header row */}
            <div style={{ background: "#f8fafc", padding: "12px 8px" }} />
            {DAYS.map((day) => (
              <div
                key={day}
                style={{
                  padding: "12px 8px",
                  fontWeight: 600,
                  textAlign: "center",
                  background: "#f8fafc",
                  borderLeft: "1px solid var(--border-color, #e2e8f0)",
                  fontSize: "13px",
                  letterSpacing: "0.03em",
                }}
              >
                {formatDay(day)}
              </div>
            ))}

            {/* Time rows — driven by school config */}
            {timeSlots.map((slotStart, rowIdx) => (
              <React.Fragment key={slotStart}>
                {/* Time label */}
                <div
                  style={{
                    padding: "10px 8px",
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: 500,
                    borderTop: "1px solid var(--border-color, #e2e8f0)",
                    background: "#f8fafc",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingTop: "14px",
                  }}
                >
                  {slotStart}
                </div>

                {/* Day cells */}
                {DAYS.map((day) => {
                  const slots = findSchedulesInSlot(day, slotStart);
                  return (
                    <div
                      key={day + slotStart}
                      style={{
                        borderTop: "1px solid var(--border-color, #e2e8f0)",
                        borderLeft: "1px solid var(--border-color, #e2e8f0)",
                        minHeight: "90px",
                        padding: "6px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      {slots.length > 0 ? (
                        slots.map((slot) => {
                          const color = getSubjectColor(slot.subject.id);
                          return (
                            <div
                              key={slot.id}
                              style={{
                                background: "#ffffff",
                                borderRadius: "10px",
                                padding: "8px 10px",
                                fontSize: "12px",
                                position: "relative",
                                borderLeft: `4px solid ${color.text}`,
                                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                transition: "0.2s",
                                marginTop: "10px",
                              }}
                            >
                              <div
                                style={{
                                  fontWeight: 700,
                                  color: "#0f172a",
                                  marginBottom: "2px",
                                  paddingRight: "14px",
                                  fontSize: "12px",
                                  height: "40px",
                                  // marginTop: "10px",
                                }}
                              >
                                {slot.subject.name}
                              </div>
                              <div
                                style={{ color: "#475569", fontSize: "11px" }}
                              >
                                Gr {slot.schoolClass.grade}-
                                {slot.schoolClass.section}
                              </div>
                              <div
                                style={{ color: "#64748b", fontSize: "11px" }}
                              >
                                {slot.teacher.fullName.split(" ").slice(-1)[0]}
                              </div>
                              <div
                                style={{ color: "#94a3b8", fontSize: "10px" }}
                              >
                                {slot.room.name}
                              </div>
                              {/* Delete button */}
                              <button
                                onClick={() => handleDelete(slot.id)}
                                disabled={deletingId === slot.id}
                                title="Delete"
                                style={{
                                  // position: "absolute",
                                  // top: "4px",
                                  // right: "4px",
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "10px",
                                  color: "#f8f8f8",
                                  backgroundColor: "#bc412e",
                                  lineHeight: 1,
                                  padding: "2px",
                                }}
                              >
                                ✕
                              </button>
                              <div></div>
                            </div>
                          );
                        })
                      ) : (
                        <button
                          onClick={() =>
                            router.push(
                              `/dashboard/admin/schedule/create?classId=${selectedClass}&day=${day}&time=${slotStart}`,
                            )
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            minHeight: "78px",
                            border: "1px dashed #cbd5e1",
                            borderRadius: "6px",
                            background: "none",
                            color: "#cbd5e1",
                            cursor: "pointer",
                            fontSize: "18px",
                            transition: "all 0.15s",
                          }}
                          onMouseOver={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.borderColor = "#94a3b8";
                            (e.currentTarget as HTMLButtonElement).style.color =
                              "#94a3b8";
                          }}
                          onMouseOut={(e) => {
                            (
                              e.currentTarget as HTMLButtonElement
                            ).style.borderColor = "#cbd5e1";
                            (e.currentTarget as HTMLButtonElement).style.color =
                              "#cbd5e1";
                          }}
                        >
                          +
                        </button>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        /* ── WEEK VIEW ── */
        <WeekView>
          {DAYS.map((day) => (
            <DayColumn key={day}>
              <DayTitle>{formatDay(day)}</DayTitle>
              {schedulesByDay[day].length > 0 ? (
                schedulesByDay[day].map((schedule) => {
                  const color = getSubjectColor(schedule.subject.id);
                  return (
                    <div
                      key={schedule.id}
                      style={{
                        background: color.bg,
                        border: `1px solid ${color.border}`,
                        borderRadius: "8px",
                        padding: "10px 12px",
                        marginBottom: "8px",
                        position: "relative",
                        fontSize: "13px",
                        width: "10px",
                      }}
                    >
                      <button
                        onClick={() => handleDelete(schedule.id)}
                        disabled={deletingId === schedule.id}
                        title="Delete"
                      >
                        ✕
                      </button>

                      <div
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          marginBottom: "4px",
                          fontWeight: 500,
                        }}
                      >
                        {formatTime(schedule.startTime)} –{" "}
                        {formatTime(schedule.endTime)}
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: color.text,
                          marginBottom: "2px",
                        }}
                      >
                        {schedule.subject.name}
                      </div>
                      <div style={{ color: "#475569", fontSize: "12px" }}>
                        Grade {schedule.schoolClass.grade}-
                        {schedule.schoolClass.section}
                      </div>
                      <div style={{ color: "#64748b", fontSize: "12px" }}>
                        {schedule.teacher.fullName}
                      </div>
                      <div style={{ color: "#94a3b8", fontSize: "11px" }}>
                        {schedule.room.name}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    color: "#cbd5e1",
                    border: "1px dashed #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                >
                  No classes
                </div>
              )}
            </DayColumn>
          ))}
        </WeekView>
      )}
    </Container>
  );
}
