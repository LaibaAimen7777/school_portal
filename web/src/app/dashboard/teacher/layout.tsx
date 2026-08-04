"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/services/api";
import Link from "next/link";
import Image from "next/image";
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.replace("/login");
  };

  const isActive = (path: string) => pathname === path;

  if (!checked) return null;

  const formattedDate = mounted
    ? new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const teacherName = teacherData?.teacher?.fullName || "TEACHER";
  const teacherInitial = teacherName.charAt(0);

  return (
    <S.DashboardContainer>
      {/* 🧭 TOP BANNER HEADER WITH PILL TABS & LOGOUT */}
      <S.BannerHeader>
        <S.BannerHeaderContent>
          <S.BrandSection href="/dashboard/teacher" as={Link}>
            <S.LogoCircle>
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={40}
                height={40}
                priority
              />
            </S.LogoCircle>
          </S.BrandSection>

          <S.NavTabsInline>
            {[
              { name: "OVERVIEW", path: "/dashboard/teacher" },
              { name: "SCHEDULE", path: "/dashboard/teacher/schedule" },
              { name: "STUDENTS", path: "/dashboard/teacher/students" },
              { name: "ATTENDANCE", path: "/dashboard/teacher/attendance" },
            ].map((item) => (
              <S.PillButton
                key={item.path}
                as={Link}
                href={item.path}
                $active={isActive(item.path)}
              >
                {item.name}
              </S.PillButton>
            ))}
          </S.NavTabsInline>

          <S.LogoutPillButton onClick={handleLogout}>
            {" "}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </S.LogoutPillButton>
        </S.BannerHeaderContent>
      </S.BannerHeader>

      {/* 💻 MAIN WORKSPACE */}
      <S.MainContainer>
        {/* 🟡 HERO CARD PROFILE SECTION */}
        <S.BannerHeroCard>
          <S.HeroAvatar>{teacherInitial}</S.HeroAvatar>

          <S.HeroDetails>
            <h2>{teacherName}</h2>
            <S.SubDetails>
              ID: #{teacherData?.teacher?.teacherCode || "N/A"}
            </S.SubDetails>

            <S.BadgeGroup>
              {teacherData?.teacher?.subjectGrades?.map((sg: any) => (
                <S.SubjectPill key={sg.id}>
                  {sg.subject.name} (GRADE {sg.grade})
                </S.SubjectPill>
              ))}

              {(!teacherData?.teacher?.subjectGrades ||
                teacherData.teacher.subjectGrades.length === 0) && (
                <S.SubjectPill>NO SUBJECTS ASSIGNED</S.SubjectPill>
              )}
            </S.BadgeGroup>
          </S.HeroDetails>

          {/* 📅 REFINED DATE CARD */}
          <S.DatePillCard>
            <span className="date-label">TODAY'S DATE</span>
            <span className="date-value">{formattedDate}</span>
          </S.DatePillCard>
        </S.BannerHeroCard>

        {/* PAGE CONTENT PANEL */}
        <S.ContentCard>{children}</S.ContentCard>
      </S.MainContainer>
    </S.DashboardContainer>
  );
}
