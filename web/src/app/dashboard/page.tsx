"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// import { DashboardWrapper } from "@/wrappers/landingDashboard/DashboardWrapper";
// import { NavigationWrapper } from "@/wrappers/landingDashboard/NavigationWrapper";
// import { HeroWrapper } from "@/wrappers/landingDashboard/HeroWrapper";
// import { QuoteWrapper } from "@/wrappers/landingDashboard/QuoteWrapper";
// import { ExploreWrapper } from "@/wrappers/landingDashboard/ExploreWrapper";
// import { CardWrapper } from "@/wrappers/landingDashboard/CardWrapper";
// import { ButtonWrapper } from "@/wrappers/landingDashboard/ButtonWrapper";
// import { ThemeToggleWrapper } from "@/wrappers/landingDashboard/ThemeToggleWrapper";

import {
  Container,
  Nav,
  Logo,
  NavMenu,
  NavLink,
  Hero,
  FloatingImage,
  HeroTitle,
  QuoteSection,
  QuoteText,
  QuoteAuthor,
  ExploreSection,
  SectionTitle,
  Grid,
  Card,
  CardTitle,
  CardDescription,
  ButtonGroup,
  Button,
  QuestionBox,
  Question,
  Answer,
  ThemeButton,
} from "@/wrappers/landingStyles";

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
    <Container>
      <Nav>
        <Logo>{currentTheme === "isomania" ? "ISOMANIA" : "PISHIP"}</Logo>
        <NavMenu>
          <NavLink href="#">HOME</NavLink>
          <NavLink href="#">ABOUT</NavLink>
          <NavLink href="#">ACADEMICS</NavLink>
          <NavLink href="#">ADMISSIONS</NavLink>
          <NavLink href="#">CONTACT</NavLink>
        </NavMenu>
      </Nav>

      <Hero>
        {/* Floating Image - Add this above the title */}
        <FloatingImage>
          <Image
            src="/images/DashImage.jpg" // Update this path to your image
            alt="Student"
            width={180}
            height={180}
          />
        </FloatingImage>
        <HeroTitle>
          <span>BE A HERO IN</span>
          YOUR SCHOOL
        </HeroTitle>
        <ButtonGroup>
          <Button $primary>EXPLORE NOW</Button>
          <Button onClick={() => router.push("/login")}>LOGIN</Button>
        </ButtonGroup>
      </Hero>

      <QuoteSection>
        <QuoteText>
          "As soon as I left my home, I realized that I'm home."
        </QuoteText>
        <QuoteAuthor>— WANDERER</QuoteAuthor>
      </QuoteSection>

      <ExploreSection>
        <SectionTitle>DISCOVER</SectionTitle>
        <Grid>
          <Card>
            <CardTitle>ACADEMICS</CardTitle>
            <CardDescription>
              Excellence in education through innovative teaching methods.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>ARTS</CardTitle>
            <CardDescription>
              Nurturing creativity through various artistic programs.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>ATHLETICS</CardTitle>
            <CardDescription>
              Building character through sports and teamwork.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>COMMUNITY</CardTitle>
            <CardDescription>
              A supportive environment where every student belongs.
            </CardDescription>
          </Card>
        </Grid>
      </ExploreSection>

      <QuestionBox>
        <Question>Am I in touch with my deeper desires?</Question>
        <Answer>
          What is the purpose? Question that I asked myself. Ready to find
          answers, I picked up my belongings and left to spread my wings and fly
          on my own.
        </Answer>
        <Button>See More →</Button>
      </QuestionBox>

      <ThemeButton onClick={toggleTheme}>
        {currentTheme === "isomania"
          ? "SWITCH TO PISHIP →"
          : "← SWITCH TO ISOMANIA"}
      </ThemeButton>
    </Container>
  );
}
