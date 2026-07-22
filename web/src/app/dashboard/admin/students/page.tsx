"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import {
  Wrapper,
  ToastContainer,
  ModalOverlay,
} from "@/wrappers/adminStudents";
import {
  DashboardHeaderCard,
  UserIconWrapper,
} from "@/wrappers/adminLayoutStyles";
import { useRouter } from "next/navigation";
import {
  FaUserGraduate,
  FaIdCard,
  FaCalendarAlt,
  FaUsers,
  FaUserPlus,
  FaExchangeAlt,
  FaSchool,
  FaCheckCircle,
} from "react-icons/fa";

type Student = {
  id: number;
  rollNumber: number;
  joiningYear: number;
  schoolClass: {
    grade: number;
    section: string;
  };
};

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  // Alert Toast States
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Dynamic Class Prompt Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );
  const [inputClassId, setInputClassId] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/student");
        setStudents(res.data);
      } catch {
        triggerToast("Failed to fetch student records.");
      }
    };
    fetchStudents();
  }, []);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4500);
  };

  const openClassModal = (id: number) => {
    setSelectedStudentId(id);
    setInputClassId("");
    setIsModalOpen(true);
  };

  const handleClassChangeConfirm = async () => {
    if (!selectedStudentId || !inputClassId) return;

    try {
      await api.patch(`/student/${selectedStudentId}/change-class`, {
        classId: Number(inputClassId),
      });
      setIsModalOpen(false);
      triggerToast("Student class registration updated.");

      // Refresh list seamlessly
      const res = await api.get("/student");
      setStudents(res.data);
    } catch {
      triggerToast("Failed to update class. Please check ID.");
    }
  };

  return (
    <Wrapper>
      {/* MODERN GLASS/PUNCHY HEADER PILL */}
      <DashboardHeaderCard style={{ marginBottom: "2rem" }}>
        <div className="header-left">
          <UserIconWrapper>
            <FaUserGraduate />
          </UserIconWrapper>
          <h1>STUDENT MANAGEMENT</h1>
        </div>
        <div className="header-right">
          <button
            className="create-btn"
            onClick={() => router.push("/dashboard/admin/create-student")}
          >
            <FaUserPlus />
            <span>Create Student</span>
          </button>
        </div>
      </DashboardHeaderCard>

      {/* CLEAN GRID LAYOUT */}
      <div className="grid">
        {students.map((student) => (
          <div className="card" key={student.id}>
            <div className="card-header">
              <div className="card-icon">
                <FaUserGraduate />
              </div>
              <span className="student-badge">ID #{student.id}</span>
            </div>

            <div className="card-body">
              <div className="info-row">
                <FaIdCard className="info-icon" />
                <span className="label">Roll No</span>
                <span className="value">{student.rollNumber}</span>
              </div>

              <div className="info-row">
                <FaSchool className="info-icon" />
                <span className="label">Grade</span>
                <span className="value">
                  {student.schoolClass?.grade ?? "N/A"}th Grade
                </span>
              </div>

              <div className="info-row">
                <FaUsers className="info-icon" />
                <span className="label">Section</span>
                <span className="value">
                  Section {student.schoolClass?.section ?? "N/A"}
                </span>
              </div>

              <div className="info-row">
                <FaCalendarAlt className="info-icon" />
                <span className="label">Joined</span>
                <span className="value">{student.joiningYear}</span>
              </div>
            </div>

            <div className="actions">
              <button
                className="change-btn"
                onClick={() => openClassModal(student.id)}
              >
                <FaExchangeAlt />
                <span>Change Class</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODERN MODAL */}
      <ModalOverlay $isOpen={isModalOpen}>
        <div className="modal-box">
          <h4>Assign New Class</h4>
          <p className="modal-subtitle">
            Enter the target Class ID to reassign this student.
          </p>
          <input
            type="number"
            placeholder="e.g., 402"
            value={inputClassId}
            onChange={(e) => setInputClassId(e.target.value)}
          />
          <div className="modal-actions">
            <button
              className="cancel-btn"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button className="confirm-btn" onClick={handleClassChangeConfirm}>
              Update Class
            </button>
          </div>
        </div>
      </ModalOverlay>

      {/* FLOATING HUD TOAST */}
      <ToastContainer $visible={showToast}>
        <FaCheckCircle className="toast-icon" />
        <span>{toastMessage}</span>
      </ToastContainer>
    </Wrapper>
  );
}
