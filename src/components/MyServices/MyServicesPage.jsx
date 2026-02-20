import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, BookOpen, BookMarked, Tag, Gift } from "lucide-react";

// ── Image imports ─────────────────────────────────────────────────────────────
import logoMakerImage        from "../../assets/images/logomaker.jpg";
import techLeadImage1        from "../../assets/images/tech-lead-1.jpg";
import techLeadImage2        from "../../assets/images/tech-lead-2.jpg";
import softwareEngineeringImage from "../../assets/images/software-engineering.png";
import monstersImage         from "../../assets/images/monsters.jpg";
import philosophyImage       from "../../assets/images/philosophy.jpg";
import researchImage         from "../../assets/images/research.jpg";
import swimmingImage         from "../../assets/images/swimming.jpg";
import teachingImage         from "../../assets/images/teaching.jpg";
import familyTimeImage       from "../../assets/images/family-time.jpg";
import blogging1             from "../../assets/images/blogging1.jpg";
import blogging2             from "../../assets/images/blogging2.jpg";
import blogging3             from "../../assets/images/blogging3.jpg";
import myLogo                from "../../assets/images/My-logo.png";

// ── Shared styles ─────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,600;9..144,700;9..144,800&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg:       #f4f1ec;
    --surface:  #ffffff;
    --border:   rgba(0,0,0,.07);
    --text-1:   #111010;
    --text-2:   #6b6560;
    --accent:   #c8502a;
    --accent-bg:#fdf0eb;
    --teal:     #0d9488;
    --teal-bg:  #f0fdfa;
    --radius:   14px;
    --sh-sm:    0 1px 3px rgba(0,0,0,.05), 0 4px 14px rgba(0,0,0,.05);
    --sh-md:    0 8px 30px rgba(0,0,0,.10), 0 2px 8px rgba(0,0,0,.06);
  }
  * { box-sizing: border-box; }
  body { background: var(--bg); }

  /* ── shared card ── */
  .ms-card {
    display: grid;
    grid-template-columns: 76px 1fr 24px;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--sh-sm);
    text-decoration: none;
    color: inherit;
    transition: transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s, border-color .2s;
  }
  .ms-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--sh-md);
    border-color: rgba(0,0,0,.12);
  }
  .ms-card:active { transform: none; }

  .ms-thumb {
    width: 76px; height: 76px;
    border-radius: 10px;
    object-fit: cover;
    display: block;
    background: var(--bg);
  }
  .ms-card-title {
    font-family: 'Fraunces', serif;
    font-size: .98rem;
    font-weight: 600;
    color: var(--text-1);
    letter-spacing: -.01em;
    line-height: 1.3;
    margin-bottom: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ms-card-snippet {
    font-family: 'DM Sans', sans-serif;
    font-size: .78rem;
    color: var(--text-2);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .ms-price-pill {
    display: inline-block;
    margin-top: 5px;
    font-family: 'DM Sans', sans-serif;
    font-size: .72rem;
    font-weight: 500;
    color: var(--accent);
    background: var(--accent-bg);
    padding: 2px 9px;
    border-radius: 999px;
  }
  .ms-chevron {
    color: var(--text-2);
    opacity: .35;
    transition: opacity .2s, transform .2s;
    flex-shrink: 0;
  }
  .ms-card:hover .ms-chevron { opacity: .8; transform: translateX(2px); }

  /* ── topbar ── */
  .ms-topbar {
    position: sticky; top: 0; z-index: 40;
    display: flex; align-items: center; gap: 12px;
    padding: 14px 20px;
    background: rgba(244,241,236,.88);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
    font-family: 'DM Sans', sans-serif;
  }
  .ms-back-btn {
    display: flex; align-items: center; justify-content: center;
    width: 36px; height: 36px;
    border-radius: 50%;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: var(--sh-sm);
    color: var(--text-1);
    text-decoration: none;
    transition: box-shadow .2s, transform .15s;
  }
  .ms-back-btn:hover { box-shadow: var(--sh-md); transform: translateX(-2px); }
  .ms-topbar-title {
    font-family: 'Fraunces', serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-1);
    letter-spacing: -.02em;
  }

  /* ── hero banner ── */
  .ms-hero {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
    min-height: 200px;
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding: 28px 24px;
    margin-bottom: 36px;
  }
  .ms-hero-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
  }
  .ms-hero-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.3) 60%, transparent 100%);
  }
  .ms-hero-content { position: relative; z-index: 2; color: #fff; }
  .ms-hero-title {
    font-family: 'Fraunces', serif;
    font-size: clamp(1.4rem, 4vw, 2rem);
    font-weight: 800;
    letter-spacing: -.03em;
    line-height: 1.15;
    margin-bottom: 8px;
  }
  .ms-hero-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem;
    font-weight: 300;
    color: rgba(255,255,255,.8);
    line-height: 1.6;
    max-width: 440px;
  }

  /* ── section heading ── */
  .ms-section-head {
    display: flex; align-items: baseline; justify-content: space-between;
    margin-bottom: 12px;
  }
  .ms-section-title {
    font-family: 'Fraunces', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-1);
    letter-spacing: -.02em;
  }
  .ms-section-count {
    font-family: 'DM Sans', sans-serif;
    font-size: .72rem;
    color: var(--text-2);
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 2px 9px;
    border-radius: 999px;
  }

  /* ── divider ── */
  .ms-divider {
    height: 1px;
    background: var(--border);
    margin: 32px 0;
  }

  /* ════════════════════════════════════
     DETAIL VIEW
  ════════════════════════════════════ */
  .dv-root {
    max-width: 680px;
    margin: 0 auto;
    font-family: 'DM Sans', sans-serif;
  }

  /* sticky image */
  .dv-image-wrap {
    position: sticky; top: 0; z-index: 0;
    overflow: hidden;
    transition: height .12s linear, opacity .12s linear;
  }
  .dv-image-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* content card */
  .dv-body {
    position: relative; z-index: 1;
    background: var(--surface);
    border-radius: 20px 20px 0 0;
    margin-top: -20px;
    padding: 28px 24px 32px;
    box-shadow: 0 -4px 24px rgba(0,0,0,.08);
  }

  .dv-pill-row {
    display: flex; gap: 8px; flex-wrap: wrap;
    margin-bottom: 16px;
  }
  .dv-cat-pill {
    font-size: .7rem; font-weight: 500; letter-spacing: .07em;
    text-transform: uppercase;
    color: var(--text-2);
    background: var(--bg);
    border: 1px solid var(--border);
    padding: 3px 10px; border-radius: 999px;
  }
  .dv-price-pill {
    font-size: .72rem; font-weight: 500;
    color: var(--accent); background: var(--accent-bg);
    padding: 3px 10px; border-radius: 999px;
    display: flex; align-items: center; gap: 4px;
  }

  .dv-title {
    font-family: 'Fraunces', serif;
    font-size: clamp(1.3rem, 4vw, 1.75rem);
    font-weight: 700;
    color: var(--text-1);
    letter-spacing: -.025em;
    line-height: 1.2;
    margin-bottom: 16px;
  }

  .dv-desc {
    font-size: .88rem; line-height: 1.75;
    color: var(--text-2);
    white-space: pre-line;
  }
  .dv-desc strong { color: var(--text-1); font-weight: 600; }
  .dv-desc a { color: var(--accent); text-decoration: underline; }

  .dv-toggle {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 12px;
    font-size: .8rem; font-weight: 500;
    color: var(--accent); background: var(--accent-bg);
    border: none; padding: 6px 14px; border-radius: 999px;
    cursor: pointer; transition: opacity .15s;
  }
  .dv-toggle:hover { opacity: .78; }

  /* Whats included */
  .dv-included {
    margin-top: 28px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }
  .dv-included-title {
    font-family: 'Fraunces', serif;
    font-size: 1rem; font-weight: 700;
    color: var(--text-1); letter-spacing: -.01em;
    margin-bottom: 14px;
  }
  .dv-included-group { margin-bottom: 16px; }
  .dv-included-group-head {
    font-size: .75rem; font-weight: 500; letter-spacing: .07em;
    text-transform: uppercase; color: var(--text-2);
    margin-bottom: 8px;
  }
  .dv-included-item {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: .82rem; color: var(--text-2);
    line-height: 1.5; margin-bottom: 6px;
  }
  .dv-included-dot {
    width: 6px; height: 6px;
    background: var(--accent); border-radius: 50%;
    flex-shrink: 0; margin-top: 6px;
  }

  /* referral */
  .dv-referral {
    margin-top: 20px;
    display: flex; align-items: flex-start; gap: 10px;
    background: var(--teal-bg); border: 1px solid rgba(13,148,136,.2);
    border-radius: 10px; padding: 12px 14px;
    font-size: .82rem; color: var(--teal);
  }

  /* bottom bar */
  .dv-footer {
    position: sticky; bottom: 0; z-index: 20;
    background: rgba(255,255,255,.92);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid var(--border);
    padding: 12px 20px;
    display: flex; justify-content: flex-start;
  }
  .dv-back-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: .82rem; font-weight: 500;
    color: var(--text-1);
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 9px 18px; border-radius: 999px;
    text-decoration: none;
    box-shadow: var(--sh-sm);
    transition: box-shadow .2s, background .15s;
  }
  .dv-back-link:hover { box-shadow: var(--sh-md); background: var(--bg); }

  /* not-found */
  .dv-notfound {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    min-height: 60vh;
    gap: 12px;
    font-family: 'DM Sans', sans-serif;
    color: var(--text-2); text-align: center;
  }
  .dv-notfound h2 {
    font-family: 'Fraunces', serif;
    font-size: 1.3rem; font-weight: 700;
    color: var(--text-1);
  }
