"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Select,
  Input,
  TimeSlotGroup,
  CheckRoomsButton,
  RoomsGrid,
  RoomButton,
  Message,
  Toast,
  Button,
} from "@/wrappers/adminCreateSchedule";

interface Teacher {
  id: number;
  fullName: string;
  subjects: Subject[];
}

interface Subject {
  id: number;
  name: string;
  grades: number[]; // ✅ added
}

interface SchoolClass {
  id: number;
  grade: number;
  section: string;
  currentStrength: number;
}

interface Room {
  id: number;
  name: string;
}

const Days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

const CreateSchedulePage = () => {
  const searchParams = useSearchParams();
  const day = searchParams.get("day");
  const time = searchParams.get("time");
  const classId = searchParams.get("classId");

  const initialForm = {
    teacherId: "",
    subjectId: "",
    classId: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    roomId: "",
  };

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]); // ✅ new
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [roomsFetched, setRoomsFetched] = useState(false);
  const [timeError, setTimeError] = useState<string>("");
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => {
    if (classId || day || time) {
      setFormData((prev) => ({
        ...prev,
        classId: classId || "",
        dayOfWeek: day || "",
        startTime: time || "",
      }));
    }
  }, [classId, day, time]);

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ When classId prefilled from URL, filter subjects once data is loaded
  useEffect(() => {
    if (classId && classes.length > 0 && subjects.length > 0) {
      const selectedClass = classes.find((c) => c.id === Number(classId));
      if (selectedClass) {
        setFilteredSubjects(
          subjects.filter((s) => s.grades?.includes(selectedClass.grade)),
        );
      }
    }
  }, [classId, classes, subjects]);

  const fetchData = async () => {
    const [teachersRes, subjectsRes, classesRes] = await Promise.all([
      api.get("/teachers"),
      api.get("/subject"),
      api.get("/school-class"),
    ]);
    setTeachers(teachersRes.data);
    setSubjects(subjectsRes.data);
    setClasses(classesRes.data);
  };

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const validateTimeSlot = (start: string, end: string) => {
    if (!start || !end) return true;
    const startDate = new Date(`2000-01-01T${start}`);
    const endDate = new Date(`2000-01-01T${end}`);
    if (endDate <= startDate) {
      setTimeError("End time must be after start time");
      return false;
    }
    setTimeError("");
    return true;
  };

  // ✅ Handle class change — filters subjects by grade and resets downstream
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassId = e.target.value;
    const selectedClass = classes.find((c) => c.id === Number(selectedClassId));

    setFormData((prev) => ({
      ...prev,
      classId: selectedClassId,
      subjectId: "", // reset subject
      teacherId: "", // reset teacher
    }));

    setFilteredTeachers([]);

    if (selectedClass) {
      setFilteredSubjects(
        subjects.filter((s) => s.grades?.includes(selectedClass.grade)),
      );
    } else {
      setFilteredSubjects([]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === "startTime" || name === "endTime") {
        validateTimeSlot(
          name === "startTime" ? value : prev.startTime,
          name === "endTime" ? value : prev.endTime,
        );
      }
      if (name === "dayOfWeek" || name === "startTime" || name === "endTime") {
        newData.roomId = "";
        setAvailableRooms([]);
        setRoomsFetched(false);
      }
      return newData;
    });
  };

  // ✅ Handle subject change — filters teachers by subject
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = e.target.value;
    setFormData((prev) => ({ ...prev, subjectId, teacherId: "" }));

    const filtered = teachers.filter((teacher) =>
      teacher.subjects?.some((s) => s.id === Number(subjectId)),
    );
    setFilteredTeachers(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.roomId) {
      showToast("Please select a room", false);
      return;
    }
    setLoading(true);
    try {
      await api.post("/schedule", {
        teacherId: Number(formData.teacherId),
        subjectId: Number(formData.subjectId),
        classId: Number(formData.classId),
        roomId: Number(formData.roomId),
        dayOfWeek: formData.dayOfWeek,
        startTime: formData.startTime,
        endTime: formData.endTime,
      });
      showToast("Schedule created successfully!", true);
      setFormData(initialForm);
      setFilteredSubjects([]);
      setFilteredTeachers([]);
      setAvailableRooms([]);
      setRoomsFetched(false);
    } catch (error: any) {
      showToast(
        error.response?.data?.message || "Error creating schedule",
        false,
      );
    }
    setLoading(false);
  };

  const checkRooms = async () => {
    const { dayOfWeek, startTime, endTime } = formData;
    if (!dayOfWeek || !startTime || !endTime) {
      showToast("Please select day and time first", false);
      return;
    }
    if (!validateTimeSlot(startTime, endTime)) return;
    setRoomsLoading(true);
    setRoomsFetched(false);
    setFormData((prev) => ({ ...prev, roomId: "" }));
    try {
      const res = await api.get("/rooms/available", {
        params: { dayOfWeek, startTime, endTime },
      });
      setAvailableRooms(res.data);
      setRoomsFetched(true);
    } catch {
      showToast("Could not fetch available rooms", false);
    }
    setRoomsLoading(false);
  };

  const selectedClass = classes.find((c) => c.id === Number(formData.classId));
  const isTimeSlotComplete =
    formData.dayOfWeek && formData.startTime && formData.endTime && !timeError;

  return (
    <Container>
      {toast && <Toast $ok={toast.ok}>{toast.msg}</Toast>}
      <Title>Create Schedule</Title>

      <Form onSubmit={handleSubmit}>
        {/* CLASS — moved up so subject list can react to it */}
        <FormGroup>
          <Label>Class</Label>
          <Select
            name="classId"
            value={formData.classId}
            onChange={handleClassChange}
            required
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                Grade {c.grade}-{c.section} (Strength: {c.currentStrength})
              </option>
            ))}
          </Select>
        </FormGroup>

        {/* SUBJECT — filtered by selected class grade */}
        <FormGroup>
          <Label>Subject</Label>
          <Select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleSubjectChange}
            required
            disabled={!formData.classId}
          >
            <option value="">
              {formData.classId ? "Select Subject" : "Select a class first"}
            </option>
            {filteredSubjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
          {formData.classId && filteredSubjects.length === 0 && (
            <Message type="error">
              No subjects assigned to Grade {selectedClass?.grade}. Add them in
              Curriculum settings.
            </Message>
          )}
        </FormGroup>

        {/* TEACHER — filtered by selected subject */}
        <FormGroup>
          <Label>Teacher</Label>
          <Select
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            required
            disabled={!formData.subjectId}
          >
            <option value="">
              {formData.subjectId ? "Select Teacher" : "Select a subject first"}
            </option>
            {filteredTeachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.fullName}
              </option>
            ))}
          </Select>
          {formData.subjectId && filteredTeachers.length === 0 && (
            <Message type="error">
              No teachers assigned to this subject. Assign one in teacher
              settings.
            </Message>
          )}
        </FormGroup>

        {/* DAY */}
        <FormGroup>
          <Label>Day</Label>
          <Select
            name="dayOfWeek"
            value={formData.dayOfWeek}
            onChange={handleChange}
            required
          >
            <option value="">Select Day</option>
            {Days.map((d) => (
              <option key={d} value={d}>
                {d[0] + d.slice(1).toLowerCase()}
              </option>
            ))}
          </Select>
        </FormGroup>

        {/* TIME SLOT */}
        <FormGroup>
          <Label>Time Slot</Label>
          <TimeSlotGroup>
            <Input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
            <Input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </TimeSlotGroup>
          {timeError && <Message type="error">{timeError}</Message>}
        </FormGroup>

        {/* CHECK ROOMS */}
        <CheckRoomsButton
          type="button"
          onClick={checkRooms}
          disabled={!isTimeSlotComplete || roomsLoading}
        >
          {roomsLoading ? "Checking..." : "🔍 Check Available Rooms"}
        </CheckRoomsButton>

        {roomsFetched && availableRooms.length > 0 && (
          <FormGroup>
            <Label>Available Rooms</Label>
            <RoomsGrid>
              {availableRooms.map((room) => (
                <RoomButton
                  key={room.id}
                  type="button"
                  selected={formData.roomId === String(room.id)}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      roomId: String(room.id),
                    }))
                  }
                >
                  {room.name}
                </RoomButton>
              ))}
            </RoomsGrid>
          </FormGroup>
        )}

        {roomsFetched && availableRooms.length === 0 && isTimeSlotComplete && (
          <Message type="error">No rooms available for this time slot</Message>
        )}

        {!roomsFetched && !roomsLoading && isTimeSlotComplete && (
          <Message type="info">
            Click "Check Available Rooms" to see options
          </Message>
        )}

        <Button type="submit" disabled={loading || !formData.roomId}>
          {loading ? "Creating..." : "Create Schedule"}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateSchedulePage;
