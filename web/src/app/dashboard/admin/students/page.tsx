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
  FaArrowUp,
  FaArrowRight,
  FaGraduationCap,
  FaExclamationTriangle,
} from "react-icons/fa";

type Student = {
  id: number;
  rollNumber: number;
  joiningYear: number;
  schoolClass: {
    id: number;
    grade: number;
    section: string;
  };
};

type SchoolClass = {
  id: number;
  grade: number;
  section: string;
  currentStrength: number;
  maxStrength: number;
};

type PromotionMap = Record<number, number | null>;

type PromoteResult = {
  promoted: number;
  graduated: number;
  errors: string[];
};

type ModalStep = "setup" | "review" | "done";

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const router = useRouter();

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Single student class change
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [inputClassId, setInputClassId] = useState("");

  // Bulk promotion
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
  const [promoteStep, setPromoteStep] = useState<ModalStep>("setup");
  const [promotionMap, setPromotionMap] = useState<PromotionMap>({});
  const [promoteLoading, setPromoteLoading] = useState(false);
  const [promoteResult, setPromoteResult] = useState<PromoteResult | null>(null);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/student");
      setStudents(res.data);
    } catch {
      triggerToast("Failed to fetch student records.");
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await api.get("/school-class");
      setClasses(res.data);
    } catch {}
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4500);
  };

  // ── single student class change ──────────────────────────────────────────

  const openClassModal = (id: number) => {
    setSelectedStudentId(id);
    setInputClassId("");
    setIsClassModalOpen(true);
  };

  const handleClassChangeConfirm = async () => {
    if (!selectedStudentId || !inputClassId) return;
    try {
      await api.patch(`/student/${selectedStudentId}/change-class`, {
        classId: Number(inputClassId),
      });
      setIsClassModalOpen(false);
      triggerToast("Student class registration updated.");
      fetchStudents();
    } catch {
      triggerToast("Failed to update class. Please check ID.");
    }
  };

  // ── bulk promotion ───────────────────────────────────────────────────────

  const activeSourceClasses = classes
    .filter((c) => students.some((s) => s.schoolClass?.id === c.id))
    .sort((a, b) => a.grade - b.grade || a.section.localeCompare(b.section));

  const openPromoteModal = () => {
    const maxGrade = Math.max(...classes.map((c) => c.grade), 0);
    const defaultMap: PromotionMap = {};

    for (const cls of activeSourceClasses) {
      if (cls.grade >= maxGrade) {
        defaultMap[cls.id] = null; // graduate
      } else {
        const nextClass = classes.find(
          (c) => c.grade === cls.grade + 1 && c.section === cls.section,
        );
        // Fall back to any class in the next grade if same section doesn't exist
        const anyNextClass = classes.find((c) => c.grade === cls.grade + 1);
        defaultMap[cls.id] = nextClass?.id ?? anyNextClass?.id ?? null;
      }
    }

    setPromotionMap(defaultMap);
    setPromoteStep("setup");
    setPromoteResult(null);
    setIsPromoteModalOpen(true);
  };

  const handlePromotionMapChange = (fromClassId: number, toValue: string) => {
    setPromotionMap((prev) => ({
      ...prev,
      [fromClassId]: toValue === "graduate" ? null : Number(toValue),
    }));
  };

  const studentCountForClass = (classId: number) =>
    students.filter((s) => s.schoolClass?.id === classId).length;

  const totalBeingPromoted = activeSourceClasses.reduce(
    (sum, cls) =>
      promotionMap[cls.id] !== null ? sum + studentCountForClass(cls.id) : sum,
    0,
  );

  const totalGraduating = activeSourceClasses.reduce(
    (sum, cls) =>
      promotionMap[cls.id] === null ? sum + studentCountForClass(cls.id) : sum,
    0,
  );

  const handleConfirmPromotion = async () => {
    setPromoteLoading(true);
    try {
      const promotions = activeSourceClasses.map((cls) => ({
        fromClassId: cls.id,
        toClassId: promotionMap[cls.id] ?? null,
      }));

      const res = await api.post("/student/bulk-promote", { promotions });
      setPromoteResult(res.data);
      setPromoteStep("done");
      fetchStudents();
    } catch {
      triggerToast("Promotion failed. Please try again.");
      setIsPromoteModalOpen(false);
    } finally {
      setPromoteLoading(false);
    }
  };

  const promotionTargets = (fromGrade: number) =>
    classes
      .filter((c) => c.grade > fromGrade)
      .sort((a, b) => a.grade - b.grade || a.section.localeCompare(b.section));

  return (
    <Wrapper>
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
            style={{ background: "#7c3aed", marginRight: "8px" }}
            onClick={openPromoteModal}
          >
            <FaArrowUp />
            <span>Year-end Promotion</span>
          </button>
          <button
            className="create-btn"
            onClick={() => router.push("/dashboard/admin/create-student")}
          >
            <FaUserPlus />
            <span>Create Student</span>
          </button>
        </div>
      </DashboardHeaderCard>

      {/* ── student grid ─────────────────────────────────────────────────── */}
      <div className="grid">
        {students.map((student) => (
          <div className="card" key={student.id}>
            <div className="card-header">
              <div className="card-icon"><FaUserGraduate /></div>
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
                <span className="value">{student.schoolClass?.grade ?? "N/A"}th Grade</span>
              </div>
              <div className="info-row">
                <FaUsers className="info-icon" />
                <span className="label">Section</span>
                <span className="value">Section {student.schoolClass?.section ?? "N/A"}</span>
              </div>
              <div className="info-row">
                <FaCalendarAlt className="info-icon" />
                <span className="label">Joined</span>
                <span className="value">{student.joiningYear}</span>
              </div>
            </div>
            <div className="actions">
              <button className="change-btn" onClick={() => openClassModal(student.id)}>
                <FaExchangeAlt />
                <span>Change Class</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── single class change modal ─────────────────────────────────────── */}
      <ModalOverlay $isOpen={isClassModalOpen}>
        <div className="modal-box">
          <h4>Assign New Class</h4>
          <p className="modal-subtitle">Enter the target Class ID to reassign this student.</p>
          <input
            type="number"
            placeholder="e.g., 402"
            value={inputClassId}
            onChange={(e) => setInputClassId(e.target.value)}
          />
          <div className="modal-actions">
            <button className="cancel-btn" onClick={() => setIsClassModalOpen(false)}>Cancel</button>
            <button className="confirm-btn" onClick={handleClassChangeConfirm}>Update Class</button>
          </div>
        </div>
      </ModalOverlay>

      {/* ── year-end promotion modal ──────────────────────────────────────── */}
      <ModalOverlay $isOpen={isPromoteModalOpen}>
        <div
          className="modal-box"
          style={{ maxWidth: "640px", width: "100%" }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* STEP 1: setup */}
          {promoteStep === "setup" && (
            <>
              <h4 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FaArrowUp style={{ color: "#7c3aed" }} />
                Year-end Promotion
              </h4>
              <p className="modal-subtitle" style={{ marginBottom: "16px" }}>
                Map each class to its destination. Same-section classes in the next
                grade are pre-selected. Highest grade defaults to{" "}
                <strong>graduate</strong>.
              </p>

              <div style={{ overflowY: "auto", maxHeight: "340px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                      <th style={{ textAlign: "left", padding: "8px 6px", color: "#6b7280" }}>Current class</th>
                      <th style={{ textAlign: "center", padding: "8px 6px", color: "#6b7280" }}>Students</th>
                      <th style={{ padding: "8px 6px" }} />
                      <th style={{ textAlign: "left", padding: "8px 6px", color: "#6b7280" }}>Promote to</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeSourceClasses.map((cls) => {
                      const count = studentCountForClass(cls.id);
                      const currentTarget = promotionMap[cls.id];
                      const isGraduating = currentTarget === null;

                      return (
                        <tr
                          key={cls.id}
                          style={{
                            borderBottom: "1px solid #f3f4f6",
                            background: isGraduating ? "#faf5ff" : "transparent",
                          }}
                        >
                          <td style={{ padding: "10px 6px", fontWeight: 600 }}>
                            Grade {cls.grade}-{cls.section}
                          </td>
                          <td style={{ padding: "10px 6px", textAlign: "center" }}>
                            <span style={{
                              background: "#e0e7ff", color: "#3730a3",
                              borderRadius: "12px", padding: "2px 10px",
                              fontSize: "13px", fontWeight: 600,
                            }}>
                              {count}
                            </span>
                          </td>
                          <td style={{ padding: "10px 6px", textAlign: "center", color: "#9ca3af" }}>
                            <FaArrowRight />
                          </td>
                          <td style={{ padding: "10px 6px" }}>
                            <select
                              value={currentTarget === null ? "graduate" : String(currentTarget)}
                              onChange={(e) => handlePromotionMapChange(cls.id, e.target.value)}
                              style={{
                                padding: "6px 10px", borderRadius: "6px", width: "100%",
                                border: isGraduating ? "1px solid #a78bfa" : "1px solid #d1d5db",
                                background: isGraduating ? "#f5f3ff" : "#fff",
                                color: isGraduating ? "#6d28d9" : "#111",
                                fontWeight: isGraduating ? 600 : 400,
                                cursor: "pointer",
                              }}
                            >
                              <option value="graduate">🎓 Graduate (remove from active)</option>
                              {promotionTargets(cls.grade).map((target) => (
                                <option key={target.id} value={String(target.id)}>
                                  Grade {target.grade}-{target.section} ({target.currentStrength}/{target.maxStrength})
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="modal-actions" style={{ marginTop: "16px" }}>
                <button className="cancel-btn" onClick={() => setIsPromoteModalOpen(false)}>Cancel</button>
                <button
                  className="confirm-btn"
                  style={{ background: "#7c3aed" }}
                  onClick={() => setPromoteStep("review")}
                  disabled={activeSourceClasses.length === 0}
                >
                  Review Plan
                </button>
              </div>
            </>
          )}

          {/* STEP 2: review */}
          {promoteStep === "review" && (
            <>
              <h4 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FaExclamationTriangle style={{ color: "#f59e0b" }} />
                Confirm Promotion
              </h4>
              <p className="modal-subtitle">
                This will reassign all listed students. This cannot be undone.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "16px 0" }}>
                <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "#1d4ed8" }}>{totalBeingPromoted}</div>
                  <div style={{ fontSize: "13px", color: "#3b82f6", marginTop: "2px" }}>students being promoted</div>
                </div>
                <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "#6d28d9" }}>{totalGraduating}</div>
                  <div style={{ fontSize: "13px", color: "#7c3aed", marginTop: "2px" }}>students graduating</div>
                </div>
              </div>

              <div style={{ background: "#f9fafb", borderRadius: "8px", padding: "12px", overflowY: "auto", maxHeight: "220px", fontSize: "13px" }}>
                {activeSourceClasses.map((cls) => {
                  const target = promotionMap[cls.id];
                  const targetClass = target !== null ? classes.find((c) => c.id === target) : null;
                  const count = studentCountForClass(cls.id);

                  return (
                    <div key={cls.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0", borderBottom: "1px solid #e5e7eb" }}>
                      <span style={{ fontWeight: 600, minWidth: "90px" }}>Gr {cls.grade}-{cls.section}</span>
                      <span style={{ color: "#9ca3af", fontSize: "11px" }}>({count} students)</span>
                      <FaArrowRight style={{ color: "#d1d5db", flexShrink: 0 }} />
                      {targetClass ? (
                        <span style={{ color: "#1d4ed8", fontWeight: 500 }}>
                          Grade {targetClass.grade}-{targetClass.section}
                        </span>
                      ) : (
                        <span style={{ color: "#7c3aed", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                          <FaGraduationCap /> Graduated
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="modal-actions" style={{ marginTop: "16px" }}>
                <button className="cancel-btn" onClick={() => setPromoteStep("setup")} disabled={promoteLoading}>← Back</button>
                <button
                  className="confirm-btn"
                  style={{ background: "#7c3aed" }}
                  onClick={handleConfirmPromotion}
                  disabled={promoteLoading}
                >
                  {promoteLoading ? "Promoting..." : "Confirm & Promote"}
                </button>
              </div>
            </>
          )}

          {/* STEP 3: done */}
          {promoteStep === "done" && promoteResult && (
            <>
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <FaCheckCircle style={{ fontSize: "48px", color: "#10b981", marginBottom: "12px" }} />
                <h4 style={{ marginBottom: "6px" }}>Promotion Complete</h4>
                <p className="modal-subtitle">Academic year has been advanced.</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "16px 0" }}>
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "#15803d" }}>{promoteResult.promoted}</div>
                  <div style={{ fontSize: "13px", color: "#16a34a" }}>promoted</div>
                </div>
                <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "#6d28d9" }}>{promoteResult.graduated}</div>
                  <div style={{ fontSize: "13px", color: "#7c3aed" }}>graduated</div>
                </div>
              </div>

              {promoteResult.errors.length > 0 && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px 12px", marginBottom: "12px", fontSize: "13px", color: "#dc2626" }}>
                  <strong>Some issues occurred:</strong>
                  <ul style={{ margin: "4px 0 0 16px" }}>
                    {promoteResult.errors.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                </div>
              )}

              <div className="modal-actions">
                <button className="confirm-btn" onClick={() => setIsPromoteModalOpen(false)}>Done</button>
              </div>
            </>
          )}
        </div>
      </ModalOverlay>

      <ToastContainer $visible={showToast}>
        <FaCheckCircle className="toast-icon" />
        <span>{toastMessage}</span>
      </ToastContainer>
    </Wrapper>
  );
}