"use client";

import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
  GraduationCap,
  Briefcase,
  Cpu,
  Database,
  Cloud,
  Layout,
  Sparkles,
  Brain,
  Download,
  Send,
  Linkedin,
  Github,
  Phone,
  Mail,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion, useSpring, useMotionValue, useInView } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

// --- Stats Data ---
const aboutStats = [
  { label: "IEEE Paper Publication", value: 1, suffix: "" },
  { label: "Internships Worked", value: 2, suffix: "" },
  { label: "Projects", value: 10, suffix: "+" },
];

// --- Education Data ---
const education = [
  {
    school: "George Washington University",
    degree: "Master's in Computer Science",
    year: "2024 - 2026",
    location: "Washington D.C.",
  },
  {
    school: "SRM University Amaravati",
    degree: "Bachelor's in Computer Science",
    year: "2020 - 2024",
    location: "Amaravati, India",
  },
];

// --- Technical Skills Data ---
const techSkills = [
  {
    category: "Languages",
    icon: Code2,
    skills: ["Python", "Java", "C++", "JavaScript", "SQL", "HTML/CSS", "R", "MATLAB", "C"],
  },
  {
    category: "AI & Machine Learning",
    icon: Cpu,
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Keras",
      "OpenCV",
      "NumPy",
      "Pandas",
      "CNN/RNN",
      "NLP",
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS (EC2, S3)", "Docker", "GCP", "Git/GitHub", "Linux", "CI/CD", "Jupyter"],
  },
  {
    category: "Backend & Databases",
    icon: Database,
    skills: ["MySQL", "MongoDB", "Firebase", "REST APIs", "System Design", "Distributed Systems"],
  },
];

// --- Experience Data ---
const experience = [
  {
    company: "SRM University AP",
    role: "Research Intern",
    year: "Aug 2023 - Jan 2024",
    location: "Amaravati, India",
    description:
      "Developed ML pipelines for IoT malware detection using Random Forest and SVM. Conducted throughput latency simulations to benchmark network performance under adversarial conditions.",
  },
  {
    company: "Code Clause",
    role: "Software Development Intern",
    year: "Apr 2023 - May 2023",
    location: "Remote",
    description:
      "Built a real-time analytics dashboard using Python and Streamlit. Implemented ETL workflows to visualize sales KPIs and deployed the prototype on cloud platforms.",
  },
  {
    company: "Smartbridge & SmartInternz",
    role: "Salesforce Developer",
    year: "Jun 2022 - Aug 2022",
    location: "Remote",
    description:
      "Developed custom Apex classes and REST APIs to automate workflows. Integrated Salesforce with external systems and utilized Git-based CI/CD pipelines for version control.",
  },
];

// --- Projects Data ---
const projects = [
  {
    title: "Heart Disease Prediction",
    description:
      "Built machine learning models to analyze health risk factors, achieving 92% prediction accuracy.",
    details:
      "Developed a multi-model pipeline (Logistic Regression, Random Forest, XGBoost) on clinical tabular data with feature engineering, cross-validation, and SHAP-based feature importance to explain predictions.",
    image: "/assets/heart.jpg",
    href: "#",
    tags: ["Data", "Backend"],
  },
  {
    title: "Mood Detection System using CNN",
    description:
      "Developed and optimized a CNN-based emotion recognition model with 85% accuracy and 40% faster inference.",
    details:
      "Built a CNN architecture for facial emotion recognition using TensorFlow/Keras, applied data augmentation, and optimized inference speed with model pruning and batching for real-time performance.",
    image: "/assets/Face.png",
    href: "#",
    tags: ["Data", "Frontend"],
  },
  {
    title: "Loan Eligibility Prediction",
    description:
      "Developed and preprocessed a logistic regression model for loan eligibility with 87% accuracy.",
    details:
      "Implemented a feature-engineered logistic regression model for binary loan approval prediction, including handling class imbalance and building a small API layer to expose predictions.",
    image: "/assets/loan.jpg",
    href: "#",
    tags: ["Data", "Backend"],
  },
  {
    title: "This website",
    description: "My personal website.",
    details:
      "Designed and implemented this portfolio using Next.js, TypeScript, Tailwind CSS, shadcn/ui, Spline 3D, smooth scrolling, and micro-interactions to showcase projects and skills.",
    image: "/assets/Website.png",
    href: "#",
    tags: ["Frontend", "Cloud", "Backend"],
  },
];