`;

// ── Helpers ────────────────────────────────────────────────────────────────────
const BlogLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

const formatDescription = (text) => {
  if (typeof text !== "string") return text;
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    const m = part.match(/\[(.*?)\]\((.*?)\)/);
    if (m) return <BlogLink key={i} href={m[2]}>{m[1]}</BlogLink>;
    return part.split("*").map((sub, j) =>
      j % 2 === 0 ? sub : <strong key={`${i}-${j}`}>{sub}</strong>
    );
  });
};

// ── Data ──────────────────────────────────────────────────────────────────────
export const MyServicesItems = {
  professional: [
    {
      id: "devsecops-engineering",
      title: "DevSecOps Engineering",
      description: "Secure development practices, CI/CD pipeline automation, infrastructure security, and cloud operations with integrated security controls.",
      fullDescription: `I provide comprehensive DevSecOps engineering services that bridge development, security, and operations:

*My DevSecOps Achievements:*
1. Implemented secure CI/CD pipelines for 5+ projects with 99.2% uptime

*Core DevSecOps Services:*
1. **Secure Development Pipeline Implementation**
   - CI/CD pipeline setup with integrated security scanning 
   - Automated vulnerability assessment integration
   - Infrastructure as Code (IaC) security templates
2. **Cloud Security Architecture**
   - AWS/Azure/GCP security configuration 
   - Container security (Docker/Kubernetes)
   - Microservices security implementation`,
      images: [softwareEngineeringImage],
      whatsIncluded: {
        "DevSecOps Pipeline Services": [
          "Secure CI/CD Pipeline Design & Implementation",
          "Automated Security Testing Integration (SAST/DAST/SCA)",
          "Infrastructure as Code (Terraform/CloudFormation) Security",
          "Container Security & Orchestration (Docker/Kubernetes)",
          "Git Security & Branch Protection Policies",
          "Automated Compliance Checking & Reporting",
        ],
      },
    },
  ],
  interests: [
    {
      id: "philosophy",
      title: "Philosophy, Philanthropy And History",
      description: "Exploring philosophical concepts, philanthropy, and historical context.",
      fullDescription: `In September of 2023, I started to learn relevant philosophical concepts which helps in rewiring my brain to get me out of inappropriate social constructs, logical fallacies & embracing conspiracy theories created by some corporates & our ancestors.

