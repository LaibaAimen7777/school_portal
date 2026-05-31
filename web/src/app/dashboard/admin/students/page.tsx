"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import {
  Wrapper,
  ToastContainer,
  ModalOverlay,
} from "@/wrappers/adminStudents";
import { useRouter } from "next/navigation";
import {
  FaUserGraduate,
  FaIdCard,
  FaCalendarAlt,
  FaUsers,
  FaUserPlus,
  FaKey,
  FaExchangeAlt,
  FaSchool,
  FaCheckCircle,
} from "react-icons/fa";

type Student = {
  id: number;
  username: string;
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

  // Premium Alert Toast States
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Premium Dynamic prompt Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );
  const [inputClassId, setInputClassId] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await api.get("/student");
      setStudents(res.data);
    };
    fetchStudents();
  }, []);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4500);
  };

  const resetPassword = async (id: number) => {
    try {
      const res = await api.patch(`/student/${id}/reset-password`);
      triggerToast(
        `Password reset successfully! Temp key: ${res.data.temporaryPassword}`,
      );
    } catch (err) {
      triggerToast("Error resetting student password.");
    }
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
    } catch (err) {
      triggerToast("Failed to update class. Please check ID.");
    }
  };

  return (
    <Wrapper>
      {/* HEADER NAVIGATION PANEL */}
      <div className="header">
        <h1>
          <FaUserGraduate /> Student Management
        </h1>
        <button onClick={() => router.push("/dashboard/admin/create-student")}>
          <FaUserPlus />
          Create Student
        </button>
      </div>

      {/* STYLISH MASONRY/AUTO GRID */}
      <div className="grid">
        {students.map((student) => (
          <div className="card" key={student.id}>
            <div className="card-icon">
              <FaUserGraduate />
            </div>

            <h3>{student.username}</h3>

            <div className="info-row">
              <FaIdCard />
              <strong>Roll:</strong>
              <span className="value">{student.rollNumber}</span>
            </div>

            <div className="info-row">
              <FaSchool />
              <strong>Grade:</strong>
              <span className="value">{student.schoolClass.grade}th Grade</span>
            </div>

            <div className="info-row">
              <FaUsers />
              <strong>Section:</strong>
              <span className="value">
                Section {student.schoolClass.section}
              </span>
            </div>

            <div className="info-row">
              <FaCalendarAlt />
              <strong>Year:</strong>
              <span className="value">{student.joiningYear}</span>
            </div>

            {/* ACTION FOOTER ROW */}
            <div className="actions">
              {(student.schoolClass.grade === 9 ||
                student.schoolClass.grade === 10) && (
                <button
                  className="reset"
                  onClick={() => resetPassword(student.id)}
                >
                  <FaKey />
                  Reset
                </button>
              )}
              <button
                className="change"
                onClick={() => openClassModal(student.id)}
              >
                <FaExchangeAlt />
                Change Class
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* LUXURY INTERACTIVE SLIDE MODAL (Replaces window.prompt) */}
      <ModalOverlay $isOpen={isModalOpen}>
        <div className="modal-box">
          <h4>Assign New Class</h4>
          <input
            type="number"
            placeholder="Enter Class ID (e.g., 402)"
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

      {/* FLOATING HUD TOAST NOTIFICATION (Replaces window.alert) */}
      <ToastContainer $visible={showToast}>
        <FaCheckCircle className="toast-icon" />
        <span>{toastMessage}</span>
      </ToastContainer>
    </Wrapper>
  );
}
