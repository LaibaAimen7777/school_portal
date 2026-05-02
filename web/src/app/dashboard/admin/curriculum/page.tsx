// src/app/dashboard/admin/curriculum/page.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";

interface Teacher {
  id: number;
  fullName: string;
}

interface Subject {
  id: number;
  name: string;
  grades: number[];
  teacherCount: number;
  teachers: Teacher[];
}

interface GradeGroup {
  grade: number;
  subjects: Subject[];
}

const ALL_GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function CurriculumPage() {
  const [grouped, setGrouped] = useState<GradeGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGrade, setExpandedGrade] = useState<number | null>(null);

  // Create form
  const [newName, setNewName] = useState("");
  const [newGrades, setNewGrades] = useState<number[]>([]);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editGrades, setEditGrades] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCurriculum();
  }, []);

  const fetchCurriculum = async () => {
    setLoading(true);
    try {
      const res = await api.get("/subject/by-grade");
      setGrouped(res.data);
    } catch {
      showError("Failed to load curriculum");
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newName.trim()) {
      showError("Enter a subject name");
      return;
    }
    if (newGrades.length === 0) {
      showError("Select at least one grade");
      return;
    }
    setCreating(true);
    try {
      await api.post("/subject", { name: newName.trim(), grades: newGrades });
      showSuccess("Subject created");
      setNewName("");
      setNewGrades([]);
      setShowCreateForm(false);
      fetchCurriculum();
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to create subject");
    }
    setCreating(false);
  };

  const startEdit = (subject: Subject) => {
    setEditingId(subject.id);
    setEditName(subject.name);
    setEditGrades([...subject.grades]);
  };

  const handleSave = async (id: number) => {
    if (!editName.trim()) {
      showError("Name cannot be empty");
      return;
    }
    if (editGrades.length === 0) {
      showError("Select at least one grade");
      return;
    }
    setSaving(true);
    try {
      const deduped = [...new Set(editGrades)];
      await api.patch(`/subject/${id}`, {
        name: editName.trim(),
        grades: deduped,
      });
      showSuccess("Subject updated");
      setEditingId(null);
      fetchCurriculum();
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to update");
    }
    setSaving(false);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Deactivate subject "${name}"?`)) return;
    try {
      await api.delete(`/subject/${id}`);
      showSuccess("Subject deactivated");
      fetchCurriculum();
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to deactivate");
    }
  };

  const toggleGrade = (
    grade: number,
    current: number[],
    set: (g: number[]) => void,
  ) => {
    set(
      current.includes(grade)
        ? current.filter((g) => g !== grade)
        : [...current, grade].sort((a, b) => a - b),
    );
  };

  if (loading) return <div style={{ padding: 32 }}>Loading...</div>;

  return (
    <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ margin: 0 }}>Curriculum Management</h2>
        <button
          onClick={() => setShowCreateForm((v) => !v)}
          style={{
            padding: "8px 18px",
            borderRadius: "6px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          {showCreateForm ? "Cancel" : "+ Add Subject"}
        </button>
      </div>

      {/* Create form */}
      {showCreateForm && (
        <div
          style={{
            border: "1px solid #bfdbfe",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "24px",
            background: "#eff6ff",
          }}
        >
          <h3 style={{ margin: "0 0 16px", fontSize: "15px" }}>New Subject</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Subject Name
              </label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Mathematics"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  width: "300px",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Applicable Grades
              </label>
              <GradePicker
                selected={newGrades}
                onToggle={(g) => toggleGrade(g, newGrades, setNewGrades)}
              />
            </div>
            <button
              onClick={handleCreate}
              disabled={creating}
              style={{
                alignSelf: "flex-start",
                padding: "8px 20px",
                borderRadius: "6px",
                border: "none",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {creating ? "Creating..." : "Create Subject"}
            </button>
          </div>
        </div>
      )}

      {/* Grouped by grade */}
      {grouped.length === 0 ? (
        <div style={{ color: "#6b7280", fontSize: "14px" }}>
          No subjects yet. Add your first subject above.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {grouped.map(({ grade, subjects }) => (
            <div
              key={grade}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              {/* Grade header */}
              <button
                onClick={() =>
                  setExpandedGrade(expandedGrade === grade ? null : grade)
                }
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  border: "none",
                  background: expandedGrade === grade ? "#f8fafc" : "white",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom:
                    expandedGrade === grade ? "1px solid #e2e8f0" : "none",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span style={{ fontWeight: 700, fontSize: "15px" }}>
                    Grade {grade}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "2px 10px",
                      borderRadius: "99px",
                      background: "#e0f2fe",
                      color: "#0369a1",
                    }}
                  >
                    {subjects.length} subject{subjects.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <span style={{ color: "#94a3b8" }}>
                  {expandedGrade === grade ? "▲" : "▼"}
                </span>
              </button>

              {/* Subject rows */}
              {expandedGrade === grade && (
                <div>
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      style={{
                        padding: "14px 20px",
                        borderBottom: "1px solid #f9fafb",
                        background:
                          editingId === subject.id ? "#fafafa" : "white",
                      }}
                    >
                      {editingId === subject.id ? (
                        /* Edit mode */
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            style={{
                              padding: "6px 10px",
                              borderRadius: "6px",
                              border: "1px solid #d1d5db",
                              fontSize: "13px",
                              width: "280px",
                            }}
                          />
                          <div>
                            <p
                              style={{
                                fontSize: "12px",
                                color: "#6b7280",
                                margin: "0 0 6px",
                              }}
                            >
                              Grades:
                            </p>
                            <GradePicker
                              selected={editGrades}
                              onToggle={(g) =>
                                toggleGrade(g, editGrades, setEditGrades)
                              }
                            />
                          </div>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => handleSave(subject.id)}
                              disabled={saving}
                              style={{
                                padding: "6px 16px",
                                borderRadius: "6px",
                                border: "none",
                                background: "#2563eb",
                                color: "white",
                                cursor: "pointer",
                                fontSize: "13px",
                              }}
                            >
                              {saving ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              style={{
                                padding: "6px 16px",
                                borderRadius: "6px",
                                border: "1px solid #e2e8f0",
                                background: "white",
                                cursor: "pointer",
                                fontSize: "13px",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* View mode */
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: 600, fontSize: "14px" }}>
                              {subject.name}
                            </span>
                            <div
                              style={{
                                marginTop: "4px",
                                display: "flex",
                                gap: "4px",
                                flexWrap: "wrap",
                              }}
                            >
                              {subject.grades.map((g, index) => (
                                <span
                                  key={`${g}-${index}`}
                                  style={{
                                    fontSize: "11px",
                                    padding: "1px 8px",
                                    borderRadius: "99px",
                                    background: "#f1f5f9",
                                    color: "#475569",
                                    border: "1px solid #e2e8f0",
                                  }}
                                >
                                  Gr {g}
                                </span>
                              ))}
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "#94a3b8",
                                  marginLeft: "4px",
                                }}
                              >
                                {subject.teacherCount} teacher
                                {subject.teacherCount !== 1 ? "s" : ""} assigned
                              </span>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => startEdit(subject)}
                              style={{
                                padding: "5px 14px",
                                borderRadius: "6px",
                                border: "1px solid #e2e8f0",
                                background: "white",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(subject.id, subject.name)
                              }
                              style={{
                                padding: "5px 14px",
                                borderRadius: "6px",
                                border: "1px solid #fecaca",
                                background: "#fef2f2",
                                color: "#b91c1c",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {subjects.length === 0 && (
                    <div
                      style={{
                        padding: "14px 20px",
                        fontSize: "13px",
                        color: "#9ca3af",
                      }}
                    >
                      No subjects assigned to Grade {grade} yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Grade picker component
function GradePicker({
  selected,
  onToggle,
}: {
  selected: number[];
  onToggle: (grade: number) => void;
}) {
  return (
    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
      {ALL_GRADES.map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => onToggle(g)}
          style={{
            padding: "4px 12px",
            borderRadius: "6px",
            border: "1px solid",
            borderColor: selected.includes(g) ? "#2563eb" : "#e2e8f0",
            background: selected.includes(g) ? "#eff6ff" : "white",
            color: selected.includes(g) ? "#2563eb" : "#6b7280",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: selected.includes(g) ? 600 : 400,
          }}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