*Key Findings:*
1. Philosophers can be wrong; they present to you their thoughts 🤷🏽‍♂️ 
2. It's easier to understand people's thoughts when you are a philosopher.
3. Philosophers run the world.

*My best philosophy of epistemology concepts:*
1. Solipsism: You & only you exist, therefore Compete with yourself, not others. 
2. Empiricism: The source of human knowledge is experience.
3. Rationalism: Reason & logic are the primary sources of knowledge & truth.

*My best philosophy of ethics concepts*
1. Resilience & Stoicism. Ability to endure Destructions

I am selling each package of a successful philosophical concept (Intellectual property) at ksh500`,
      images: [philosophyImage],
      price: "KES 500 / concept",
    },
    {
      id: "research",
      title: "Research & Did You Know",
      description: "Focusing on life pattern analysis (Life Framework) and technological research.",
      fullDescription: `Actively engaged in research since September 2023:

1️⃣ *Life Pattern Analysis:* Developing the "Life Framework" project focusing on pattern recognition, utilization, and creation across key areas:
    - Health and Awareness
    - Relationships & Pleasures
    - Work & Contribution To Society

2️⃣ *Technological Research:* Exploring advancements and trends in technology.

🎒 *Personal Insights & Updates (Did You Know):* 🎒
1️⃣ My portfolio is regularly updated with new projects and insights.
2️⃣ Subscribing to BruceMinangas.world provides access to more detailed research and systems.`,
      images: [researchImage],
    },
  ],
  hobbies: [
    {
      id: "swimming",
      title: "Swimming & Adventure",
      description: "Exploring the world physically and metaphorically.",
      fullDescription: `Exploring the world with like-minded individuals to understand its wonders. Swimming provides both physical activity and a meditative experience, evolving from childhood baths to enjoying heated pools. Adventure seeking broadens perspectives.`,
      images: [swimmingImage],
    },
    {
      id: "teaching",
      title: "Teaching & Public Speaking",
      description: "Sharing knowledge in programming and technology.",
      fullDescription: `I love to spread the knowledge i gained throughout my work to the world. I teach:

