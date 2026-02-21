"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { DashboardWrapper } from "@/wrappers/landingDashboard/DashboardWrapper";
import { NavigationWrapper } from "@/wrappers/landingDashboard/NavigationWrapper";
import { HeroWrapper } from "@/wrappers/landingDashboard/HeroWrapper";
import { QuoteWrapper } from "@/wrappers/landingDashboard/QuoteWrapper";
import { ExploreWrapper } from "@/wrappers/landingDashboard/ExploreWrapper";
import { CardWrapper } from "@/wrappers/landingDashboard/CardWrapper";
import { ButtonWrapper } from "@/wrappers/landingDashboard/ButtonWrapper";
import { ThemeToggleWrapper } from "@/wrappers/landingDashboard/ThemeToggleWrapper";

export default function DashboardPage() {
  const [currentTheme, setCurrentTheme] = useState<"isomania" | "piship">(
    "isomania",
  );
  const router = useRouter();

  const toggleTheme = () => {
    const newTheme = currentTheme === "isomania" ? "piship" : "isomania";
    setCurrentTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [router, currentTheme]);

  return (
    <DashboardWrapper>
      <NavigationWrapper>
        <div className="logo">YOUR SCHOOL</div>
        <div className="nav-menu">
          <a href="#" className="nav-link">
            HOME
          </a>
          <a href="#" className="nav-link">
            ABOUT
          </a>
          <a href="#" className="nav-link">
            ACADEMICS
          </a>
          <a href="#" className="nav-link">
            ADMISSIONS
          </a>
          <a href="#" className="nav-link">
            CONTACT
          </a>
        </div>
      </NavigationWrapper>

      <HeroWrapper bgImage="/images/school-hero.jpg">
        <Image
          src="/images/student-avatar.jpg"
          alt="Student"
          width={200}
          height={200}
          className="hero-image"
        />
        <div className="hero-content">
          <h1 className="hero-title">
            <span>BE A HERO IN</span>
            YOUR SCHOOL
          </h1>
          <p className="hero-subtitle">
            Empowering students to discover their potential and make a
            difference
          </p>
          <ButtonWrapper>
            <button className="btn btn-primary">EXPLORE NOW</button>
            <button className="btn">LEARN MORE</button>
          </ButtonWrapper>
        </div>
      </HeroWrapper>

      <QuoteWrapper>
        <p className="quote-text">
          "As soon as I entered this school, I realized that I've found my
          second home."
        </p>
        <p className="quote-author">— Student Testimonial</p>
      </QuoteWrapper>

      <ExploreWrapper>
        <h2 className="section-title">DISCOVER</h2>
        <div className="grid">
          <CardWrapper>
            <div className="card-icon">📚</div>
            <h3 className="card-title">ACADEMICS</h3>
            <p className="card-description">
              Excellence in education through innovative teaching methods and
              dedicated faculty.
            </p>
          </CardWrapper>
          <CardWrapper>
            <div className="card-icon">🎨</div>
            <h3 className="card-title">ARTS</h3>
            <p className="card-description">
              Nurturing creativity through music, visual arts, and performing
              arts programs.
            </p>
          </CardWrapper>
          <CardWrapper>
            <div className="card-icon">⚽</div>
            <h3 className="card-title">ATHLETICS</h3>
            <p className="card-description">
              Building character and teamwork through competitive sports and
              activities.
            </p>
          </CardWrapper>
          <CardWrapper>
            <div className="card-icon">🤝</div>
            <h3 className="card-title">COMMUNITY</h3>
            <p className="card-description">
              A supportive environment where every student belongs and thrives.
            </p>
          </CardWrapper>
        </div>
      </ExploreWrapper>

      <div
        className="question-section"
        style={{ margin: "4rem auto", padding: "0 2rem", maxWidth: "600px" }}
      >
        <h3
          className="question"
          style={{ fontSize: "1.5rem", marginBottom: "1rem" }}
        >
          Am I ready to discover my potential?
        </h3>
        <p
          className="answer"
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            marginBottom: "2rem",
          }}
        >
          Ready to find answers, I joined this community of learners, stepping
          out of my comfort zone to spread my wings and grow.
        </p>
        <button className="btn">See More →</button>
      </div>

      <ThemeToggleWrapper onClick={toggleTheme}>
        Switch to {currentTheme === "isomania" ? "PISHIP" : "ISOMANIA"} Style
      </ThemeToggleWrapper>
    </DashboardWrapper>
  );
}