// --- Services Data ---
const services = [
  {
    key: "GenAI",
    service: "Generative AI",
    description:
      "Building custom LLM applications, RAG pipelines, and intelligent chatbots using LangChain, OpenAI, and Vector Databases.",
    icon: Sparkles,
  },
  {
    key: "ML",
    service: "Machine Learning",
    description:
      "Developing scalable ML models, deep learning architectures (CNNs), and predictive analytics systems using PyTorch and TensorFlow.",
    icon: Brain,
  },
  {
    key: "Frontend",
    service: "Frontend Development",
    description:
      "Building responsive, high-performance user interfaces with a focus on clean design and usability.",
    icon: Layout,
  },
  {
    key: "Backend",
    service: "Backend Development",
    description:
      "Building scalable backend systems with reliable APIs, JWT authentication, data pipelines, and secure cloud integration.",
    icon: Eye,
  },
  {
    key: "Cloud",
    service: "Cloud Computing",
    description:
      "Deploying scalable applications on AWS with experience in cloud workflows and performance optimization.",
    icon: SearchCheck,
  },
  {
    key: "Data",
    service: "Data Science",
    description:
      "Applying machine learning and data analysis to solve real-world problems across multiple domains.",
    icon: MonitorSmartphone,
  },
];

// --- Roles List (Rolling Marquee) ---
const roles = [
  "Software Engineer",
  "Machine Learning Engineer",
  "Full-Stack Developer",
  "Data Scientist",
  "Cloud Engineer",
  "Backend Developer",
  "AI Engineer",
];

function useRotatingRole(interval = 5000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((prev) => (prev + 1) % roles.length), interval);
    return () => clearInterval(id);
  }, [interval]);

  return roles[index];
}

// --- Animated Counter Component ---
function AnimatedSpan({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: 2000,
  });
  const [displayValue, setDisplayValue] = useState("00");

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      let formatted = Math.floor(latest).toString();
      if (Math.floor(latest) < 10) {
        formatted = "0" + formatted;
      }
      setDisplayValue(formatted + suffix);
    });

    return () => unsubscribe();
  }, [springValue, suffix]);

  return <span ref={ref}>{displayValue}</span>;
}