1. Programming & Tech with some Philosophical Concepts
2. Mindset Education

*Types of mindset*
1. Fixed mindset. It's when you believe you can't get better at something
2. Growth mindset. It's when you believe you can get better at something if you keep trying
3. False growth mindset. Surface level belief in improvement without engaging in actual behaviour

*Featured Blogs:*
[1. Saying Techy Words Doesn't Make Us Techy](https://www.linkedin.com/pulse/saying-techy-words-doesnt-make-us-bruce-minanga-zsj5f/)
[2. Understanding Computer Programming Languages](https://www.linkedin.com/pulse/understanding-computer-programming-languages-bruce-minanga-sy47f/)
[3. Linux Philosophy](https://www.linkedin.com/pulse/linux-philosophy-bruce-minanga-dqevf/)
[4. The Game Theory](https://www.linkedin.com/pulse/game-theory-bruce-minanga-73anf/)

You can also hire me as a public speaker to talk about my projects.`,
      images: [teachingImage],
      price: "KES 100/hr (Teaching) · KES 3,000/hr (Speaking)",
    },
    {
      id: "family-time",
      title: "Spending Time With Family & Friends",
      description: "Appreciating the support system.",
      fullDescription: `Deeply grateful to my family (especially Mom and Dad) and friends for their unwavering support and care throughout my endeavors. Meaningful relationships are fundamental. Peace ✌️`,
      images: [familyTimeImage],
    },
  ],
};

// ── Mini ImageCarousel (inline, no external dep needed) ───────────────────────
const MiniCarousel = ({ images }) => {
  const [idx, setIdx] = useState(0);
  if (!images?.length) return null;
  const multi = images.length > 1;
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#0d0d12" }}>
      <img
        key={idx}
        src={images[idx]}
        alt={`Slide ${idx + 1}`}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={(e) => { e.target.style.opacity = ".3"; }}
      />
      {multi && (
        <>
          <button onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
            style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", background:"rgba(0,0,0,.45)", border:"none", borderRadius:"50%", width:30, height:30, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <ChevronLeft size={15} />
          </button>
          <button onClick={() => setIdx((i) => (i + 1) % images.length)}
            style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"rgba(0,0,0,.45)", border:"none", borderRadius:"50%", width:30, height:30, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <ChevronRight size={15} />
          </button>
          <div style={{ position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)", display:"flex", gap:5 }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                style={{ width: i===idx ? 18 : 6, height:4, borderRadius:999, background:"rgba(255,255,255,.9)", opacity: i===idx ? 1 : .4, border:"none", cursor:"pointer", padding:0, transition:"width .25s" }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ── WhatsIncluded renderer ────────────────────────────────────────────────────
const WhatsIncluded = ({ data }) => {
  if (!data) return null;
  if (Array.isArray(data)) return (
    <div className="dv-included-group">
      {data.map((item, i) => (
        <div key={i} className="dv-included-item">
          <div className="dv-included-dot" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
  if (typeof data === "object") return (
    <>
      {Object.entries(data).map(([heading, items]) => (
        <div key={heading} className="dv-included-group">
          <p className="dv-included-group-head">{heading}</p>
          {Array.isArray(items) && items.map((item, i) => (
            <div key={i} className="dv-included-item">
              <div className="dv-included-dot" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      ))}
    </>
  );
  return null;
};

// ── Item Detail View ──────────────────────────────────────────────────────────
export const ItemDetailView = () => {
  const { category, id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(null);

  const item = (MyServicesItems[category] || []).find((i) => i.id === id);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (!item) return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div className="dv-notfound">
        <h2>Item not found</h2>
        <Link to="/MyServices" className="dv-back-link"><ChevronLeft size={15} /> Back to Services</Link>
      </div>
    </>
  );

  const imgH = Math.max(60, 280 - scrollY * 0.7);
  const imgOp = Math.max(0.15, 1 - scrollY / 200);
  const hasMore = item.fullDescription && item.fullDescription !== item.description;

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div className="dv-root" ref={scrollRef} style={{ maxHeight: "100svh", overflowY: "auto" }}>
        {/* Sticky hero image */}
        {item.images?.length > 0 && (
          <div className="dv-image-wrap" style={{ height: imgH, opacity: imgOp }}>
            <MiniCarousel images={item.images} />
          </div>
        )}

        {/* Content card */}
        <div className="dv-body">
          {/* Pills row */}
          <div className="dv-pill-row">
            <span className="dv-cat-pill">{category}</span>
            {item.price && (
              <span className="dv-price-pill"><Tag size={11} />{item.price}</span>
            )}
          </div>

          <h2 className="dv-title">{item.title}</h2>

          {/* Description */}
          <div className="dv-desc">
            {formatDescription(expanded ? item.fullDescription : item.description)}
          </div>

          {hasMore && (
            <button className="dv-toggle" onClick={() => setExpanded((p) => !p)}>
              {expanded ? <><BookMarked size={13} /> Read less</> : <><BookOpen size={13} /> Read more</>}
            </button>
          )}

          {/* What's included */}
          {item.whatsIncluded && (
            <div className="dv-included">
              <p className="dv-included-title">What's Included</p>
              <WhatsIncluded data={item.whatsIncluded} />
            </div>
          )}

          {/* Referral */}
          {item.referral && (
            <div className="dv-referral">
              <Gift size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{item.referral}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="dv-footer">
          <Link to="/MyServices" className="dv-back-link">
            <ChevronLeft size={15} /> Back to Services
          </Link>
        </div>
      </div>
    </>
  );
};

// ── Main Services Page ────────────────────────────────────────────────────────
const MyServicesPage = () => {
  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div style={{ maxWidth: 680, margin: "0 auto", paddingBottom: 48 }}>

        {/* Top bar */}
        <header className="ms-topbar">
          <Link to="/" className="ms-back-btn" aria-label="Go home">
            <ChevronLeft size={18} />
          </Link>
          <span className="ms-topbar-title">Bruce's World</span>
        </header>

        <div style={{ padding: "20px 16px 0" }}>
          {/* Hero banner */}
          <div className="ms-hero">
            <img src={myLogo} alt="Bruce Minanga" className="ms-hero-img" />
            <div className="ms-hero-scrim" />
            <div className="ms-hero-content">
              <h2 className="ms-hero-title">Welcome to<br />BruceMinanga's World</h2>
              <p className="ms-hero-sub">
                Hi, I'm Bruce — IT guy, thinker, builder. Exploring technology, philosophy, and more.
                Let me bring your digital dreams to life. <em>He/him</em>.
              </p>
            </div>
          </div>

          {/* Category sections */}
          {Object.entries(MyServicesItems).map(([cat, items], ci) => (
            <React.Fragment key={cat}>
              {ci > 0 && <div className="ms-divider" />}
              <section style={{ marginBottom: 8 }}>
                <div className="ms-section-head">
                  <h3 className="ms-section-title">
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </h3>
                  <span className="ms-section-count">{items.length}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      to={`/services/${cat}/${item.id}`}
                      className="ms-card"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="ms-thumb"
                        loading="lazy"
                        onError={(e) => { e.target.style.opacity = ".4"; }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <p className="ms-card-title">{item.title}</p>
                        <p className="ms-card-snippet">{item.description}</p>
                        {item.price && (
                          <span className="ms-price-pill">{item.price}</span>
                        )}
                      </div>
                      <ChevronRight className="ms-chevron" size={18} />
                    </Link>
                  ))}
                </div>
              </section>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyServicesPage;