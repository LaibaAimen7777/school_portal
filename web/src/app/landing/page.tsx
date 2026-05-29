"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  Container,
  Nav,
  Logo,
  NavMenu,
  NavLink,
  Hero,
  HeroContent,
  HeroTitle,
  HeroIllustration,
  ButtonGroup,
  Button,
  FeatureSection,
  SectionMeta,
  SectionTitle,
  FeatureGrid,
  FeatureCard,
  CardImageWrapper,
  CardBody,
  CircleSection,
  CircleGrid,
  CircleCard,
  CircleImageFrame,
  EditorialSection,
  EditorialContent,
  EditorialTitle,
  EditorialText,
  EditorialIllustration,
} from "@/wrappers/landingStyles";

export default function LandingPage() {
  const router = useRouter();

  return (
    <Container>
      {/* HEADER NAVIGATION */}
      <Nav>
        <Logo>ÉLAN ACADEMY</Logo>
        <NavMenu>
          <NavLink href="#">Home</NavLink>
          <NavLink href="#">Programs</NavLink>
          <NavLink href="#">Admissions</NavLink>
          <NavLink href="#">Campus</NavLink>
          <NavLink href="#">Contact</NavLink>
        </NavMenu>
      </Nav>

      {/* SECTION 1: TOP HERO */}
      <Hero>
        <HeroContent>
          <HeroTitle>
            Shape Your Future <span>at Élan Academy</span>
          </HeroTitle>
          <ButtonGroup>
            <Button $primary onClick={() => router.push("/login")}>
              Apply Now
            </Button>
            <Button>Explore Programs</Button>
          </ButtonGroup>
        </HeroContent>

        <HeroIllustration>
          <Image
            src="/images/hero-architecture.jpg"
            alt="Élan Academy Campus"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </HeroIllustration>
      </Hero>

      {/* SECTION 2: FEATURE BLOCK */}
      <FeatureSection>
        <SectionMeta>Excellence in Education Since 1985</SectionMeta>
        <SectionTitle>Our Signature Programs</SectionTitle>

        <FeatureGrid>
          <FeatureCard>
            <CardImageWrapper $variant="mint">
              <Image
                src="/images/feat-academics.jfif"
                alt="Academics"
                width={140}
                height={140}
              />
            </CardImageWrapper>
            <CardBody>
              <h4>Academic Excellence</h4>
              <p>
                Rigorous curriculum designed to challenge young minds and
                prepare them for top universities worldwide.
              </p>
            </CardBody>
          </FeatureCard>

          <FeatureCard>
            <CardImageWrapper $variant="sage">
              <Image
                src="/images/feat-arts.jfif"
                alt="Arts"
                width={140}
                height={140}
              />
            </CardImageWrapper>
            <CardBody>
              <h4>Creative Arts</h4>
              <p>
                Nurturing individual creativity through visual arts, music,
                theater, and digital design programs.
              </p>
            </CardBody>
          </FeatureCard>

          <FeatureCard>
            <CardImageWrapper $variant="terracotta">
              <Image
                src="/images/feat-athletics_2.jpg"
                alt="Athletics"
                width={140}
                height={140}
              />
            </CardImageWrapper>
            <CardBody>
              <h4>Athletics & Wellness</h4>
              <p>
                Building character, teamwork, and resilience through competitive
                sports and fitness programs.
              </p>
            </CardBody>
          </FeatureCard>
        </FeatureGrid>
      </FeatureSection>

      {/* SECTION 3: CIRCLE GALLERY & EDITORIAL */}
      <CircleSection>
        <CircleGrid>
          <CircleCard>
            <CircleImageFrame>
              <Image
                src="/images/circle-1.png"
                alt="Science Lab"
                width={100}
                height={100}
              />
            </CircleImageFrame>
            <h5>STEM Innovation</h5>
          </CircleCard>

          <CircleCard>
            <CircleImageFrame>
              <Image
                src="/images/circle-2.png"
                alt="Global Studies"
                width={100}
                height={100}
              />
            </CircleImageFrame>
            <h5>Global Citizenship</h5>
          </CircleCard>

          <CircleCard>
            <CircleImageFrame>
              <Image
                src="/images/circle-3.png"
                alt="Community Service"
                width={100}
                height={100}
              />
            </CircleImageFrame>
            <h5>Community Impact</h5>
          </CircleCard>

          <CircleCard>
            <CircleImageFrame $highlighted>
              <Image
                src="/images/circle-4.png"
                alt="Leadership"
                width={100}
                height={100}
              />
            </CircleImageFrame>
            <h5>Leadership Academy</h5>
          </CircleCard>
        </CircleGrid>

        {/* EDITORIAL SECTION */}
        <EditorialSection>
          <EditorialContent>
            <EditorialTitle>Join Our Learning Community</EditorialTitle>
            <EditorialText>
              At Élan Academy, every student discovers their unique path to
              success. With dedicated faculty, state-of-the-art facilities, and
              a nurturing environment, we prepare students not just for college,
              but for life.
            </EditorialText>
            <Button onClick={() => router.push("/login")}>
              Visit Admissions
            </Button>
          </EditorialContent>

          <EditorialIllustration>
            <Image
              src="/images/bottom-editorial.png"
              alt="Élan Academy Community"
              width={320}
              height={180}
            />
          </EditorialIllustration>
        </EditorialSection>
      </CircleSection>

      <ThemeToggle />
    </Container>
  );
}
