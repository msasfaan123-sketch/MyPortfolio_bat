import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Zap } from "lucide-react";
import { BatIcon } from "./bat-icon";

type Msg = { id: number; from: "bot" | "user"; text: string };

function TypedBotText({ messageId, text }: { messageId: number; text: string }) {
  const [shown, setShown] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setShown("");
    setComplete(false);
    const chars = [...text];
    if (chars.length === 0) {
      setComplete(true);
      return;
    }
    let cancelled = false;
    let i = 0;
    let timeoutId = 0;

    const step = () => {
      if (cancelled) return;
      i += 1;
      setShown(chars.slice(0, i).join(""));
      if (i >= chars.length) {
        setComplete(true);
        return;
      }
      const ch = chars[i - 1];
      const base =
        ch === " " || ch === "\n"
          ? 12
          : /[.,;:!?]/.test(ch)
            ? 55
            : 10 + (i % 4) * 2;
      timeoutId = window.setTimeout(step, base);
    };

    timeoutId = window.setTimeout(step, 140);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [messageId, text]);

  return (
    <span className={complete ? "" : "blink"}>
      {complete ? text : shown}
    </span>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const msgIdRef = useRef(1);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 0,
      from: "bot",
      text: "Batcomputer online. How may I assist you, Detective?",
    },
  ]);

  useEffect(() => {
    const openChatbot = () => setOpen(true);
    window.addEventListener("open-batcomputer", openChatbot);
    return () => window.removeEventListener("open-batcomputer", openChatbot);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const quick = [
    "Show projects",
    "Skills overview",
    "Contact details",
    "About",
    "Education qualifications",
    "Hobbies",
    "Future goals",
  ];

  const rules = [
    
      {
        keywords: ["hi", "hello", "hey", "good morning", "good evening"],
        answer:
          "Initializing Batcomputer interface... Welcome back. I am Asfaan's AI portfolio assistant. How may I assist you today?",
      },
    
      {
        keywords: ["who are you", "about you", "introduce yourself"],
        answer:
          "I am the digital assistant for Mohamed Sathak Asfaan — MCA student, full-stack developer, AI enthusiast, and hackathon winner from Chennai.",
      },
    
      {
        keywords: ["how are you"],
        answer:
          "All systems operational. Portfolio intelligence core running smoothly. Ready to assist you.",
      },
      {
  keywords: ["hobbies", "interests", "free time"],
  answer:
    "Beyond coding and AI systems, Asfaan enjoys football, cricket, chess, and reading books. Strategic thinking isn't limited to programming alone.",
},
    
      {
        keywords: ["name"],
        answer:
          "The creator behind this Batcomputer is Mohamed Sathak Asfaan.",
      },
    
      {
        keywords: ["location", "where are you from"],
        answer:
          "Asfaan is based in Chennai, India.",
      },
    
      {
        keywords: ["education", "college", "study"],
        answer:
          "Asfaan completed BCA at The New College and is currently pursuing MCA at Measi Institute of Information Technology.",
      },
    
      {
        keywords: ["skills", "expertise", "technologies"],
        answer:
          "Core expertise includes Python, Flask, Java, Spring Boot, MongoDB, REST APIs, JavaScript, SQL, AI/NLP, and full-stack web development.",
      },
    
      {
        keywords: ["frontend"],
        answer:
          "Frontend stack includes JavaScript, responsive UI development, dashboard systems, futuristic interfaces, and real-time visual analytics.",
      },
    
      {
        keywords: ["backend"],
        answer:
          "Backend expertise includes Flask, Spring Boot, REST API architecture, authentication systems, real-time server communication, and database integration.",
      },
    
      {
        keywords: ["database", "mongodb", "sql"],
        answer:
          "Asfaan has worked with MongoDB, MySQL, and SQLite for scalable data storage and analytics systems.",
      },
    
      {
        keywords: ["dsa", "leetcode"],
        answer:
          "Asfaan has solved 250+ DSA problems on LeetCode and continuously practices problem-solving and algorithmic thinking.",
      },
    
      {
        keywords: ["experience", "internship", "work"],
        answer:
          "Asfaan worked as a Software and Data Intern at Smaart Healthcare, developing AI-powered healthcare systems using Flask, MongoDB, NLP pipelines, and Vapi.ai integrations.",
      },
    
      {
        keywords: ["hackathon", "achievement", "awards"],
        answer:
          "Achievements unlocked: 🏆 1st Prize at Measi Institute Hackathon and 🥈 2nd Prize at MGR University Hackathon.",
      },
    
      {
        keywords: ["resume", "cv"],
        answer:
          "Mission files available. You can download Asfaan's resume directly from the portfolio.",
      },
    
      {
        keywords: ["contact", "email"],
        answer:
          "Secure communication channel established. Email: ms.asfaan123@gmail.com",
      },
    
      {
        keywords: ["linkedin"],
        answer:
          "LinkedIn profile detected: https://www.linkedin.com/in/mohamed-asfaan-5a3340284",
      },
    
      {
        keywords: ["github", "repositories", "code"],
        answer:
          "GitHub command center: https://github.com/msasfaan123-sketch",
      },
    
      {
        keywords: ["projects", "portfolio"],
        answer:
          "Asfaan has developed multiple AI and full-stack projects including VConnect, AI Nurse Triage Assistant, LOGISENSE 360, and AI Medical Appointment Booking Assistant.",
      },
    
      // ================= VCONNECT =================
    
      {
        keywords: ["vconnect"],
        answer:
          "VConnect is a full-stack analytics and collaboration platform designed for village welfare and rural data intelligence. It processes data for 650,000+ Indian villages using Python, Flask, MongoDB, and REST APIs.",
      },
    
      {
        keywords: ["vconnect features"],
        answer:
          "VConnect includes AI-driven search, analytics dashboards, rural development insights, scalable MongoDB pipelines, and real-time data workflows.",
      },
    
      {
        keywords: ["vconnect tech stack"],
        answer:
          "VConnect was built using Python, Flask, MongoDB, JavaScript, REST APIs, and Spring Boot.",
      },
    
      {
        keywords: ["vconnect impact"],
        answer:
          "VConnect improved rural data retrieval efficiency by 45% and reduced CSV preprocessing time by 50% using optimized Pandas workflows.",
      },
    
      // ================= AI NURSE =================
    
      {
        keywords: ["ai nurse", "nurse triage", "healthcare assistant"],
        answer:
          "The AI Nurse Triage Assistant is a healthcare AI system that assesses symptoms, handles voice and text conversations, and assists with patient triage workflows using NLP and Flask.",
      },
    
      {
        keywords: ["vapi", "voice ai"],
        answer:
          "Asfaan integrated Vapi.ai for real-time voice communication workflows in healthcare systems.",
      },
    
      {
        keywords: ["ai nurse features"],
        answer:
          "Features include symptom analysis, NLP-based intent classification, nurse escalation alerts, conversational AI workflows, and secure healthcare data handling.",
      },
    
      {
        keywords: ["ai nurse tech stack"],
        answer:
          "The project uses Python, Flask, MongoDB, NLP pipelines, JavaScript, REST APIs, and Vapi.ai.",
      },
    
      // ================= LOGISENSE =================
    
      {
        keywords: ["logisense", "logistics project"],
        answer:
          "LOGISENSE 360 is a futuristic logistics and fleet management platform developed during internship work. It provides real-time GPS tracking, warehouse operations, analytics dashboards, and shipment monitoring systems.",
      },
    
      {
        keywords: ["logisense features"],
        answer:
          "LOGISENSE 360 includes fleet tracking, customer portals, operational alerts, analytics dashboards, warehouse management, and live shipment monitoring.",
      },
    
      {
        keywords: ["gps tracking", "real time tracking"],
        answer:
          "The logistics platform uses real-time GPS tracking integrated with Mappls API and server-sent events for live vehicle monitoring.",
      },
    
      {
        keywords: ["logisense tech stack"],
        answer:
          "LOGISENSE 360 was built using Python, Flask, SQLite, JavaScript, Chart.js, REST APIs, SSE, and Mappls API.",
      },
    
      // ================= APPOINTMENT BOT =================
    
      {
        keywords: ["appointment assistant", "medical appointment"],
        answer:
          "The AI Medical Appointment Booking Assistant automates patient interactions, appointment scheduling, and symptom-based healthcare conversations using AI workflows.",
      },
    
      {
        keywords: ["ollama"],
        answer:
          "Ollama was used to power local AI conversational workflows for healthcare interactions and appointment automation.",
      },
    
      {
        keywords: ["appointment bot features"],
        answer:
          "Features include intelligent appointment scheduling, conversational healthcare support, symptom-based responses, and AI-driven patient interaction workflows.",
      },
    
      // ================= PERSONALITY =================
    
      {
        keywords: ["why hire you", "why should we hire you"],
        answer:
          "Because Asfaan combines full-stack engineering, AI integration, real-world internship experience, hackathon achievements, and strong problem-solving skills into production-ready solutions.",
      },
    
      {
        keywords: ["future goals", "career goals"],
        answer:
          "Mission objective: Become a top AI/full-stack engineer building impactful intelligent systems and scalable real-world applications.",
      },
    
      {
        keywords: ["strengths"],
        answer:
          "Key strengths include rapid learning, problem-solving, AI integration, backend engineering, futuristic UI design, and building scalable real-time systems.",
      },
    
      {
        keywords: ["weakness"],
        answer:
          "Current optimization target: balancing perfectionism with delivery speed during large-scale development projects.",
      },
    
      {
        keywords: ["open source"],
        answer:
          "Asfaan actively uses GitHub for project management, experimentation, and continuous development of AI and full-stack applications.",
      },
    
      {
        keywords: ["batman", "batcomputer"],
        answer:
          "Batman-inspired interface activated. Dark mode engineering with futuristic command-center aesthetics detected.",
      },
    
      {
        keywords: ["live demo", "website"],
        answer:
          "Deployment systems active. Multiple projects are live and accessible through the portfolio command center.",
      },
    
      {
        keywords: ["thank you", "thanks"],
        answer:
          "You're welcome. Batcomputer standing by for the next command.",
      },
    
      {
        keywords: ["bye", "goodbye"],
        answer:
          "Disconnecting secure session... See you again, Commander.",
      },
    
  ];

  function keywordMatches(lowerText: string, keyword: string) {
    const k = keyword.toLowerCase();
    if (/\s/.test(k)) return lowerText.includes(k);
    const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i").test(lowerText);
  }

  function replyForUserMessage(lowerText: string) {
    const rule = rules.find((r) => r.keywords.some((kw) => keywordMatches(lowerText, kw)));
    return rule
      ? rule.answer
      : "I'm sorry, I don't have an answer for that. Can you rephrase?";
  }

  const send = (t?: string) => {
    const text = (t ?? input).trim();
    if (!text) return;
    setInput("");
    const userId = msgIdRef.current++;
    setMsgs((m) => [...m, { id: userId, from: "user", text }]);
    const lower = text.toLowerCase();
    window.setTimeout(() => {
      const botId = msgIdRef.current++;
      setMsgs((m) => [...m, { id: botId, from: "bot", text: replyForUserMessage(lower) }]);
    }, 450);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[210] grid h-14 w-14 place-items-center rounded-full bg-bat text-black glow-bat"
        aria-label={open ? "Close Batcomputer chat" : "Open Batcomputer chat"}
      >
        {open ? <X className="h-6 w-6" /> : <BatIcon className="h-7 w-7" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="batcomputer-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="batcomputer-chat-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: "spring", damping: 24, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="glass hud-corners relative flex h-[min(85dvh,540px)] min-h-0 w-full max-w-[520px] flex-col overflow-hidden rounded-md shadow-2xl"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-bat/20 bg-black/40 px-4 py-3">
                <div className="flex items-center gap-2">
                  <BatIcon className="h-7 w-7 text-bat" />
                  <div>
                    <div
                      id="batcomputer-chat-title"
                      className="text-xs font-bold uppercase tracking-widest text-bat"
                    >
                      Batcomputer AI
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      SECURE CHANNEL
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-bat"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 font-mono text-sm space-y-3 [scrollbar-width:thin]"
                aria-live="polite"
                aria-relevant="additions text"
              >
                {msgs.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded px-3 py-2 ${
                        m.from === "user"
                          ? "bg-bat text-black"
                          : "border border-bat/30 bg-black/40 text-bat/90"
                      }`}
                    >
                      {m.from === "bot" && <span className="mr-1 text-bat/60">[AI]</span>}
                      {m.from === "bot" ? (
                        <TypedBotText messageId={m.id} text={m.text} />
                      ) : (
                        m.text
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="shrink-0 border-t border-bat/20 bg-black/40 p-3">
                <div className="mb-2 flex flex-wrap gap-1">
                  {quick.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="flex items-center gap-1 rounded border border-bat/30 px-2 py-1 text-[10px] uppercase tracking-wider text-bat/80 hover:bg-bat/10"
                    >
                      <Zap className="h-3 w-3" /> {q}
                    </button>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="> Enter command..."
                    className="flex-1 rounded border border-bat/30 bg-black/60 px-3 py-2 font-mono text-sm text-bat placeholder:text-bat/40 focus:outline-none focus:ring-1 focus:ring-bat"
                  />
                  <button
                    type="submit"
                    className="grid h-9 w-9 place-items-center rounded bg-bat text-black hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
