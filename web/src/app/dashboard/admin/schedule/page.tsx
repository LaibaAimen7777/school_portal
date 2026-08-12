"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import * as S from "@/wrappers/adminSchedule";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { showSuccess, showError } from "@/components/ui/toast";
import {
  FaCalendarAlt,
  FaPlus,
  FaClock,
  FaGraduationCap,
  FaUserTie,
  FaFilter,
  FaExclamationTriangle,
  FaCalendarWeek,
  FaTimes,
  FaDoorOpen,
  FaCoffee,
} from "react-icons/fa";

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
  breakAfterPeriod: number;
  fridayEndTime: string | null;
}

interface GradeOverride {
  id: number;
  grade: number;
  endTime: string | null;
  fridayEndTime: string | null;
}

// A slot entry is either a teaching period or the break block
type SlotEntry =
  | { type: "period"; startTime: string; endTime: string }
  | { type: "break"; startTime: string; endTime: string };

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

const formatDay = (day: string) => day.charAt(0) + day.slice(1).toLowerCase();
const formatTime = (time: string) => time.substring(0, 5);

const toMins = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toTime = (mins: number) =>
  `${Math.floor(mins / 60)
    .toString()
    .padStart(2, "0")}:${(mins % 60).toString().padStart(2, "0")}`;

/**
 * Generates period + break entries for a given end time.
 * Break appears exactly once — after breakAfterPeriod periods — not every period.
 */
function generateSlotEntries(
  config: SchoolConfig,
  endTimeOverride?: string,
): SlotEntry[] {
  const startMins = toMins(config.schoolStartTime);
  const endMins = toMins(endTimeOverride ?? config.schoolEndTime);
  const entries: SlotEntry[] = [];
  let cursor = startMins;
  let periodNum = 1;

  while (cursor + config.periodDurationMinutes <= endMins) {
    const slotEnd = cursor + config.periodDurationMinutes;

    entries.push({
      type: "period",
      startTime: toTime(cursor),
      endTime: toTime(slotEnd),
    });

    if (periodNum === config.breakAfterPeriod) {
      const breakEnd = slotEnd + config.breakDurationMinutes;
      // Only render the break row if it actually fits before school ends
      if (breakEnd <= endMins) {
        entries.push({
          type: "break",
          startTime: toTime(slotEnd),
          endTime: toTime(breakEnd),
        });
      }
      cursor = breakEnd;
    } else {
      cursor = slotEnd;
    }

    periodNum++;
  }

  return entries;
}

