"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import * as S from "@/wrappers/adminSchedule";

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
      <S.Container>
        <S.LoadingState>
          <div className="loading-dots">
            <span />
            <span />
            <span />
          </div>
          <p>Loading schedules...</p>
        </S.LoadingState>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Schedule Management</S.Title>
        <S.AddButton
          onClick={() => router.push("/dashboard/admin/schedule/create")}
        >
          + Create Schedule
        </S.AddButton>
      </S.Header>

      <S.StatsContainer>
        <S.StatCard>
          <span className="value">{schedules.length}</span>
          <span className="label">Total slots</span>
        </S.StatCard>
        <S.StatCard>
          <span className="value">
            {new Set(schedules.map((s) => s.schoolClass.id)).size}
          </span>
          <span className="label">Classes covered</span>
        </S.StatCard>
        <S.StatCard>
          <span className="value">
            {new Set(schedules.map((s) => s.teacher.id)).size}
          </span>
          <span className="label">Teachers assigned</span>
        </S.StatCard>
      </S.StatsContainer>

      <S.FilterSection>
        <S.FilterGroup>
          <S.FilterLabel>View:</S.FilterLabel>
          <S.FilterSelect
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as "grid" | "week")}
            style={{ width: "130px" }}
          >
            <option value="grid">Grid View</option>
            <option value="week">Week View</option>
          </S.FilterSelect>
        </S.FilterGroup>

        <S.FilterGroup>
          <S.FilterLabel>Day:</S.FilterLabel>
          <S.FilterSelect
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">All Days</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {formatDay(d)}
              </option>
            ))}
          </S.FilterSelect>
        </S.FilterGroup>

        <S.FilterGroup>
          <S.FilterLabel>Class:</S.FilterLabel>
          <S.FilterSelect
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                Grade {c.grade}-{c.section}
              </option>
            ))}
          </S.FilterSelect>
        </S.FilterGroup>

        <S.FilterGroup>
          <S.FilterLabel>Teacher:</S.FilterLabel>
          <S.FilterSelect
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="">All Teachers</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.fullName}
              </option>
            ))}
          </S.FilterSelect>
        </S.FilterGroup>

        {(selectedDay || selectedClass || selectedTeacher) && (
          <S.ClearButton onClick={clearFilters}>Clear filters ✕</S.ClearButton>
        )}
      </S.FilterSection>

      {filteredSchedules.length === 0 ? (
        <S.EmptyState>
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
        </S.EmptyState>
      ) : viewMode === "grid" ? (
        <S.GridView>
          {!config && (
            <S.WarningText>
              ⚠️ School config not found — time slots may not match. Set it up
              in School Config.
            </S.WarningText>
          )}
          <S.ScheduleGrid>
            <div />
            {DAYS.map((day) => (
              <S.GridHeader key={day}>{formatDay(day)}</S.GridHeader>
            ))}

            {timeSlots.map((slotStart) => (
              <React.Fragment key={slotStart}>
                <S.TimeLabel>{slotStart}</S.TimeLabel>
                {DAYS.map((day) => {
                  const slots = findSchedulesInSlot(day, slotStart);
                  return (
                    <S.Cell key={day + slotStart}>
                      {slots.length > 0 ? (
                        slots.map((slot) => {
                          const color = getSubjectColor(slot.subject.id);
                          return (
                            <S.SlotCard key={slot.id} $color={color.text}>
                              <div className="subject">{slot.subject.name}</div>
                              <div className="class">
                                Gr {slot.schoolClass.grade}-
                                {slot.schoolClass.section}
                              </div>
                              <div className="teacher">
                                {slot.teacher.fullName.split(" ").slice(-1)[0]}
                              </div>
                              <div className="room">{slot.room.name}</div>
                              <S.DeleteButton
                                onClick={() => handleDelete(slot.id)}
                                disabled={deletingId === slot.id}
                              >
                                ✕
                              </S.DeleteButton>
                            </S.SlotCard>
                          );
                        })
                      ) : (
                        <S.AddSlotButton
                          onClick={() =>
                            router.push(
                              `/dashboard/admin/schedule/create?classId=${selectedClass}&day=${day}&time=${slotStart}`,
                            )
                          }
                        >
                          +
                        </S.AddSlotButton>
                      )}
                    </S.Cell>
                  );
                })}
              </React.Fragment>
            ))}
          </S.ScheduleGrid>
        </S.GridView>
      ) : (
        <S.WeekView>
          {DAYS.map((day) => (
            <S.DayColumn key={day}>
              <S.DayTitle>{formatDay(day)}</S.DayTitle>
              <S.DayContent>
                {schedulesByDay[day].length > 0 ? (
                  schedulesByDay[day].map((schedule) => {
                    const color = getSubjectColor(schedule.subject.id);
                    return (
                      <S.WeekSlotCard
                        key={schedule.id}
                        $bg={color.bg}
                        $border={color.border}
                        $text={color.text}
                      >
                        <div className="time">
                          {formatTime(schedule.startTime)} –{" "}
                          {formatTime(schedule.endTime)}
                        </div>
                        <div className="subject">{schedule.subject.name}</div>
                        <div className="class">
                          Gr {schedule.schoolClass.grade}-
                          {schedule.schoolClass.section}
                        </div>
                        <div className="teacher">
                          {schedule.teacher.fullName}
                        </div>
                        <div className="room">{schedule.room.name}</div>
                        <S.WeekDeleteButton
                          onClick={() => handleDelete(schedule.id)}
                          disabled={deletingId === schedule.id}
                        >
                          ✕
                        </S.WeekDeleteButton>
                      </S.WeekSlotCard>
                    );
                  })
                ) : (
                  <S.EmptyDay>No classes</S.EmptyDay>
                )}
              </S.DayContent>
            </S.DayColumn>
          ))}
        </S.WeekView>
      )}
    </S.Container>
  );
}
