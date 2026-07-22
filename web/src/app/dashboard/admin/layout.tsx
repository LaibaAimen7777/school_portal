"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  LayoutWrapper,
  Sidebar,
  SidebarHeader,
  LogoWrapper,
  LogoImageWrapper,
  LogoText,
  NavSection,
  NavItem,
  SidebarFooter,
  UserInfo,
  UserAvatar,
  UserDetails,
  LogoutButton,
  ContentArea,
} from "@/wrappers/adminLayoutStyles";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaUserPlus,
  FaSignOutAlt,
  FaTachometerAlt,
  FaCog,
  FaCalendarAlt,
  FaHome,
} from "react-icons/fa";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [userData, setUserData] = useState({
    initial: "A",
    name: "Admin User",
    email: "admin@school.com",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role !== "admin") {
      router.replace("/landing");
      return;
    }

    const userEmail = localStorage.getItem("email") || "admin@school.com";
    setUserData({
      initial: userEmail.charAt(0).toUpperCase(),
      name: "Admin User",
      email: userEmail,
    });

    setChecked(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  if (!checked) return null;

  const navItems = [
    {
      section: "MAIN",
      items: [
        { path: "/dashboard/admin", icon: FaTachometerAlt, label: "Dashboard" },
      ],
    },
    {
      section: "MANAGEMENT",
      items: [
        { path: "/dashboard/admin/students", icon: FaUsers, label: "Students" },
        {
          path: "/dashboard/admin/create-student",
          icon: FaUserPlus,
          label: "Add Student",
        },
        {
          path: "/dashboard/admin/teachers",
          icon: FaChalkboardTeacher,
          label: "Teachers",
        },
        {
          path: "/dashboard/admin/create-teacher",
          icon: FaUserPlus,
          label: "Add Teacher",
        },
        {
          path: "/dashboard/admin/parents",
          icon: FaHome,
          label: "Parents",
        },
      ],
    },
    {
      section: "ACADEMIC",
      items: [
        {
          path: "/dashboard/admin/schedule",
          icon: FaCalendarAlt,
          label: "Schedule",
        },
      ],
    },
    {
      section: "SYSTEM",
      items: [
        {
          path: "/dashboard/admin/school-config",
          icon: FaCog,
          label: "Configuration",
        },
        {
          path: "/dashboard/admin/curriculum",
          icon: FaCog,
          label: "Curriculum",
        },
      ],
    },
  ];

  return (
    <LayoutWrapper>
      <Sidebar>
        <SidebarHeader>
          <LogoWrapper>
            <LogoImageWrapper>
              <Image
                src="/images/logo.png"
                alt="Learning Academy Logo"
                width={36}
                height={36}
                priority
              />
            </LogoImageWrapper>
            <LogoText>LEARNING ACADEMY</LogoText>
          </LogoWrapper>
        </SidebarHeader>

        <NavSection>
          {navItems.map((section, idx) => (
            <div key={idx} className="nav-group">
              <div className="section-label">{section.section}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <NavItem
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    $active={active}
                  >
                    <Icon className="nav-icon" />
                    <span>{item.label}</span>
                  </NavItem>
                );
              })}
            </div>
          ))}
        </NavSection>

        <SidebarFooter>
          <UserInfo>
            <UserAvatar>{userData.initial}</UserAvatar>
            <UserDetails>
              <h4>{userData.name}</h4>
              <p>{userData.email}</p>
            </UserDetails>
          </UserInfo>

          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>

      <ContentArea>
        {/* FULL-BACKGROUND GIF/IMAGE */}
        <Image
          src="/images/campus-bg.gif"
          alt="Campus Background"
          fill
          priority
          unoptimized
          className="full-bg-image"
        />

        <div className="main-content-padding">
          {/* PAGE CONTENT */}
          {children}
        </div>
      </ContentArea>
    </LayoutWrapper>
  );
}
