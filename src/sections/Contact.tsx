import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
const email = "ssinghsahil140@gmail.com";
const formspreeEndpoint = "https://formspree.io/f/xqpelppa";
export default function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">(
    "idle",
  );
  const [sendState, setSendState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const fallback = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (copyState === "manual") {
      fallback.current?.focus();
      fallback.current?.select();
    }
  }, [copyState]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
    } catch {
      setCopyState("manual");
    }
  };
  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSendState("sending");
    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("Formspree rejected the message");
      form.reset();
      setSendState("sent");
    } catch {
      setSendState("error");
    }
  };
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="shell">
        <div className="contact-ornament js-reveal">
          <span />
          <img
            src={`${import.meta.env.BASE_URL}crest.svg`}
            width="72"
            height="72"
            alt=""
          />
          <span />
        </div>
        <div className="contact-copy js-reveal">
          <p className="eyebrow">CO-OP STARTS WITH A CONVERSATION</p>
          <h2 id="contact-title">
            Leave a<br />
            <em>summon sign.</em>
          </h2>
          <p>
            Have a difficult problem, a thoughtful team, or a build worth doing?
            <br />
            Let’s talk about what comes next.
          </p>
        </div>
        <div className="summon-terminal js-reveal">
          <div className="terminal-heading">
            <span className="status-dot" /> GOLDEN SUMMON SIGN
            <span>CONTACT / SAHIL</span>
          </div>
          <button
            className={`glyph-button ${copyState === "copied" ? "is-copied" : ""}`}
            type="button"
            onClick={() => void copy()}
          >
            <span className="chalk-glyphs" aria-hidden="true">
              ᛋ ⟐ ╪ ⟡ ᛁ ╱╲
            </span>
            <span className="glyph-action">
              {copyState === "copied" ? (
                <Check size={15} />
              ) : (
                <Copy size={15} />
              )}{" "}
              {copyState === "copied"
                ? "Summon sign copied"
                : "Touch the sign to copy my email"}
            </span>
          </button>
          <form className="summon-form" onSubmit={(event) => void send(event)}>
            <label>
              Name
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} required />
            </label>
            <input
              className="summon-honeypot"
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <button className="button button-gold" type="submit" disabled={sendState === "sending"}>
              {sendState === "sending" ? "Sending" : "Send the message"}
            </button>
            <p role="status" className="copy-status">
              {sendState === "sent"
                ? "Got it. I’ll read it from my inbox."
                : sendState === "error"
                  ? "That didn’t send. Use the email address below."
                  : "Or write here. It comes to the same inbox."}
            </p>
          </form>
          <a className="contact-email" href={`mailto:${email}`}>
            <Mail size={17} />
            {email}
            <ArrowUpRight size={18} />
          </a>
          <p role="status" className="copy-status">
            {copyState === "copied"
              ? "Email address copied. Ready when you are."
              : copyState === "manual"
                ? "Clipboard unavailable. Select and copy the address below."
                : "Or open your email app using the address above."}
          </p>
          {copyState === "manual" && (
            <input
              ref={fallback}
              className="manual-copy"
              aria-label="Email address to copy manually"
              readOnly
              value={email}
            />
          )}
        </div>
        <div className="social-links js-reveal">
          <a
            href="https://github.com/sahilas-gif"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} />
            GitHub
            <ArrowUpRight size={14} />
          </a>
          <a
            href="https://www.linkedin.com/in/sahil-singh-88aab7395/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={17} />
            LinkedIn
            <ArrowUpRight size={14} />
          </a>
          <a href="tel:+919326465509">
            <Phone size={17} />
            +91 9326465509
            <ArrowUpRight size={14} />
          </a>
        </div>
        <footer className="site-footer">
          <a className="footer-brand" href="#home">
            SAHIL SINGH<span>© {new Date().getFullYear()}</span>
          </a>
          <p>Forged with React, TypeScript & a little perseverance.</p>
          <a href="#home">Back to the bonfire ↑</a>
        </footer>
      </div>
    </section>
  );
}