const SUBJECT_COLORS = [
  "#3b82f6",
  "#10b981",
  "#a855f7",
  "#f97316",
  "#ef4444",
  "#14b8a6",
  "#f59e0b",
  "#64748b",
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
  const [gradeOverrides, setGradeOverrides] = useState<GradeOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "week">("grid");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [schedules, selectedDay, selectedClass, selectedTeacher]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [schedulesRes, teachersRes, classesRes, configRes, overridesRes] =
        await Promise.allSettled([
          api.get("/schedule"),
          api.get("/teachers"),
          api.get("/school-class"),
          api.get("/school-config"),
          api.get("/school-config/grade-overrides"),
        ]);

      if (schedulesRes.status === "fulfilled") {
        setSchedules(schedulesRes.value.data);
        setFilteredSchedules(schedulesRes.value.data);
      }
      if (teachersRes.status === "fulfilled")
        setTeachers(teachersRes.value.data);
      if (classesRes.status === "fulfilled") setClasses(classesRes.value.data);
      if (configRes.status === "fulfilled") setConfig(configRes.value.data);
      if (overridesRes.status === "fulfilled")
        setGradeOverrides(overridesRes.value.data);
    } catch {
      showError("Failed to fetch schedule data");
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

  const handleDeleteClick = (id: number) => {
    setSelectedScheduleId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedScheduleId === null) return;
    const id = selectedScheduleId;
    setIsDeleteModalOpen(false);
    setDeletingId(id);
    try {
      await api.delete(`/schedule/${id}`);
      setSchedules((prev) => prev.filter((s) => s.id !== id));
      showSuccess("Schedule slot deleted successfully");
    } catch {
      showError("Failed to delete schedule slot");
    } finally {
      setDeletingId(null);
      setSelectedScheduleId(null);
    }
  };

  const clearFilters = () => {
    setSelectedDay("");
    setSelectedClass("");
    setSelectedTeacher("");
  };

  /**
   * For the grid we use the widest possible slot list (school default or
   * global Friday end time) so all grades' data has a row to land in.
   * Grade-specific early dismissals just mean those later rows will be empty
   * for those grades — which is correct.
   */
  const getGridEntries = (day: string): SlotEntry[] => {
    if (!config) return [];
    const isFriday = day === "FRIDAY";
    const endOverride = isFriday
      ? (config.fridayEndTime ?? undefined)
      : undefined;
    return generateSlotEntries(config, endOverride);
  };

  /**
   * Returns a small label for days where some grades leave earlier,
   * shown as a note in the column header.
   */
  const getFridayNote = (): string | null => {
    if (!config?.fridayEndTime && gradeOverrides.length === 0) return null;
    const notes: string[] = [];
    if (config?.fridayEndTime)
      notes.push(`school ends ${config.fridayEndTime}`);
    const gradeNotes = gradeOverrides
      .filter((o) => o.fridayEndTime)
      .map((o) => `Gr${o.grade} ends ${o.fridayEndTime}`);
    notes.push(...gradeNotes);
    return notes.join(" · ");
  };

  const findSchedulesInSlot = (day: string, slotStart: string) =>
    filteredSchedules.filter(
      (s) => s.dayOfWeek === day && formatTime(s.startTime) === slotStart,
    );

  /**
   * For a given day+slot, checks if a filtered grade has an override that
   * means they're already dismissed by this slot start time.
   */
  const isGradeDismissed = (
    grade: number,
    day: string,
    slotStart: string,
  ): boolean => {
    if (!config) return false;
    const isFriday = day === "FRIDAY";
    const override = gradeOverrides.find((o) => o.grade === grade);

    const endTime = isFriday
      ? (override?.fridayEndTime ??
        config.fridayEndTime ??
        override?.endTime ??
        config.schoolEndTime)
      : (override?.endTime ?? config.schoolEndTime);

    return toMins(slotStart) >= toMins(endTime);
  };

  const schedulesByDay = DAYS.reduce(
    (acc, day) => {
      acc[day] = filteredSchedules
        .filter((s) => s.dayOfWeek === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
      return acc;
    },
    {} as Record<string, Schedule[]>,
  );

  // When a single class is filtered, resolve its grade for dismissal hints
  const filteredGrade = selectedClass
    ? (classes.find((c) => c.id === parseInt(selectedClass))?.grade ?? null)
    : null;

  const fridayNote = getFridayNote();

  if (loading) return <LoadingOverlay />;

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <FaCalendarAlt /> Schedule Management
        </S.Title>
        <S.AddButton
          onClick={() => router.push("/dashboard/admin/schedule/create")}
        >
          <FaPlus /> Create Schedule
        </S.AddButton>
      </S.Header>

      <S.StatsContainer>
        <S.StatCard>
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-info">
            <span className="value">{schedules.length}</span>
            <span className="label">Total Slots</span>
          </div>
        </S.StatCard>
        <S.StatCard>
          <div className="stat-icon">
            <FaGraduationCap />
          </div>
          <div className="stat-info">
            <span className="value">
              {new Set(schedules.map((s) => s.schoolClass.id)).size}
            </span>
            <span className="label">Classes Covered</span>
          </div>
        </S.StatCard>
        <S.StatCard>
          <div className="stat-icon">
            <FaUserTie />
          </div>
          <div className="stat-info">
            <span className="value">
              {new Set(schedules.map((s) => s.teacher.id)).size}
            </span>
            <span className="label">Teachers Assigned</span>
          </div>
        </S.StatCard>
      </S.StatsContainer>

      <S.FilterSection>
        <S.FilterGroup>
          <S.FilterLabel>
            <FaFilter /> View Mode:
          </S.FilterLabel>
          <S.FilterSelect
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as "grid" | "week")}
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
          <S.ClearButton onClick={clearFilters}>
            <FaTimes /> Clear Filters
          </S.ClearButton>
        )}
      </S.FilterSection>

      {filteredSchedules.length === 0 ? (
        <S.EmptyState>
          <FaCalendarWeek />
          <p>No schedules found matching your current filter.</p>
          <button
            onClick={() =>
              router.push(
                `/dashboard/admin/schedule/create?classId=${selectedClass}`,
              )
            }
          >
            Create Your First Schedule
          </button>
        </S.EmptyState>
      ) : viewMode === "grid" ? (
        <S.GridView>
          {!config && (
            <S.WarningText>
              <FaExclamationTriangle />
              School config not found — time slots may not match. Please set it
              up in School Config.
            </S.WarningText>
          )}

          {config && (
            <S.ScheduleGrid>
              {/* ── column headers ── */}
              <div />
              {DAYS.map((day) => (
                <S.GridHeader key={day}>
                  {formatDay(day)}
                  {day === "FRIDAY" && fridayNote && (
                    <span
                      style={{
                        display: "block",
                        fontSize: "10px",
                        fontWeight: 400,
                        opacity: 0.65,
                        marginTop: "2px",
                      }}
                    >
                      {fridayNote}
                    </span>
                  )}
                </S.GridHeader>
              ))}

              {/* ── rows: use Monday's slots as the master grid (all days share
                  the same start time and period duration; Friday may have fewer
                  rows because getGridEntries uses fridayEndTime) ── */}
              {getGridEntries("MONDAY").map((entry, rowIdx) => {
                if (entry.type === "break") {
                  return (
                    <React.Fragment key={`break-${rowIdx}`}>
                      {/* time label */}
                      <S.TimeLabel
                        style={{
                          opacity: 0.55,
                          fontSize: "11px",
                          alignSelf: "center",
                        }}
                      >
                        {entry.startTime}
                      </S.TimeLabel>

                      {/* break banner spanning all 5 day columns */}
                      <div
                        style={{
                          gridColumn: "2 / -1",
                          background:
                            "linear-gradient(90deg, #fef9c3, #fefce8)",
                          borderTop: "1px dashed #fbbf24",
                          borderBottom: "1px dashed #fbbf24",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          padding: "6px 12px",
                          color: "#92400e",
                          fontSize: "12px",
                          fontWeight: 500,
                          letterSpacing: "0.02em",
                        }}
                      >
                        <FaCoffee style={{ opacity: 0.7 }} />
                        Break &nbsp;·&nbsp; {entry.startTime} – {entry.endTime}
                        &nbsp;·&nbsp; {config.breakDurationMinutes} min
                      </div>
                    </React.Fragment>
                  );
                }

                // Regular period row
                return (
                  <React.Fragment key={`period-${entry.startTime}`}>
                    <S.TimeLabel>{entry.startTime}</S.TimeLabel>

                    {DAYS.map((day) => {
                      // Check if this day has fewer slots (e.g. Friday short day)
                      const dayEntries = getGridEntries(day);
                      const dayHasThisSlot = dayEntries.some(
                        (e) =>
                          e.type === "period" &&
                          e.startTime === entry.startTime,
                      );

                      // Check if filtered grade is already dismissed at this slot
                      const gradeDismissedHere =
                        filteredGrade !== null &&
                        isGradeDismissed(filteredGrade, day, entry.startTime);

                      if (!dayHasThisSlot || gradeDismissedHere) {
                        return (
                          <S.Cell
                            key={day}
                            style={{ background: "#f8f8f8", opacity: 0.4 }}
                          >
                            {gradeDismissedHere && (
                              <span style={{ fontSize: "10px", color: "#999" }}>
                                dismissed
                              </span>
                            )}
                          </S.Cell>
                        );
                      }

                      const slots = findSchedulesInSlot(day, entry.startTime);
                      return (
                        <S.Cell key={day}>
                          {slots.length > 0 ? (
                            slots.map((slot) => {
                              const color = getSubjectColor(slot.subject.id);
                              return (
                                <S.SlotCard key={slot.id} $color={color}>
                                  <div className="subject">
                                    {slot.subject.name}
                                  </div>
                                  <div className="class">
                                    Gr {slot.schoolClass.grade}-
                                    {slot.schoolClass.section}
                                  </div>
                                  <div className="teacher">
                                    <FaUserTie />{" "}
                                    {
                                      slot.teacher.fullName
                                        .split(" ")
                                        .slice(-1)[0]
                                    }
                                  </div>
                                  <div className="room">
                                    <FaDoorOpen /> {slot.room.name}
                                  </div>
                                  <S.DeleteButton
                                    onClick={() => handleDeleteClick(slot.id)}
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
                                  `/dashboard/admin/schedule/create?classId=${selectedClass}&day=${day}&time=${entry.startTime}`,
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
                );
              })}
            </S.ScheduleGrid>
          )}
        </S.GridView>
      ) : (
        /* ── week view ─────────────────────────────────────────────────────── */
        <S.WeekView>
          {DAYS.map((day) => {
            const daySchedules = schedulesByDay[day];
            const breakEntry = config
              ? generateSlotEntries(
                  config,
                  day === "FRIDAY"
                    ? (config.fridayEndTime ?? undefined)
                    : undefined,
                ).find((e) => e.type === "break")
              : null;

            // Merge schedules and break into a single sorted list for rendering
            type WeekItem =
              | { kind: "schedule"; data: Schedule }
              | { kind: "break"; startTime: string; endTime: string };

            const items: WeekItem[] = daySchedules.map((s) => ({
              kind: "schedule",
              data: s,
            }));

            if (breakEntry) {
              items.push({
                kind: "break",
                startTime: breakEntry.startTime,
                endTime: breakEntry.endTime,
              });
            }

            items.sort((a, b) => {
              const aTime =
                a.kind === "schedule" ? a.data.startTime : a.startTime;
              const bTime =
                b.kind === "schedule" ? b.data.startTime : b.startTime;
              return aTime.localeCompare(bTime);
            });

            return (
              <S.DayColumn key={day}>
                <S.DayTitle>
                  {formatDay(day)}
                  {day === "FRIDAY" && config?.fridayEndTime && (
                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontWeight: 400,
                        opacity: 0.6,
                      }}
                    >
                      ends {config.fridayEndTime}
                    </span>
                  )}
                </S.DayTitle>

                <S.DayContent>
                  {items.length === 0 && (
                    <div className="empty-day">No classes scheduled</div>
                  )}

                  {items.map((item, idx) => {
                    if (item.kind === "break") {
                      return (
                        <div
                          key={`break-${idx}`}
                          style={{
                            background: "#fef9c3",
                            border: "1px dashed #fbbf24",
                            borderRadius: "6px",
                            padding: "6px 10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            color: "#92400e",
                            fontSize: "12px",
                            fontWeight: 500,
                            margin: "2px 0",
                          }}
                        >
                          <FaCoffee style={{ opacity: 0.7, flexShrink: 0 }} />
                          <span>
                            Break · {item.startTime} – {item.endTime}
                          </span>
                        </div>
                      );
                    }

                    const schedule = item.data;
                    const color = getSubjectColor(schedule.subject.id);
                    return (
                      <S.WeekSlotCard key={schedule.id} $text={color}>
                        <div className="time">
                          <FaClock />
                          {formatTime(schedule.startTime)} –{" "}
                          {formatTime(schedule.endTime)}
                        </div>
                        <div className="subject">{schedule.subject.name}</div>
                        <div className="class">
                          Gr {schedule.schoolClass.grade}-
                          {schedule.schoolClass.section}
                        </div>
                        <div className="teacher">
                          <FaUserTie /> {schedule.teacher.fullName}
                        </div>
                        <div className="room">
                          <FaDoorOpen /> {schedule.room.name}
                        </div>
                        <S.WeekDeleteButton
                          onClick={() => handleDeleteClick(schedule.id)}
                          disabled={deletingId === schedule.id}
                        >
                          ✕
                        </S.WeekDeleteButton>
                      </S.WeekSlotCard>
                    );
                  })}
                </S.DayContent>
              </S.DayColumn>
            );
          })}
        </S.WeekView>
      )}

      {isDeleteModalOpen && (
        <S.ModalOverlay onClick={() => setIsDeleteModalOpen(false)}>
          <S.DeleteModal onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <div>
                <h3>Delete Schedule</h3>
                <p>This action cannot be undone.</p>
              </div>
              <S.ModalCloseButton onClick={() => setIsDeleteModalOpen(false)}>
                <FaTimes />
              </S.ModalCloseButton>
            </S.ModalHeader>
            <S.ModalContent>
              <div className="warning-icon">
                <FaExclamationTriangle />
              </div>
              <p>Are you sure you want to delete this schedule slot?</p>
            </S.ModalContent>
            <S.ModalActions>
              <S.CancelButton onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </S.CancelButton>
              <S.ConfirmDeleteButton onClick={handleConfirmDelete}>
                Delete Schedule
              </S.ConfirmDeleteButton>
            </S.ModalActions>
          </S.DeleteModal>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
}
