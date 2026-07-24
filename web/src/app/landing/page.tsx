"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Container,
  PortalInner,
  Nav,
  LogoWrapper,
  LogoImageWrapper,
  LogoText,
  // Crest,
  NavMenu,
  NavPillButton,
  Hero,
  HeroTitle,
  HeroSubtitle,
  ButtonGroup,
  Button,
  ScallopedShape,
  TeamworkSection,
  TeamworkGrid,
  TeamworkCard,
  EditorialSection,
  EditorialImage,
  EditorialCardWrapper,
  EditorialFooterNote,
  EditorialHeading,
  EditorialTextContainer,
  Footer,
  FooterBrand,
  SocialIcons,
  FooterLinks,
} from "@/wrappers/landingStyles";

// Framer Motion Choreography Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const floatAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const bubbleFloat1 = {
  animate: {
    y: [0, -15, 0],
    rotate: [45, 55, 45],
    scale: [1, 1.05, 1],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const bubbleFloat2 = {
  animate: {
    y: [0, 15, 0],
    x: [0, -10, 0],
    rotate: [45, 35, 45],
    scale: [1, 0.95, 1],
    transition: {
      duration: 9,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1,
    },
  },
};

export default function LandingPage() {
  const router = useRouter();

  return (
    <Container>
      <PortalInner
        as={motion.div}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* HEADER NAVIGATION */}
        <Nav>
          <LogoWrapper>
            <LogoImageWrapper>
              <Image
                src="/images/logo.png" // <-- Put your logo image path here
                alt="Learning Academy Logo"
                width={48}
                height={48}
                priority
              />
            </LogoImageWrapper>
            <LogoText>LEARNING ACADEMY</LogoText>
          </LogoWrapper>

          <NavMenu>
            <NavPillButton href="#about">DISCOVER</NavPillButton>
            <NavPillButton href="#about">ABOUT US</NavPillButton>
            <NavPillButton href="#explore">EXPLORE</NavPillButton>
          </NavMenu>
        </Nav>

        {/* HERO SECTION - Desktop 10 */}
        <Hero
          as={motion.section}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Animated Scalloped Shapes */}
          <ScallopedShape
            as={motion.div}
            className="shape-top-left"
            variants={bubbleFloat1}
            animate="animate"
          />
          <ScallopedShape
            as={motion.div}
            className="shape-top-center"
            variants={bubbleFloat2}
            animate="animate"
          />
          <ScallopedShape
            as={motion.div}
            className="shape-bottom-center"
            variants={bubbleFloat1}
            animate="animate"
          />
          <ScallopedShape
            as={motion.div}
            className="shape-right-middle"
            variants={bubbleFloat2}
            animate="animate"
          />

          <div className="hero-text-block">
            <HeroTitle as={motion.h1} variants={fadeInUp}>
              LEARNING ACADEMY
            </HeroTitle>
            <HeroSubtitle as={motion.p} variants={fadeInUp}>
              WHERE DREAMS COME TRUE
            </HeroSubtitle>
            <ButtonGroup as={motion.div} variants={fadeInUp}>
              <Button
                $primary
                as={motion.button}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/login")}
              >
                LOGIN
              </Button>
            </ButtonGroup>
          </div>

          <div className="hero-illustration-block">
            <motion.div variants={fadeInUp} {...floatAnimation}>
              <Image
                src="/images/hero-students-group.png"
                alt="Learning Academy Students Group"
                width={650}
                height={450}
                priority
                style={{
                  objectFit: "contain",
                  zIndex: 2,
                  position: "relative",
                }}
              />
            </motion.div>
          </div>
        </Hero>

        {/* TEAMWORK SECTION - Desktop 11 */}
        <TeamworkSection>
          <TeamworkGrid
            as={motion.div}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <TeamworkCard variants={fadeInUp}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="card-image-wrapper"
              >
                <Image
                  src="/images/teamwork-activity-1.jfif"
                  alt="Teamwork Activity 1"
                  width={280}
                  height={280}
                />
              </motion.div>
              <h4>TEAMWORK</h4>
            </TeamworkCard>

            <TeamworkCard variants={fadeInUp}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="card-image-wrapper"
              >
                <Image
                  src="/images/teamwork-activity-2.jfif"
                  alt="Teamwork Activity 2"
                  width={280}
                  height={280}
                />
              </motion.div>
              <h4>TEAMWORK</h4>
            </TeamworkCard>

            <TeamworkCard variants={fadeInUp}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="card-image-wrapper"
              >
                <Image
                  src="/images/teamwork-activity-3.jfif"
                  alt="Teamwork Activity 3"
                  width={280}
                  height={280}
                />
              </motion.div>
              <h4>TEAMWORK</h4>
            </TeamworkCard>
          </TeamworkGrid>
        </TeamworkSection>

        {/* EDITORIAL SECTION - Desktop 12 */}
        <EditorialSection>
          <EditorialImage
            as={motion.div}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="image-card-wrapper">
              <Image
                src="/images/editorial-professionals.png"
                alt="Academy Pillars and Careers Showcase"
                width={520}
                height={400}
                priority
                style={{ objectFit: "contain", width: "100%", height: "auto" }}
              />
            </div>
          </EditorialImage>

          <EditorialCardWrapper
            as={motion.div}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="badge">OUR MISSION</div>
            <span className="quote-mark">“</span>

            <EditorialHeading>
              The place where you can become anything you wish for and reach
              anywhere you want.
            </EditorialHeading>

            <EditorialTextContainer>
              <p>
                Whether you fly, run, or crawl—this is a magical place built for
                anyone and everyone. We welcome and support every learner,
                leaving no one behind.
              </p>
              <p>
                Come along with us on this extraordinary journey where together,
                we will achieve our highest goals and so much more.
              </p>
            </EditorialTextContainer>

            <EditorialFooterNote>
              ✨ <span>No one left behind on the path to success.</span>
            </EditorialFooterNote>
          </EditorialCardWrapper>
        </EditorialSection>

        {/* FOOTER */}
        <Footer>
          <FooterBrand>
            <div className="brand-header">
              <LogoImageWrapper $small>
                <Image
                  src="/images/logo.png" // <-- Put your logo image path here
                  alt="Learning Academy Logo"
                  width={36}
                  height={36}
                />
              </LogoImageWrapper>
              <div>
                <h3>Learning Academy</h3>
                <p className="tagline">Where dreams come true</p>
              </div>
            </div>
            <p className="description">
              Making life wonderful for everyone. Join us today and become part
              of the wonderful experience.
            </p>
            <SocialIcons>
              <a href="#" aria-label="X (Twitter)">
                ✕
              </a>
              <a href="#" aria-label="Instagram">
                📷
              </a>
              <a href="#" aria-label="YouTube">
                ▶
              </a>
              <a href="#" aria-label="LinkedIn">
                in
              </a>
            </SocialIcons>
          </FooterBrand>

          <FooterLinks>
            <h5>Use cases</h5>
            <ul>
              <li>
                <a href="#">UI design</a>
              </li>
              <li>
                <a href="#">UX design</a>
              </li>
              <li>
                <a href="#">Wireframing</a>
              </li>
              <li>
                <a href="#">Diagramming</a>
              </li>
              <li>
                <a href="#">Brainstorming</a>
              </li>
              <li>
                <a href="#">Online whiteboard</a>
              </li>
              <li>
                <a href="#">Team collaboration</a>
              </li>
            </ul>
          </FooterLinks>

          <FooterLinks>
            <h5>Explore</h5>
            <ul>
              <li>
                <a href="#">Design</a>
              </li>
              <li>
                <a href="#">Prototyping</a>
              </li>
              <li>
                <a href="#">Development features</a>
              </li>
              <li>
                <a href="#">Design systems</a>
              </li>
              <li>
                <a href="#">Collaboration features</a>
              </li>
              <li>
                <a href="#">Design process</a>
              </li>
              <li>
                <a href="#">FigJam</a>
              </li>
            </ul>
          </FooterLinks>

          <FooterLinks>
            <h5>Resources</h5>
            <ul>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Best practices</a>
              </li>
              <li>
                <a href="#">Colors</a>
              </li>
              <li>
                <a href="#">Color wheel</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Developers</a>
              </li>
              <li>
                <a href="#">Resource library</a>
              </li>
            </ul>
          </FooterLinks>
        </Footer>
      </PortalInner>
    </Container>
  );
}
