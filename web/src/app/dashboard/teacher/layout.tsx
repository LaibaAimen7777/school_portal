"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/services/api";
import Link from "next/link";
import * as S from "@/wrappers/teacherDashboard";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [teacherData, setTeacherData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role !== "teacher") {
      router.replace("/landing");
      return;
    }

    setChecked(true);
  }, [router]);

  useEffect(() => {
    if (!checked) return;
    const fetchTeacherData = async () => {
      try {
        const res = await api.get("/teachers/dashboard");
        setTeacherData(res.data);
      } catch (error) {
        console.error("Failed to fetch teacher data:", error);
      }
    };
    fetchTeacherData();
  }, [checked]);

  const isActive = (path: string) => pathname === path;

  if (!checked) return null;

  const formattedDate = mounted
    ? new Date().toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <S.DashboardContainer>
      {/* 🧭 PREMIUM MINIMAL TOP NAV */}
      <S.NavWrapper>
        <S.NavContainer>
          <S.BrandGroup href="/dashboard/teacher" as={Link}>
            <span className="brand-icon">🎓</span>
            <span className="brand-name">Portal</span>
          </S.BrandGroup>

          <S.NavLinksList>
            {[
              { name: "Overview", path: "/dashboard/teacher" },
              { name: "Schedule", path: "/dashboard/teacher/schedule" },
              { name: "Students", path: "/dashboard/teacher/students" },
              { name: "Attendance", path: "/dashboard/teacher/attendance" },
            ].map((item) => (
              <S.NavLinkItem key={item.path}>
                <S.TopNavLink
                  as={Link}
                  href={item.path}
                  $active={isActive(item.path)}
                >
                  {item.name}
                </S.TopNavLink>
              </S.NavLinkItem>
            ))}
          </S.NavLinksList>

          <S.NavRightStatus>
            <span className="status-dot" /> Live Session
          </S.NavRightStatus>
        </S.NavContainer>
      </S.NavWrapper>

      {/* 💻 MAIN CONTENT WORKSPACE */}
      <S.Container>
        <S.HeaderCard>
          <S.HeaderContent>
            <S.TeacherInfo>
              <S.Avatar>
                {teacherData?.teacher?.fullName?.charAt(0) || "T"}
              </S.Avatar>
              <S.TeacherDetails>
                <div className="welcome-tag">Welcome Back 👋</div>
                <h2>{teacherData?.teacher?.fullName || "Teacher"}</h2>

                <S.BadgeGroup>
                  {teacherData?.teacher?.subjectGrades?.map((sg: any) => (
                    <S.Badge key={sg.id} $primary>
                      {sg.subject.name} • Grade {sg.grade}
                    </S.Badge>
                  ))}

                  {(!teacherData?.teacher?.subjectGrades ||
                    teacherData.teacher.subjectGrades.length === 0) && (
                    <S.Badge>No Subjects Assigned</S.Badge>
                  )}

                  <S.Badge className="id-badge">
                    ID: {teacherData?.teacher?.teacherCode || "N/A"}
                  </S.Badge>
                </S.BadgeGroup>
              </S.TeacherDetails>
            </S.TeacherInfo>

            <S.DateDisplay>
              <span className="icon">📅</span>
              <div>
                <span className="label">Today's Date</span>
                <p>{formattedDate}</p>
              </div>
            </S.DateDisplay>
          </S.HeaderContent>
        </S.HeaderCard>

        <S.MainContentWrapper>{children}</S.MainContentWrapper>
      </S.Container>
    </S.DashboardContainer>
  );
}
