"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Wrapper } from "@/wrappers/adminCreateStudent";

type SchoolClass = {
  id: number;
  grade: number;
  section: string;
  currentStrength: number;
  maxStrength: number;
};
type Grade = {
  id: number;
  grade: number;
};
export default function CreateStudentPage() {
  // Class State
  const [grades, setGrades] = useState<Grade[]>([]);
  const [sections, setSections] = useState<SchoolClass[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);

  // Student State
  const [firstName, setFirstName] = useState("Alice");
  const [lastName, setLastName] = useState("Wood");
  const [dateOfBirth, setDateOfBirth] = useState("2010-01-01");
  const [gender, setGender] = useState("FEMALE");

  // Parent State
  const [phone, setPhone] = useState("03001234567");
  const [fatherName, setFatherName] = useState("John Doe");
  const [motherName, setMotherName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane@gmail.com");
  const [address, setAddress] = useState("123 Test Street");
  const [parentExists, setParentExists] = useState(false);

  const [joiningYear, setJoiningYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch grades
  useEffect(() => {
    const fetchGrades = async () => {
      const res = await api.get("/school-class/grades");
      setGrades(res.data);
    };
    fetchGrades();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // First Name
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName = "First name must contain only letters";
    }

    // Last Name
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName = "Last name must contain only letters";
    }

    // Date of Birth
    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else if (new Date(dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Date of birth cannot be in the future";
    }

    // Gender
    if (!gender) {
      newErrors.gender = "Please select gender";
    }

    // Phone
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^03\d{9}$/.test(phone)) {
      newErrors.phone = "Phone must be 11 digits and start with 03";
    }

    // Email
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Father Name
    if (!fatherName.trim()) {
      newErrors.fatherName = "Father name is required";
    }

    // Mother Name
    if (!motherName.trim()) {
      newErrors.motherName = "Mother name is required";
    }

    // Address
    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // When grade selected → fetch sections
  const handleGradeChange = async (grade: number) => {
    setSelectedGrade(grade);
    setSelectedClass(null);
    const res = await api.get(`/school-class/sections?gradeId=${grade}`);
    console.log("res in cs in web:", res);
    setSections(res.data);
  };

  const handleSectionChange = (classId: number) => {
    const found = sections.find((s) => s.id === classId) || null;
    setSelectedClass(found);
  };

  const seatsAvailable =
    selectedClass && selectedClass.maxStrength - selectedClass.currentStrength;

  const isFull =
    selectedClass && selectedClass.currentStrength >= selectedClass.maxStrength;

  // Parent auto-check
  const handlePhoneBlur = async () => {
    if (!phone) return;

    try {
      const res = await api.get(`/parent/by-phone?phone=${phone}`);
      if (res.data) {
        setFatherName(res.data.fatherName);
        setMotherName(res.data.motherName);
        setEmail(res.data.email);
        setAddress(res.data.address);
        setParentExists(true);
      }
    } catch {
      setParentExists(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedClass) return alert("Please select class first");
    if (isFull) return alert("Selected section is full");
    if (!validateForm()) return;
    try {
      setLoading(true);

      const res = await api.post("/student", {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        fatherName,
        motherName,
        phone,
        email,
        address,
        classId: selectedClass.id,
        joiningYear,
      });

      if (res.data.username) {
        alert(
          `Portal Created!\nUsername: ${res.data.username}\nPassword: ${res.data.temporaryPassword}`,
        );
      } else {
        alert("Student admitted successfully!");
      }
    } catch (err) {
      alert("Failed to create student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="card">
        <h1>Student Admission</h1>

        {/* ================= CLASS SELECTION ================= */}
        <h3>Step 1: Select Class</h3>

        <label>Grade</label>
        <select onChange={(e) => handleGradeChange(Number(e.target.value))}>
          <option value="">Select Grade</option>
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              Grade {g.grade}
            </option>
          ))}
        </select>

        {selectedGrade && (
          <>
            <label>Section</label>
            <select
              onChange={(e) => handleSectionChange(Number(e.target.value))}
            >
              <option value="">Select Section</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.section} ({s.currentStrength}/{s.maxStrength})
                </option>
              ))}
            </select>
          </>
        )}

        {selectedClass && <p>Seats Available: {seatsAvailable}</p>}

        {isFull && (
          <p style={{ color: "red" }}>
            This section is full. Please select another.
          </p>
        )}

        {/* ================= STUDENT INFO ================= */}
        {selectedClass && !isFull && (
          <>
            <h3>Step 2: Student Information</h3>
            <input
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.firstName}
              </p>
            )}
            <input
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.lastName}
              </p>
            )}
            <input
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {errors.dateOfBirth && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.dateOfBirth}
              </p>
            )}
            <select onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.gender && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.gender}</p>
            )}

            <h3>Step 3: Parent Information</h3>
            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={handlePhoneBlur}
            />
            {errors.phone && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.phone}</p>
            )}

            {parentExists && (
              <p style={{ color: "green" }}>
                Existing parent found. Student will be attached.
              </p>
            )}

            <input
              placeholder="Father Name"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
            />
            {errors.fatherName && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.fatherName}
              </p>
            )}
            <input
              placeholder="Mother Name"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
            />
            {errors.motherName && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.motherName}
              </p>
            )}
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>
            )}
            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.address}</p>
            )}

            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "Admitting..." : "Admit Student"}
            </button>
          </>
        )}
      </div>
    </Wrapper>
  );
}
