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
      console.log("formData.classId", formData.classId);
      console.log("day", day);
      console.log("URL classId", classId);
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

  const fetchData = async () => {
    const teachersRes = await api.get("/teachers");
    const subjectsRes = await api.get("/subject");
    const classesRes = await api.get("/school-class");

    console.log(classesRes.data);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Validate time when either start or end changes
      if (name === "startTime" || name === "endTime") {
        validateTimeSlot(
          name === "startTime" ? value : prev.startTime,
          name === "endTime" ? value : prev.endTime,
        );
      }
      // Reset room when time or day changes
      if (name === "dayOfWeek" || name === "startTime" || name === "endTime") {
        newData.roomId = "";
        setAvailableRooms([]);
        setRoomsFetched(false);
      }

      return newData;
    });
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

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = e.target.value;

    setFormData({
      ...formData,
      subjectId,
      teacherId: "",
    });

    const filtered = teachers.filter((teacher) =>
      teacher.subjects?.some((s) => s.id === Number(subjectId)),
    );

    setFilteredTeachers(filtered);
  };

  const checkRooms = async () => {
    const { dayOfWeek, startTime, endTime } = formData;
    if (!dayOfWeek || !startTime || !endTime) {
      showToast("Please select day and time first", false);
      return;
    }
    if (!validateTimeSlot(startTime, endTime)) {
      return;
    }
    setRoomsLoading(true);
    setRoomsFetched(false);
    setFormData((prev) => ({ ...prev, roomId: "" }));
    try {
      const res = await api.get("/rooms/available", {
        params: { dayOfWeek, startTime, endTime },
      });
      console.log("res.data in w in sc", res.data);
      setAvailableRooms(res.data);
      setRoomsFetched(true);
    } catch {
      showToast("Could not fetch available rooms", false);
    }
    setRoomsLoading(false);
  };

  const isTimeSlotComplete =
    formData.dayOfWeek && formData.startTime && formData.endTime && !timeError;

  return (
    <Container>
      {toast && <Toast $ok={toast.ok}>{toast.msg}</Toast>}

      <Title>Create Schedule</Title>

      <Form onSubmit={handleSubmit}>
        {/* DAY AND TIME SECTION */}
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

        <FormGroup>
          <Label>Time Slot</Label>
          <TimeSlotGroup>
            <Input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              placeholder="Start Time"
            />
            <Input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              placeholder="End Time"
            />
          </TimeSlotGroup>
          {timeError && <Message type="error">{timeError}</Message>}
        </FormGroup>

        {/* CHECK ROOMS BUTTON */}
        <CheckRoomsButton
          type="button"
          onClick={checkRooms}
          disabled={!isTimeSlotComplete || roomsLoading}
        >
          {roomsLoading ? "Checking..." : "🔍 Check Available Rooms"}
        </CheckRoomsButton>

        {/* AVAILABLE ROOMS */}
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

        {/* CLASS */}
        <FormGroup>
          <Label>Class</Label>
          <Select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
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

        {/* SUBJECT */}
        <FormGroup>
          <Label>Subject</Label>
          <Select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleSubjectChange}
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        {/* TEACHER */}
        <FormGroup>
          <Label>Teacher</Label>
          <Select
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            required
            disabled={!formData.subjectId}
          >
            <option value="">Select Teacher</option>
            {filteredTeachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.fullName}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Button type="submit" disabled={loading || !formData.roomId}>
          {loading ? "Creating..." : "Create Schedule"}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateSchedulePage;