// --- Main Page Component ---
export default function Home() {
  const refScrollContainer = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const [activeFilter, setActiveFilter] = useState<string | "All">("All");
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const currentRole = useRotatingRole(5000);

  // Smooth scroll + active nav
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Carousel index
  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // Tilt effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt")) as HTMLElement[];
    if (!tilt.length) return;

    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  // Form Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:vallabhanenipreetam@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((p) => p.tags?.includes(activeFilter));

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            {/* ROLLING ROLES MARQUEE */}
            <div
              className="flex w-full max-w-[300px] overflow-hidden sm:max-w-[400px] md:max-w-[500px]"
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
            >
              <motion.div
                className="flex gap-3"
                animate={{ x: "-50%" }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 60,
                }}
                style={{ width: "fit-content" }}
              >
                {[...roles, ...roles].map((role, i) => (
                  <span key={i} className={cn(styles.pill, "whitespace-nowrap")}>
                    {role}
                  </span>
                ))}
              </motion.div>
            </div>

            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  PreetamVallabhaneni.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                 A passionate AI Engineer and IEEE published researcher with
              expertise in Full-Stack development, Generative AI, and Computer
              Vision. Currently pursuing a Master&apos;s in Computer Science at
              George Washington University.
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="mt-4 flex flex-row flex-wrap items-center gap-3 pt-2"
            >
              <Link href="mailto:vallabhanenipreetam@gmail.com" passHref>
                <Button>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>

              {/* Hero social links */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground ml-2">
                <Link
                  href="https://www.linkedin.com/in/preetam-vallabhaneni/"
                  target="_blank"
                  className="underline-offset-4 hover:underline"
                >
                  LinkedIn
                </Link>
                <span className="h-3 w-px bg-border" />
                <Link
                  href="https://github.com/Preetam2222"
                  target="_blank"
                  className="underline-offset-4 hover:underline"
                >
                  GitHub
                </Link>
                <span className="h-3 w-px bg-border" />
                <Link href="tel:+15712767511" className="underline-offset-4 hover:underline">
                  +1 (571) 276 7511
                </Link>
              </div>
            </span>

            <div className={cn(styles.scroll, isScrolled && styles["scroll--hidden"])}>
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* About Section */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col items-center gap-10 xl:flex-row xl:items-start"
          >
            {/* Photo Container */}
            <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-xl xl:h-80 xl:w-80">
              <Image
                src="/assets/preetam.jpg"
                alt="Preetam Vallabhaneni"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Text & Stats */}
            <div className="flex flex-col space-y-8 text-center xl:text-left">
              <p className="text-lg leading-relaxed text-muted-foreground">
                 I am a Computer Science graduate student at George Washington
                University combining advanced research with scalable
                engineering. As an IEEE published researcher, I have developed
                IoT malware detection pipelines and CNN-based emotion
                recognition systems. I am now leveraging this expertise to build
                next-generation solutions in Generative AI and LLMs. <br />
                <br />
                <strong>Full-Stack & Backend Engineering:</strong> I architect
                production-ready software, from REST APIs and CI/CD pipelines to
                scalable microservices using Java, Python, and AWS. <br />
                <br />
                <strong>Leadership:</strong> Serving as Student Council
                President (8,000+ students) gave me a driven, ownership-oriented
                mindset. I approach engineering challenges with initiative,
                ensuring complex projects are delivered successfully.
              </p>

              <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
                {aboutStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center xl:items-start"
                  >
                    <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-5xl">
                      <AnimatedSpan value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="mt-1 text-sm tracking-tight text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex flex-col justify-start space-y-10"
          >
            <h2 className="text-4xl font-medium tracking-tight">
              Education
              <br />
              <span className="text-gradient clash-grotesk tracking-normal">
                Academic Background.
              </span>
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {education.map((edu) => (
                <div
                  key={edu.school}
                  className="flex flex-col items-start rounded-md bg-white/5 p-8 shadow-md backdrop-blur transition duration-300 hover:bg-white/10 hover:shadow-xl border border-white/10"
                >
                  <GraduationCap className="mb-4 text-primary" size={32} />
                  <span className="text-xl font-medium tracking-tight text-foreground">
                    {edu.school}
                  </span>
                  <span className="text-lg text-primary">{edu.degree}</span>
                  <span className="mt-2 text-sm text-muted-foreground">
                    {edu.year} | {edu.location}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section id="skills" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex flex-col justify-start space-y-10"
          >
            <h2 className="text-4xl font-medium tracking-tight">
              Technical Arsenal
              <br />
              <span className="text-gradient clash-grotesk tracking-normal">
                Tools & Technologies.
              </span>
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {techSkills.map((tech) => (
                <div
                  key={tech.category}
                  className="flex flex-col items-start rounded-md bg-white/5 p-8 shadow-md backdrop-blur transition duration-300 hover:bg-white/10 hover:shadow-xl border border-white/10"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <tech.icon className="text-primary" size={28} />
                    <span className="text-xl font-medium tracking-tight text-foreground">
                      {tech.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex flex-col justify-start space-y-10"
          >
            <h2 className="text-4xl font-medium tracking-tight">
              Experience
              <br />
              <span className="text-gradient clash-grotesk tracking-normal">
                Professional History.
              </span>
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {experience.map((exp) => (
                <div
                  key={exp.role}
                  className="flex flex-col items-start rounded-md bg-white/5 p-8 shadow-md backdrop-blur transition duration-300 hover:bg-white/10 hover:shadow-xl border border-white/10"
                >
                  <div className="flex w-full flex-col justify-between items-start gap-2 sm:flex-row sm:items-center">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Briefcase className="text-primary" size={20} />
                        <span className="text-xl font-medium tracking-tight text-foreground">
                          {exp.company}
                        </span>
                      </div>
                      <span className="text-lg text-primary">{exp.role}</span>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap bg-white/5 px-2 py-1 rounded">
                      {exp.year}
                    </span>
                  </div>
                  <span className="mt-4 text-base text-muted-foreground leading-relaxed">
                    {exp.description}
                  </span>
                  <span className="mt-2 text-xs text-secondary-foreground font-semibold uppercase tracking-wider">
                    {exp.location}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Featured Projects.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Here is a selection of the work I have accomplished. While I have
              worked on numerous projects, I am displaying these highlights to
              showcase my expertise in AI, backend systems, and full-stack
              development. Click a card to see more details.
            </p>

            <div className="mt-14">
              <Carousel
                setApi={setCarouselApi}
                className="w-full"
                opts={{
                  loop: true,
                  align: "start",
                }}
                plugins={
                  [
                    Autoplay({
                      delay: 2500,
                      stopOnInteraction: false,
                      stopOnMouseEnter: true,
                    }),
                  ] as any
                }
              >
                <CarouselContent>
                  {filteredProjects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card
                        id="tilt"
                        className="cursor-pointer"
                        onClick={() => setActiveProject(project)}
                      >
                        <CardHeader className="p-0">
                          {project.image.endsWith(".webm") ? (
                            <video
                              src={project.image}
                              autoPlay
                              loop
                              muted
                              className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                            />
                          ) : (
                            <Image
                              src={project.image}
                              alt={project.title}
                              width={600}
                              height={300}
                              quality={100}
                              className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                            />
                          )}
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                            {project.description}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </div>
        </section>

        {/* Services / Skills filter */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Skill Set?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Click a skill to highlight the projects that use it. If you
                  have any questions, feel free to reach out.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveFilter("All")}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs",
                      activeFilter === "All"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                    )}
                  >
                    All
                  </button>
                  {services.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setActiveFilter(s.key)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs",
                        activeFilter === s.key
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {s.key}
                    </button>
                  ))}
                </div>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  onClick={() => setActiveFilter(service.key)}
                  className={cn(
                    "flex flex-col items-start rounded-md p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer",
                    activeFilter === service.key
                      ? "bg-white/15 border border-primary/40"
                      : "bg-white/5 hover:bg-white/10"
                  )}
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section - Updated Layout (resume removed) */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 xl:py-24"
          >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
              {/* LEFT COLUMN: Info */}
              <div className="flex flex-col items-start text-left space-y-8">
                {/* Text Content */}
                <div>
                  <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
                    Let&apos;s Connect{" "}
                    <span className="text-gradient clash-grotesk">together</span>
                  </h2>
                  <p className="mt-4 text-base tracking-tight text-muted-foreground xl:text-lg">
                    I&apos;m seeking software development opportunities where I can
                    apply my technical skills, gain hands-on experience, and
                    contribute to meaningful projects.
                  </p>
                  <ul className="mt-4 text-sm text-secondary-foreground space-y-2 list-disc pl-5">
                    <li>Roles in full‑stack, backend, or AI engineering.</li>
                    <li>Teams building data‑intensive or cloud‑native systems.</li>
                    <li>Environments that value research‑driven problem solving.</li>
                  </ul>
                </div>

                {/* Social Icons (Symbols) */}
                <div className="flex flex-col gap-4 w-full">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Connect
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="https://www.linkedin.com/in/preetam-vallabhaneni/"
                      target="_blank"
                    >
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </Link>
                    <Link href="https://github.com/Preetam2222" target="_blank">
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </Link>
                    <Link href="tel:+15712767511">
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <Phone className="h-5 w-5" />
                        <span className="sr-only">Phone</span>
                      </Button>
                    </Link>
                    <Link href="mailto:vallabhanenipreetam@gmail.com">
                      <Button variant="outline" size="icon" className="h-10 w-10">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                      </Button>
                    </Link>
                  </div>
                </div>

                <Link href="mailto:vallabhanenipreetam@gmail.com" passHref>
                  <Button>
                    Get in touch
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* RIGHT COLUMN: Send Message Form */}
              <div className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm">
                <h3 className="mb-6 text-xl font-semibold text-center">
                  Send me a message
                </h3>
                <form
                  onSubmit={handleFormSubmit}
                  className="flex flex-col gap-4 text-left"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-muted-foreground"
                      >
                        Name
                      </label>
                      <input
                        required
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none placeholder:text-muted-foreground/50"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-muted-foreground"
                      >
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none placeholder:text-muted-foreground/50"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Subject
                    </label>
                    <input
                      required
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none placeholder:text-muted-foreground/50"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      required
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none placeholder:text-muted-foreground/50 resize-none"
                      placeholder="Hello Preetam, I'd like to discuss..."
                    />
                  </div>
                  <Button type="submit" className="mt-4 w-full">
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Project modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-xl bg-background p-6 shadow-xl">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute right-4 top-4 text-sm text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
            <h3 className="mb-2 text-2xl font-semibold tracking-tight">
              {activeProject.title}
            </h3>
            <p className="mb-3 text-sm text-muted-foreground">
              {activeProject.description}
            </p>
            <p className="mb-4 text-sm text-foreground">
              {activeProject.details}
            </p>
            {activeProject.tags && (
              <div className="mb-4 flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/40 px-3 py-0.5 text-xs text-primary/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {activeProject.href && activeProject.href !== "#" && (
              <Link href={activeProject.href} target="_blank">
                <Button size="sm">View project</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
