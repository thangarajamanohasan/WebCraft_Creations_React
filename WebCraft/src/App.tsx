import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Code2,
  FileCheck2,
  FileText,
  GraduationCap,
  HeartHandshake,
  LayoutTemplate,
  Mail,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  MousePointer2,
  Phone,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  ClipboardList,
  PenLine,
  SearchCheck,
  Laptop2,
  BadgeCheck,
  Quote,
} from "lucide-react";
import { supabase, type Review } from "./supabase";
import "./styles.css";

const EMAIL = "webcraftcteaions27@email.com";
const PHONE = "+94716005341";
const WA = "https://wa.me/94716005341";
const items = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Why Us", "#why-us"],
  ["Reviews", "#reviews"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];
const offerings = [
  {
    icon: MonitorSmartphone,
    title: "Website Design & Development",
    num: "01",
    body: "Modern, responsive digital experiences shaped around your business identity, goals and customers.",
    details: [
      "Business websites and landing pages",
      "Responsive layouts for every screen",
      "Search-friendly structure and performance",
      "E-commerce website solutions",
    ],
  },
  {
    icon: GraduationCap,
    title: "University Project Support",
    num: "02",
    body: "Practical guidance for academic software projects, from planning and prototypes to implementation and documentation.",
    details: [
      "Project planning and technical guidance",
      "Prototypes and implementation support",
      "Research and referencing guidance",
      "Presentations and project documentation",
    ],
  },
  {
    icon: ClipboardList,
    title: "Assignment Support",
    num: "03",
    body: "Structured academic guidance that helps students understand requirements, prepare original work and meet deadlines.",
    details: [
      "Requirement analysis and study guidance",
      "Research and resource support",
      "Formatting and citation guidance",
      "Review and submission preparation",
    ],
  },
  {
    icon: FileText,
    title: "Professional Documentation",
    num: "04",
    body: "Clear, well-presented documents and materials that help your ideas communicate with confidence.",
    details: [
      "Business and technical reports",
      "User manuals and API documentation",
      "Professional CVs and presentations",
      "Branded documents and templates",
    ],
  },
  {
    icon: Code2,
    title: "Custom Digital Solutions",
    num: "05",
    body: "Tailored web-based systems and interfaces designed to make everyday tasks more efficient.",
    details: [
      "Admin dashboards and portals",
      "Booking and management workflows",
      "Database-backed applications",
      "Frontend interfaces and integrations",
    ],
  },
  {
    icon: PenLine,
    title: "Creative Design Services",
    num: "06",
    body: "Consistent visual materials for a more recognizable and professional brand presence.",
    details: [
      "Posters, flyers and digital banners",
      "Brand-oriented layouts and graphics",
      "Social media creatives",
      "Presentation and visual design",
    ],
  },
];
const values = [
  {
    icon: MousePointer2,
    title: "Purposeful Design",
    text: "Every page and interaction is planned for clarity, accessibility and ease of use.",
  },
  {
    icon: Laptop2,
    title: "Responsive by Default",
    text: "Layouts adapt thoughtfully to phones, tablets, laptops and wide screens.",
  },
  {
    icon: SearchCheck,
    title: "Attention to Detail",
    text: "We focus on readable content, consistent design and practical functionality.",
  },
  {
    icon: HeartHandshake,
    title: "Collaborative Approach",
    text: "Your requirements guide the scope, design decisions and delivery process.",
  },
];
const process = [
  {
    icon: MessageCircle,
    title: "Consultation",
    text: "Share your goals, requirements, audience and expectations.",
  },
  {
    icon: FileCheck2,
    title: "Planning & Proposal",
    text: "We discuss the scope, timeline, deliverables and an appropriate approach.",
  },
  {
    icon: Code2,
    title: "Design & Development",
    text: "Your solution takes shape through careful design, development and review.",
  },
  {
    icon: Rocket,
    title: "Delivery & Support",
    text: "Final checks, handover and a clear discussion of next steps.",
  },
];
const faqs = [
  {
    q: "What services does WebCraft Creations provide?",
    a: "We offer website design and development, custom digital solutions, university project guidance, assignment support, professional documentation and creative design services.",
  },
  {
    q: "Can you create a website for a small business?",
    a: "Yes. We can discuss a business website, landing page or other responsive solution based on your services, target audience and business goals.",
  },
  {
    q: "Do you support mobile-friendly websites?",
    a: "Yes. Responsive design is a core part of our approach, with layouts and interactions considered for mobile, tablet and desktop devices.",
  },
  {
    q: "How do I request a quote?",
    a: "You can email us, call, or open WhatsApp with the details of your requirements. Include the type of service, features, expected timeline and any examples you like.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines vary based on project complexity, required features and content readiness. We discuss a realistic timeline after reviewing your requirements.",
  },
  {
    q: "Can you help with academic projects and assignments?",
    a: "We provide guidance, research support, technical explanations, project development assistance and documentation support. Students should follow their institution’s academic integrity requirements and submit their own work.",
  },
  {
    q: "Do I need an account to leave a review?",
    a: "No login is required. Enter your name, rating and feedback. Reviews are stored in Supabase and published automatically without an account.",
  },
  {
    q: "Will my feedback appear on other devices?",
    a: "Yes. Published reviews are stored centrally and appear on all devices.",
  },
];

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      className={`logo-link ${footer ? "footer-logo" : ""}`}
      aria-label="WebCraft Creations home"
    >
      <img src="/webcraft-logo.png" alt="WebCraft Creations" />
    </a>
  );
}
function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-title ${center ? "center" : ""}`}>
      <span className="eyebrow">
        <span className="eyebrow-mark" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
function Stars({ value = 0, size = 17 }: { value?: number; size?: number }) {
  return (
    <span className="stars" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.9}
          fill={i <= Math.round(value) ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}

function usePublicReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState({ count: 0, total: 0, fiveStar: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    if (!supabase) {
      setError(
        "Supabase is not configured. Add the project credentials to .env.local.",
      );
      setLoading(false);
      return;
    }
    const list = await supabase
      .from("reviews")
      .select("id,name,rating,message,created_at")
      .order("created_at", { ascending: false })
      .limit(12);
    if (list.error) {
      setError(list.error.message);
      setLoading(false);
      return;
    }
    setReviews(list.data ?? []);
    setError("");
    setLoading(false);
    let count = 0,
      total = 0,
      fiveStar = 0,
      offset = 0;
    while (true) {
      const page = await supabase
        .from("reviews")
        .select("rating")
        .range(offset, offset + 999);
      if (page.error) {
        setError(page.error.message);
        return;
      }
      const results = page.data ?? [];
      count += results.length;
      total += results.reduce((a, r) => a + r.rating, 0);
      fiveStar += results.filter((r) => r.rating === 5).length;
      if (results.length < 1000) break;
      offset += 1000;
    }
    setSummary({ count, total, fiveStar });
  }, []);
  useEffect(() => {
    void refresh();
    const interval = window.setInterval(() => void refresh(), 30000);
    const focus = () => void refresh();
    window.addEventListener("focus", focus);
    const channel = supabase
      ?.channel("webcraft-light-reviews")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews" },
        () => void refresh(),
      )
      .subscribe();
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", focus);
      if (channel && supabase) void supabase.removeChannel(channel);
    };
  }, [refresh]);
  return { reviews, summary, loading, error, refresh };
}

function Header() {
  const [mobile, setMobile] = useState(false);
  return (
    <header className="header">
      <div className="shell header-inner">
        <Logo />
        <nav
          className={`navigation ${mobile ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {items.map(([label, link]) => (
            <a key={link} href={link} onClick={() => setMobile(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-mobile-contact"
            href={WA}
            target="_blank"
            rel="noreferrer"
          >
            Let's talk <ArrowUpRight size={17} />
          </a>
        </nav>
        <a className="btn btn-navy header-button" href="#contact">
          Get in touch <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMobile(!mobile)}
          aria-label={mobile ? "Close navigation" : "Open navigation"}
          aria-expanded={mobile}
        >
          {mobile ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
function Hero({ count, average }: { count: number; average: number }) {
  return (
    <section className="hero" id="home">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <span className="hero-tag">
            <span className="tag-dot" /> CREATIVE DIGITAL SERVICES
          </span>
          <h1>
            Thoughtful design.
            <br />
            <span>Powerful digital</span>
            <br />
            possibilities.
          </h1>
          <p>
            WebCraft Creations brings together creativity, technology and
            practical thinking to help businesses, students and individuals turn
            ideas into exceptional digital solutions.
          </p>
          <div className="hero-buttons">
            <a href="#services" className="btn btn-navy">
              Explore our services <ArrowUpRight size={18} />
            </a>
            <a href="#contact" className="btn btn-outline">
              Start a conversation <ArrowRight size={18} />
            </a>
          </div>
          <a href="#reviews" className="rating-pill">
            <span className="rating-icon">
              <Star size={19} fill="currentColor" />
            </span>
            <span>
              <strong>
                {count ? `${average.toFixed(1)} / 5` : "Your feedback matters"}
              </strong>
              <small>
                {count
                  ? `Based on ${count} published review${count === 1 ? "" : "s"}`
                  : "Be the first to share your experience"}
              </small>
            </span>
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="hero-design">
          <div className="halo halo-one" />
          <div className="halo halo-two" />
          <div className="hero-logo-card">
            <div className="card-meta">
              <span className="tiny-dot" /> DIGITAL IDEAS, BEAUTIFULLY MADE{" "}
              <Sparkles size={17} />
            </div>
            <img src="/webcraft-logo.png" alt="WebCraft Creations brand logo" />
            <div className="hero-logo-caption">
              WHERE CREATIVITY MEETS TECHNOLOGY
            </div>
          </div>
          <div className="floating-note">
            <CheckCircle2 size={19} /> Design with purpose
          </div>
          <div className="floating-detail">
            <span className="detail-icon">
              <LayoutTemplate size={21} />
            </span>
            <div>
              <strong>Made for your goals</strong>
              <small>Clear. Creative. Responsive.</small>
            </div>
          </div>
        </div>
      </div>
      <div className="shell hero-bottom">
        <span>DESIGN</span>
        <span className="tiny-separator" />
        <span>DEVELOPMENT</span>
        <span className="tiny-separator" />
        <span>DIGITAL SOLUTIONS</span>
      </div>
    </section>
  );
}
function About() {
  return (
    <section id="about" className="section about">
      <div className="shell about-grid">
        <div className="about-art">
          <div className="about-art-inner">
            <img src="/webcraft-logo.png" alt="WebCraft Creations logo" />
            <div className="about-art-line" />
            <span>CREATIVITY × TECHNOLOGY</span>
          </div>
          <div className="about-accent">
            <Sparkles size={23} />
            <span>Every idea deserves a thoughtful approach.</span>
          </div>
        </div>
        <div className="about-copy">
          <SectionTitle
            eyebrow="ABOUT WEBCRAFT CREATIONS"
            title="Creating meaningful digital experiences."
          />
          <p className="lead">
            WebCraft Creations is a digital services brand focused on bringing
            ideas to life with care, clarity and creativity.
          </p>
          <p>
            We work across website development, digital solutions, academic
            project guidance and professional documentation. Our focus is on
            understanding the requirement, choosing the right approach and
            delivering work that's purposeful and easy to use.
          </p>
          <div className="about-points">
            <div>
              <CheckCircle2 size={20} />
              <span>Clear, goal-oriented communication</span>
            </div>
            <div>
              <CheckCircle2 size={20} />
              <span>Thoughtful, responsive design</span>
            </div>
            <div>
              <CheckCircle2 size={20} />
              <span>Practical, tailored solutions</span>
            </div>
            <div>
              <CheckCircle2 size={20} />
              <span>Careful attention to each detail</span>
            </div>
          </div>
          <a className="text-cta" href="#why-us">
            Discover our approach <ArrowUpRight size={19} />
          </a>
        </div>
      </div>
    </section>
  );
}
function Services() {
  return (
    <section id="services" className="section services">
      <div className="shell">
        <div className="service-top">
          <SectionTitle
            eyebrow="WHAT WE DO"
            title="Services designed around your ideas."
            subtitle="From creating a digital presence to presenting complex information clearly, we provide flexible solutions tailored to individual requirements."
          />
          <a className="text-cta service-top-link" href="#contact">
            Discuss a service <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="services-grid">
          {offerings.map((s) => (
            <article className="service-card" key={s.title}>
              <div className="service-icon">
                <s.icon size={26} strokeWidth={1.8} />
              </div>
              <span className="service-num">SERVICE / {s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul>
                {s.details.map((x) => (
                  <li key={x}>
                    <CheckCircle2 size={15} />
                    {x}
                  </li>
                ))}
              </ul>
              <a
                href={`${WA}?text=${encodeURIComponent("Hello WebCraft Creations, I would like to enquire about " + s.title + ".")}`}
                target="_blank"
                rel="noreferrer"
                className="service-link"
              >
                Enquire about this service <ArrowUpRight size={18} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function WhyUs() {
  return (
    <section id="why-us" className="section why">
      <div className="shell">
        <SectionTitle
          eyebrow="THE WEBCRAFT APPROACH"
          title="Good work starts with the right details."
          subtitle="A considered process, clear communication and flexible solutions help each project move forward with confidence."
          center
        />
        <div className="values-grid">
          {values.map((v) => (
            <div key={v.title} className="value">
              <div className="value-icon">
                <v.icon size={28} />
              </div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Process() {
  return (
    <section className="section process">
      <div className="shell">
        <div className="process-head">
          <SectionTitle
            eyebrow="OUR WORKFLOW"
            title="A clear path from idea to delivery."
            subtitle="A collaborative process that keeps your project organized at every stage."
          />
        </div>
        <div className="process-grid">
          {process.map((p, i) => (
            <div className="process-card" key={p.title}>
              <div className="process-line">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p.icon size={24} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Satisfaction({
  count,
  average,
  fiveStar,
}: {
  count: number;
  average: number;
  fiveStar: number;
}) {
  return (
    <section id="satisfaction" className="section satisfaction">
      <div className="shell satisfaction-grid">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-mark" /> CLIENT FEEDBACK
          </span>
          <h2>
            Built on trust.
            <br />
            <span>Measured by real feedback.</span>
          </h2>
          <p>
            We believe feedback is valuable. The figures here are calculated
            directly from publicly visible customer reviews, not
            estimated or invented milestones.
          </p>
          <a href="#reviews" className="btn btn-navy">
            Read customer feedback <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="satisfaction-cards">
          <div className="stat-main">
            <Star size={28} fill="currentColor" />
            <strong>
              {count ? average.toFixed(1) : "—"}
              <small>{count ? "/ 5" : ""}</small>
            </strong>
            <span>Average customer rating</span>
          </div>
          <div className="stat-mini">
            <MessageCircle size={24} />
            <strong>{count}</strong>
            <span>Published reviews</span>
          </div>
          <div className="stat-mini">
            <BadgeCheck size={24} />
            <strong>
              {count ? `${Math.round((fiveStar / count) * 100)}%` : "—"}
            </strong>
            <span>Five-star reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
function Reviews({
  reviews,
  loading,
  error,
  refresh,
}: {
  reviews: Review[];
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase) {
      setNotice("Supabase configuration is missing.");
      return;
    }
    const n = name.trim(),
      m = message.trim();
    if (n.length < 2 || n.length > 80 || m.length < 10 || m.length > 1000) {
      setNotice(
        "Enter a name (2–80 characters) and a review (10–1000 characters).",
      );
      return;
    }
    setBusy(true);
    setNotice("");
    const { error } = await supabase.from("reviews").insert({
      name: n,
      rating,
      message: m,
    });
    setBusy(false);
    if (error) {
      setNotice(error.message);
      return;
    }
    setName("");
    setRating(5);
    setMessage("");
    setNotice("Thank you! Your review has been published successfully.");
    void refresh();
  }
  return (
    <section id="reviews" className="section reviews-section">
      <div className="shell">
        <SectionTitle
          eyebrow="YOUR VOICE MATTERS"
          title="Experiences worth sharing."
          subtitle="See what visitors have shared, or leave your own feedback. No account or Google sign-in required."
          center
        />
        <div className="reviews-grid">
          <div className="review-feed">
            <div className="feed-head">
              <h3>Community feedback</h3>
              <span>Latest public reviews</span>
            </div>
            {loading ? (
              <p className="muted">Loading reviews...</p>
            ) : error ? (
              <p className="message-error" role="alert">
                {error}
              </p>
            ) : reviews.length === 0 ? (
              <div className="empty-review">
                <MessageCircle size={34} />
                <h4>No published reviews yet</h4>
                <p>Be the first to share your experience.</p>
              </div>
            ) : (
              <div className="review-cards">
                {reviews.map((r) => (
                  <article className="review-card" key={r.id}>
                    <div className="review-head">
                      <Stars value={r.rating} />
                      <Quote size={21} />
                    </div>
                    <p>{r.message}</p>
                    <div className="review-author">
                      <span className="avatar">
                        {r.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <strong>{r.name}</strong>
                        <small>
                          {new Date(r.created_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </small>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
          <div className="review-form-panel">
            <span className="form-overline">
              <Star size={17} /> SHARE YOUR EXPERIENCE
            </span>
            <h3>Leave a review</h3>
            <p>Your feedback helps improve what we do. No account needed.</p>
            <form onSubmit={submit}>
              <label htmlFor="review-name">Your name</label>
              <input
                id="review-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                minLength={2}
                maxLength={80}
                required
              />
              <label>Your rating</label>
              <div
                className="rating-buttons"
                role="group"
                aria-label="Rate from one to five stars"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    aria-label={`${n} star rating`}
                    aria-pressed={rating === n}
                    onClick={() => setRating(n)}
                  >
                    <Star
                      size={29}
                      fill={n <= rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
              <label htmlFor="review-message">Your message</label>
              <textarea
                id="review-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your experience..."
                minLength={10}
                maxLength={1000}
                rows={5}
                required
              />
              <button
                className="btn btn-navy submit-btn"
                disabled={busy}
                type="submit"
              >
                {busy ? "Submitting..." : "Submit your review"}{" "}
                <Send size={17} />
              </button>
              {notice && (
                <p className="form-notice" role="status">
                  {notice}
                </p>
              )}
              <small className="form-footnote">
                <ShieldCheck size={15} /> Your review is published automatically. Please do not include sensitive personal information.
              </small>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section faq-section">
      <div className="shell faq-grid">
        <div>
          <SectionTitle
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            title="A little clarity goes a long way."
            subtitle="Answers to common questions about our services, process and customer reviews."
          />
          <div className="faq-help">
            <CircleHelp size={24} />
            <strong>Have a different question?</strong>
            <p>We're available to discuss your requirements.</p>
            <a href="#contact">
              Contact us <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div className={`faq-item ${open === i ? "active" : ""}`} key={f.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-a-${i}`}
              >
                <span>{f.q}</span>
                <ChevronDown size={21} />
              </button>
              {open === i && <p id={`faq-a-${i}`}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  const [name, setName] = useState(""),
    [from, setFrom] = useState(""),
    [service, setService] = useState("Website Design & Development"),
    [message, setMessage] = useState("");
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const txt = `Hello WebCraft Creations,\n\nName: ${name}\nEmail: ${from}\nService: ${service}\n\n${message}`;
    window.open(
      `${WA}?text=${encodeURIComponent(txt)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <section id="contact" className="section contact-section">
      <div className="shell contact-grid">
        <div>
          <SectionTitle
            eyebrow="LET'S CONNECT"
            title="Let's bring your next idea to life."
            subtitle="Tell us what you're working on. Whether it's a website, digital project or professional document, start with a conversation."
          />
          <div className="contact-cards">
            <a href={`mailto:${EMAIL}`} className="contact-method">
              <span className="contact-icon">
                <Mail size={24} />
              </span>
              <span>
                <small>EMAIL</small>
                <strong>{EMAIL}</strong>
              </span>
              <ArrowUpRight size={19} />
            </a>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="contact-method"
            >
              <span className="contact-icon">
                <MessageCircle size={24} />
              </span>
              <span>
                <small>WHATSAPP</small>
                <strong>+94 71 600 5341</strong>
              </span>
              <ArrowUpRight size={19} />
            </a>
            <a href={`tel:${PHONE}`} className="contact-method">
              <span className="contact-icon">
                <Phone size={24} />
              </span>
              <span>
                <small>CALL US</small>
                <strong>+94 71 600 5341</strong>
              </span>
              <ArrowUpRight size={19} />
            </a>
          </div>
          <div className="contact-caption">
            <CheckCircle2 size={18} /> Share your requirements to get the
            conversation started.
          </div>
        </div>
        <form className="contact-form" onSubmit={send}>
          <span className="form-overline">PROJECT ENQUIRY</span>
          <h3>Send us a message</h3>
          <p>
            This form prepares your enquiry in WhatsApp; nothing is submitted to
            a database.
          </p>
          <div className="field-grid">
            <div>
              <label htmlFor="c-name">Your name</label>
              <input
                id="c-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="c-email">Email address</label>
              <input
                id="c-email"
                type="email"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <label htmlFor="c-service">Service you're interested in</label>
          <select
            id="c-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            {offerings.map((s) => (
              <option key={s.title}>{s.title}</option>
            ))}
            <option>Other enquiry</option>
          </select>
          <label htmlFor="c-message">Tell us about your requirements</label>
          <textarea
            id="c-message"
            rows={5}
            minLength={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Briefly describe your idea, goals or timeline..."
            required
          />
          <button className="btn btn-navy submit-btn" type="submit">
            Continue to WhatsApp <ArrowUpRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Logo footer />
          <p>
            Where creativity meets technology. Thoughtful websites, digital
            solutions and professional creative services.
          </p>
          <div className="footer-social">
            <a href={WA} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle size={21} />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email">
              <Mail size={21} />
            </a>
            <a href={`tel:${PHONE}`} aria-label="Phone">
              <Phone size={21} />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <strong>Explore</strong>
          {items.map(([t, l]) => (
            <a href={l} key={l}>
              {t}
            </a>
          ))}
        </div>
        <div className="footer-links">
          <strong>Our services</strong>
          {offerings.slice(0, 5).map((s) => (
            <a href="#services" key={s.title}>
              {s.title}
            </a>
          ))}
        </div>
        <div className="footer-links">
          <strong>Contact</strong>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={WA} target="_blank" rel="noreferrer">
            WhatsApp: +94 71 600 5341
          </a>
          <a href={`tel:${PHONE}`}>Call: +94 71 600 5341</a>
        </div>
      </div>
      <div className="shell footer-end">
        <span>
          © {new Date().getFullYear()} WebCraft Creations. All rights reserved.
        </span>
        <span>Designed with purpose. Built with care.</span>
      </div>
    </footer>
  );
}
export default function App() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      ".section-title, .service-card, .value, .process-card, .stat-main, .stat-mini, .review-card, .faq-item, .contact-method, .about-art"
    );
    if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    targets.forEach((el) => {
      el.classList.add("reveal-ready");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const { reviews, summary, loading, error, refresh } = usePublicReviews();
  const average = useMemo(
    () => (summary.count ? summary.total / summary.count : 0),
    [summary],
  );
  return (
    <>
      <Header />
      <main>
        <Hero count={summary.count} average={average} />
        <About />
        <Services />
        <WhyUs />
        <Process />
        <Satisfaction
          count={summary.count}
          average={average}
          fiveStar={summary.fiveStar}
        />
        <Reviews
          reviews={reviews}
          loading={loading}
          error={error}
          refresh={refresh}
        />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
