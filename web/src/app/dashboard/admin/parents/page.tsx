"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";
import {
  ParentsContainer,
  ParentsHeader,
  ParentsTitle,
  SearchWrapper,
  SearchInput,
  TableWrapper,
  StyledTable,
  StudentBadge,
  ResetButton,
  EmptyState,
  CredentialCardContainer,
  CredentialCard,
  PrimaryButton,
  SecondaryButton,
} from "@/wrappers/adminParents";
import {
  FaUserFriends,
  FaSearch,
  FaKey,
  FaPhone,
  FaEnvelope,
  FaUserGraduate,
  FaDownload,
  FaPrint,
  FaTimes,
} from "react-icons/fa";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

interface User {
  id: number;
  username: string;
  role: string;
  password: string;
  can_login: boolean;
  is_active: boolean;
  must_change_password: boolean;
  created_at: string;
}

interface Parent {
  id: number;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  students: {
    id: number;
    firstName: string;
    lastName: string;
  }[];
  user: User;
}

export default function ParentsPage() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [resettingId, setResettingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  } | null>(null);

  useEffect(() => {
    fetchParents();
  }, []);

  useEffect(() => {
    if (credentials) {
      const timer = setTimeout(() => {
        handleDownloadPDF();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [credentials]);

  const handleResetClick = (parentId: number, parentName: string) => {
    setSelectedParent({ id: parentId, name: parentName });
    setIsModalOpen(true);
  };

  const fetchParents = async () => {
    try {
      const res = await api.get("/parent");
      setParents(res.data);
    } catch (err) {
      console.error("Failed to load parents", err);
      showError("Failed to load parents list");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (parentId: number, parentName: string) => {
    // if (
    //   !confirm(
    //     `Are you sure you want to reset password for ${parentName}? A new temporary password will be generated.`,
    //   )
    // ) {
    //   return;
    // }

    setResettingId(parentId);

    try {
      const res = await api.post(`/parent/${parentId}/reset-password`);
      const { username, temporaryPassword } = res.data;

      setCredentials({
        username,
        password: temporaryPassword,
      });
      showSuccess("Password reset successfully!");
    } catch (err: any) {
      showError(
        err.response?.data?.message || "Failed to reset parent password",
      );
    } finally {
      setResettingId(null);
    }
  };

  const handleConfirmReset = async () => {
    if (!selectedParent) return;

    setIsModalOpen(false);

    await resetPassword(selectedParent.id, selectedParent.name);

    setSelectedParent(null);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("parentCredentialCard");
    if (!element) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Parent-${credentials?.username}-Credentials.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF", err);
    }
  };

  const filteredParents = parents.filter((p) => {
    const query = search.toLowerCase();
    const father = p.fatherName?.toLowerCase() || "";
    const mother = p.motherName?.toLowerCase() || "";
    const phone = p.phone?.toLowerCase() || "";
    const email = p.email?.toLowerCase() || "";
    const username = p.user?.username?.toLowerCase() || "";

    const matchesChildren = p.students?.some((s) =>
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(query),
    );

    return (
      father.includes(query) ||
      mother.includes(query) ||
      phone.includes(query) ||
      email.includes(query) ||
      username.includes(query) ||
      matchesChildren
    );
  });

  if (loading) return <LoadingOverlay />;

  return (
    <ParentsContainer>
      <ParentsHeader>
        <ParentsTitle>
          <FaUserFriends />
          Parents Directory
        </ParentsTitle>

        <SearchWrapper>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder="Search by parent, phone, or student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchWrapper>
      </ParentsHeader>

      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th>Parents</th>
              <th>Username</th>
              <th>Contact Details</th>
              <th>Registered Children</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParents.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState>
                    <FaUserFriends />
                    <p>
                      {search
                        ? "No parents match your search criteria"
                        : "No parent records found"}
                    </p>
                  </EmptyState>
                </td>
              </tr>
            ) : (
              filteredParents.map((parent) => (
                <tr key={parent.id}>
                  <td>
                    <strong>
                      {parent.fatherName || "—"}
                      {parent.fatherName && parent.motherName ? " & " : ""}
                      {parent.motherName || ""}
                    </strong>
                  </td>
                  <td>
                    <span className="username">
                      @{parent.user?.username || "N/A"}
                    </span>
                  </td>
                  <td>
                    <div className="contact-info">
                      {parent.phone && (
                        <span>
                          <FaPhone /> {parent.phone}
                        </span>
                      )}
                      {parent.email && (
                        <span>
                          <FaEnvelope /> {parent.email}
                        </span>
                      )}
                      {!parent.phone && !parent.email && <span>—</span>}
                    </div>
                  </td>
                  <td>
                    <div className="children-list">
                      {(parent.students ?? []).length === 0 ? (
                        <span>—</span>
                      ) : (
                        parent.students.map((student) => (
                          <StudentBadge key={student.id}>
                            <FaUserGraduate />
                            {student.firstName} {student.lastName}
                          </StudentBadge>
                        ))
                      )}
                    </div>
                  </td>
                  <td>
                    <ResetButton
                      onClick={() =>
                        handleResetClick(
                          parent.id,
                          parent.fatherName || parent.motherName || "Parent",
                        )
                      }
                      disabled={resettingId === parent.id}
                    >
                      <FaKey />
                      {resettingId === parent.id
                        ? "Resetting..."
                        : "Reset Password"}
                    </ResetButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableWrapper>

      {/* Generated Credentials Download/Print Modal */}
      {credentials && (
        <CredentialCardContainer onClick={() => setCredentials(null)}>
          <CredentialCard onClick={(e) => e.stopPropagation()}>
            <div id="parentCredentialCard">
              <div className="card-header">
                <h3>Parent Access Credentials</h3>
                <SecondaryButton
                  style={{ padding: "0.4rem 0.6rem", border: "none" }}
                  onClick={() => setCredentials(null)}
                >
                  <FaTimes />
                </SecondaryButton>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginTop: "1rem",
                }}
              >
                <div className="field-group">
                  <label>Username</label>
                  <span>{credentials.username}</span>
                </div>

                <div className="field-group">
                  <label>Temporary Password</label>
                  <span>{credentials.password}</span>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <SecondaryButton onClick={() => window.print()}>
                <FaPrint /> Print
              </SecondaryButton>

              <PrimaryButton onClick={handleDownloadPDF}>
                <FaDownload /> Download PDF
              </PrimaryButton>
            </div>
          </CredentialCard>
        </CredentialCardContainer>
      )}
      {isModalOpen && selectedParent && (
        <CredentialCardContainer onClick={() => setIsModalOpen(false)}>
          <CredentialCard onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3>Confirm Password Reset</h3>
              <SecondaryButton
                style={{ padding: "0.4rem 0.6rem", border: "none" }}
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </SecondaryButton>
            </div>

            <p style={{ marginTop: "1rem", lineHeight: "1.5" }}>
              Are you sure you want to reset password for{" "}
              <strong>{selectedParent.name}</strong>? <br />A new temporary
              password will be generated.
            </p>

            <div className="card-actions">
              <SecondaryButton onClick={() => setIsModalOpen(false)}>
                Cancel
              </SecondaryButton>

              <PrimaryButton
                onClick={handleConfirmReset}
                disabled={resettingId === selectedParent.id}
              >
                {resettingId === selectedParent.id
                  ? "Resetting..."
                  : "Confirm Reset"}
              </PrimaryButton>
            </div>
          </CredentialCard>
        </CredentialCardContainer>
      )}
    </ParentsContainer>
  );
}
