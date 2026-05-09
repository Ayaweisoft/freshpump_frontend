"use client";

import type { FormEvent, MouseEvent } from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ─── Brand Colors (extracted from logo + dashboard) ───────────────────────────
// Green: #2e7d32 / #43a047  (FRESH text, nozzle, accents)
// Navy:  #1a3a5c / #1e4976  (PUMP text, sidebar)
// Orange:#f57c00 / #ff9800  (pump body)
// Dark bg: #0d1117 / #111827
// ─────────────────────────────────────────────────────────────────────────────

const DEMO = { email: "ayaweisoft@gmail.com", password: "12345678" };

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
  );
}

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Inline SVG fuel-pump logo matching the brand image ─────────────────────
const FreshPumpLogo = ({ size = "md" }) => {
  const scale = size === "lg" ? 1 : size === "sm" ? 0.7 : 0.85;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: scale * 10 + "px" }}>
      {/* Pump icon */}
      <svg width={scale * 48} height={scale * 48} viewBox="0 0 48 48" fill="none">
        {/* Body */}
        <rect x="8" y="10" width="22" height="30" rx="3" fill="url(#pump-grad)" />
        <rect x="11" y="14" width="16" height="10" rx="2" fill="#1a3a5c" opacity="0.6" />
        {/* Screen */}
        <rect x="13" y="15" width="12" height="7" rx="1.5" fill="#0d1117" opacity="0.8" />
        <rect x="14" y="16" width="10" height="5" rx="1" fill="#43a047" opacity="0.5" />
        {/* Hose */}
        <path d="M30 16 Q38 16 38 22 Q38 30 32 30" stroke="#2d3748" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Nozzle */}
        <path d="M30 28 L30 34 Q30 36 32 36 L36 36 Q38 36 38 34 L38 30" stroke="#43a047" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="29" y="28" width="10" height="4" rx="1.5" fill="#43a047" />
        {/* Drop */}
        <path d="M36 20 Q37.5 18 36 16 Q34.5 18 36 20Z" fill="#43a047" />
        {/* Swoosh */}
        <path d="M4 38 Q18 34 30 38 Q36 40 44 37" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M6 40 Q20 36 32 40 Q38 42 46 39" stroke="#1e4976" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
        <defs>
          <linearGradient id="pump-grad" x1="8" y1="10" x2="30" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff9800" />
            <stop offset="100%" stopColor="#e65100" />
          </linearGradient>
        </defs>
      </svg>
      {/* Text */}
      <div style={{ lineHeight: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: scale * 20 + "px",
            color: "#43a047",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>FRESH</span>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: scale * 20 + "px",
            color: "#1e4976",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>PUMP</span>
        </div>
        {size !== "sm" && (
          <span style={{
            fontSize: scale * 9 + "px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#6b7280",
            fontFamily: "'DM Sans', sans-serif",
          }}>FSMS</span>
        )}
      </div>
    </div>
  );
};

const features = [
  "Real-time pump & tank monitoring",
  "Multi-branch operations control",
  "Shift reconciliation & cash tracking",
  "Advanced analytics & KPI dashboards",
  "Smart alerts & IoT integrations",
];

const stats = [
  { value: "₦2.4B+", label: "Transactions processed" },
  { value: "500+", label: "Active pumps managed" },
  { value: "99.9%", label: "Platform uptime" },
  { value: "100+", label: "Businesses trust us" },
];

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState(DEMO.email);
  const [password, setPassword] = useState(DEMO.password);
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<"email" | "pass" | null>(null);

  const handleLogin = (e?: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setError("");
    if (!email) { setError("Please enter your email address."); return; }
    if (!password) { setError("Please enter your password."); return; }
    startTransition(() => {
      router.push("/dashboard");
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .fp-root {
          min-height: 100vh;
          display: flex;
          background: #0a0f1a;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Ambient background glows */
        .fp-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 15% 10%, rgba(67,160,71,.10) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 85% 85%, rgba(30,73,118,.14) 0%, transparent 50%),
            radial-gradient(ellipse 40% 35% at 50% 50%, rgba(245,124,0,.05) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* Grid overlay */
        .fp-root::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── LEFT PANEL ── */
        .fp-left {
          flex: 1.15;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 56px;
          position: relative;
          z-index: 1;
          border-right: 1px solid rgba(255,255,255,.05);
          background: linear-gradient(160deg, rgba(255,255,255,.02) 0%, transparent 60%);
          overflow: hidden;
        }

        /* Decorative orbs on left */
        .fp-orb-1 {
          position: absolute;
          top: -80px; left: -80px;
          width: 360px; height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(67,160,71,.12), transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          animation: fp-float 8s ease-in-out infinite;
        }
        .fp-orb-2 {
          position: absolute;
          bottom: -60px; right: -40px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(30,73,118,.15), transparent 70%);
          filter: blur(50px);
          pointer-events: none;
          animation: fp-float 10s ease-in-out infinite reverse;
        }
        @keyframes fp-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, -15px) scale(1.05); }
        }

        .fp-left-top { position: relative; }
        .fp-left-bottom { position: relative; }

        .fp-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 52px; }

        .fp-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 500; color: #6b7280;
          text-decoration: none;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 10px;
          padding: 7px 13px;
          transition: all .18s ease;
        }
        .fp-back:hover { color: #e5e7eb; background: rgba(255,255,255,.07); }
        .fp-back svg { transition: transform .18s ease; }
        .fp-back:hover svg { transform: translateX(-3px); }

        /* Hero text */
        .fp-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 600;
          letter-spacing: .14em; text-transform: uppercase;
          color: #43a047;
          background: rgba(67,160,71,.10);
          border: 1px solid rgba(67,160,71,.2);
          border-radius: 999px;
          padding: 5px 14px;
          margin-bottom: 20px;
        }
        .fp-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #43a047;
          animation: fp-pulse 2s ease-in-out infinite;
        }
        @keyframes fp-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(.8); }
        }

        .fp-h1 {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(2rem, 3.2vw, 3rem);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -.04em;
          color: #f9fafb;
          margin-bottom: 18px;
        }
        .fp-h1-green { color: #43a047; }
        .fp-h1-navy { color: #60a5fa; }

        .fp-hero-desc {
          font-size: 15px;
          line-height: 1.72;
          color: #9ca3af;
          max-width: 430px;
          margin-bottom: 36px;
        }

        /* Feature list */
        .fp-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 40px; }
        .fp-feature {
          display: flex; align-items: center; gap: 10px;
          font-size: 13.5px; color: #d1d5db;
        }
        .fp-feature-icon {
          width: 20px; height: 20px; border-radius: 6px;
          background: rgba(67,160,71,.15);
          border: 1px solid rgba(67,160,71,.25);
          display: flex; align-items: center; justify-content: center;
          color: #43a047; flex-shrink: 0;
        }

        /* Stats */
        .fp-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .fp-stat {
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.025);
          padding: 14px 12px;
          text-align: center;
          transition: all .2s;
        }
        .fp-stat:hover {
          border-color: rgba(67,160,71,.2);
          background: rgba(67,160,71,.05);
          transform: translateY(-2px);
        }
        .fp-stat-val {
          font-family: 'JetBrains Mono', monospace;
          font-size: 15px; font-weight: 500;
          color: #f9fafb;
          display: block; margin-bottom: 3px;
        }
        .fp-stat-label { font-size: 10px; color: #6b7280; letter-spacing: .03em; }

        /* ── RIGHT PANEL ── */
        .fp-right {
          flex: .85;
          display: flex; align-items: center; justify-content: center;
          padding: 40px 48px;
          position: relative; z-index: 1;
          background: linear-gradient(180deg, rgba(255,255,255,.012) 0%, rgba(255,255,255,0) 100%);
        }

        .fp-card {
          width: 100%; max-width: 440px;
          background: rgba(13,19,32,.92);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 24px;
          padding: 38px 36px;
          box-shadow:
            0 0 0 .5px rgba(255,255,255,.04) inset,
            0 30px 80px rgba(0,0,0,.5),
            0 0 60px rgba(67,160,71,.04);
          backdrop-filter: blur(20px);
          position: relative; overflow: hidden;
          animation: fp-card-in .5s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes fp-card-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        /* Top accent stripe */
        .fp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 20%; right: 20%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #43a047, #1e4976, transparent);
          border-radius: 0 0 4px 4px;
        }
        /* Corner glow */
        .fp-card::after {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(67,160,71,.08), transparent 70%);
          pointer-events: none;
        }

        .fp-card-header { margin-bottom: 28px; position: relative; }
        .fp-card-header-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 4px; }
        .fp-card-eyebrow {
          font-size: 10px; font-weight: 600;
          letter-spacing: .2em; text-transform: uppercase;
          color: #43a047; margin-bottom: 8px;
        }
        .fp-card-title {
          font-family: 'Poppins', sans-serif;
          font-size: 22px; font-weight: 600;
          line-height: 1.2; letter-spacing: -.03em;
          color: #f9fafb; margin-bottom: 8px;
        }
        .fp-card-desc { font-size: 13px; line-height: 1.6; color: #6b7280; }

        /* Status badges */
        .fp-badges { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }
        .fp-badge-secure {
          font-size: 10px; font-weight: 600;
          letter-spacing: .06em;
          color: #43a047;
          background: rgba(67,160,71,.1);
          border: 1px solid rgba(67,160,71,.2);
          border-radius: 999px;
          padding: 3px 10px;
        }
        .fp-badge-online {
          display: flex; align-items: center; gap: 5px;
          font-size: 10px; color: #9ca3af;
        }
        .fp-online-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #43a047;
          animation: fp-pulse 2s ease-in-out infinite;
        }

        /* Google button */
        .fp-google-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 15px;
          background: rgba(255,255,255,.96);
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 14px;
          cursor: pointer;
          transition: all .18s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,.2);
          margin-bottom: 20px;
        }
        .fp-google-btn:hover {
          background: #fff;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0,0,0,.25);
        }
        .fp-google-inner { display: flex; align-items: center; gap: 11px; }
        .fp-google-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #43a047, #1e4976);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Poppins', sans-serif;
          font-size: 15px; font-weight: 700; color: #fff;
          flex-shrink: 0;
        }
        .fp-google-text p { font-size: 13px; font-weight: 600; color: #111827; line-height: 1.2; }
        .fp-google-text small { font-size: 10.5px; color: #6b7280; }
        .fp-google-chev { color: #9ca3af; }

        /* Divider */
        .fp-divider {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px;
        }
        .fp-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,.07); }
        .fp-divider-text {
          font-size: 10px; font-weight: 600;
          letter-spacing: .18em; text-transform: uppercase;
          color: #374151; white-space: nowrap;
        }

        /* Fields */
        .fp-field { margin-bottom: 14px; }
        .fp-field-label {
          display: flex; align-items: center; justify-content: space-between;
          font-size: 12.5px; font-weight: 500; color: #9ca3af;
          margin-bottom: 6px;
        }
        .fp-field-wrap { position: relative; }
        .fp-input {
          width: 100%;
          padding: 13px 42px 13px 14px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 12px;
          color: #f9fafb;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: all .2s ease;
          -webkit-appearance: none;
        }
        .fp-input::placeholder { color: #374151; }
        .fp-input:focus {
          border-color: rgba(67,160,71,.4);
          background: rgba(67,160,71,.04);
          box-shadow: 0 0 0 4px rgba(67,160,71,.08);
        }
        .fp-input.error { border-color: rgba(239,68,68,.4); box-shadow: 0 0 0 4px rgba(239,68,68,.06); }

        .fp-eye-btn {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #4b5563; padding: 4px;
          transition: color .15s;
        }
        .fp-eye-btn:hover { color: #9ca3af; }

        /* Error */
        .fp-error {
          font-size: 12px; color: #f87171;
          background: rgba(239,68,68,.08);
          border: 1px solid rgba(239,68,68,.15);
          border-radius: 8px;
          padding: 8px 12px;
          margin-bottom: 14px;
          display: flex; align-items: center; gap: 7px;
        }
        .fp-error svg { flex-shrink: 0; stroke: #f87171; }

        /* Demo box */
        .fp-demo {
          border-radius: 12px;
          border: 1px solid rgba(67,160,71,.15);
          background: linear-gradient(135deg, rgba(67,160,71,.07), rgba(30,73,118,.05));
          padding: 13px 14px;
          margin-bottom: 16px;
        }
        .fp-demo-title { font-size: 11.5px; font-weight: 600; color: #d1d5db; margin-bottom: 6px; }
        .fp-demo-cred {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px; color: #43a047;
          line-height: 1.8;
        }

        /* Primary CTA */
        .fp-btn-primary {
          width: 100%;
          padding: 14px;
          border: none; border-radius: 12px;
          background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
          color: #fff;
          font-family: 'Poppins', sans-serif;
          font-size: 14px; font-weight: 600;
          cursor: pointer;
          transition: all .22s ease;
          position: relative; overflow: hidden;
          box-shadow: 0 6px 20px rgba(46,125,50,.3);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-bottom: 10px;
        }
        .fp-btn-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,.1), transparent);
          pointer-events: none;
        }
        .fp-btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(46,125,50,.4);
          background: linear-gradient(135deg, #388e3c 0%, #2e7d32 100%);
        }
        .fp-btn-primary:active:not(:disabled) { transform: translateY(0); }
        .fp-btn-primary:disabled { opacity: .65; cursor: wait; }

        /* Spinner */
        .fp-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: fp-spin .7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes fp-spin { to { transform: rotate(360deg); } }

        /* OTP button */
        .fp-btn-otp {
          width: 100%;
          padding: 13px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 12px;
          background: rgba(255,255,255,.03);
          color: #d1d5db;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 500;
          cursor: pointer;
          transition: all .2s;
          margin-bottom: 16px;
        }
        .fp-btn-otp:hover {
          background: rgba(255,255,255,.06);
          border-color: rgba(67,160,71,.2);
          color: #f9fafb;
        }

        /* Extras row */
        .fp-extras {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 22px;
        }
        .fp-check-label {
          display: flex; align-items: center; gap: 7px;
          font-size: 12.5px; color: #9ca3af; cursor: pointer;
          user-select: none;
        }
        .fp-check-label input[type="checkbox"] {
          width: 14px; height: 14px;
          accent-color: #43a047; cursor: pointer;
        }
        .fp-forgot {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px; color: #43a047;
          transition: color .15s; padding: 0;
        }
        .fp-forgot:hover { color: #81c784; }

        /* Bottom card */
        .fp-footer-card {
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.02);
          padding: 14px 16px;
        }
        .fp-footer-top {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .fp-footer-top p { font-size: 12px; color: #6b7280; line-height: 1.45; max-width: 200px; }
        .fp-req-demo {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12.5px; font-weight: 600; color: #43a047;
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: color .15s; padding: 0; white-space: nowrap;
        }
        .fp-req-demo:hover { color: #81c784; }
        .fp-footer-links { display: flex; flex-wrap: wrap; gap: 12px; }
        .fp-footer-links a {
          font-size: 11px; color: #374151; text-decoration: none;
          transition: color .15s;
        }
        .fp-footer-links a:hover { color: #9ca3af; }

        .fp-copyright {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,.04);
          display: flex; align-items: center; justify-content: space-between;
          font-size: 11px; color: #374151;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .fp-root { flex-direction: column; }
          .fp-left { padding: 36px 32px; border-right: none; border-bottom: 1px solid rgba(255,255,255,.05); }
          .fp-stats { grid-template-columns: repeat(4, 1fr); }
          .fp-right { padding: 36px 32px; }
        }
        @media (max-width: 700px) {
          .fp-left { padding: 24px 20px; }
          .fp-right { padding: 24px 16px; }
          .fp-card { padding: 28px 22px; }
          .fp-stats { grid-template-columns: repeat(2, 1fr); }
          .fp-h1 { font-size: 1.8rem; }
        }
      `}</style>

      <div className="fp-root">
        {/* ── LEFT ── */}
        <aside className="fp-left">
          <div className="fp-orb-1" />
          <div className="fp-orb-2" />

          <div className="fp-left-top">
            <div className="fp-nav">
              <FreshPumpLogo size="md" />
              <Link href="/" className="fp-back">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Overview
              </Link>
            </div>

            <div className="fp-eyebrow">
              <div className="fp-eyebrow-dot" />
              Smart Fuel Retail Automation
            </div>

            <h1 className="fp-h1">
              Modern Filling Station
              <br />
              <span className="fp-h1-green">Operations,</span>
              <br />
              <span className="fp-h1-navy">Powered in Real Time.</span>
            </h1>

            <p className="fp-hero-desc">
              Fresh Pump centralizes pump monitoring, tank management, shift reconciliation,
              branch oversight, and financial analytics — all in one intelligent platform.
            </p>

            <div className="fp-features">
              {features.map((f) => (
                <div key={f} className="fp-feature">
                  <div className="fp-feature-icon"><CheckIcon /></div>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="fp-left-bottom">
            <div className="fp-stats">
              {stats.map((s) => (
                <div key={s.label} className="fp-stat">
                  <span className="fp-stat-val">{s.value}</span>
                  <span className="fp-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="fp-copyright">
              <span>© 2026 Fresh Pump OS</span>
              <span>Powered by Ayaweisoft Limited</span>
            </div>
          </div>
        </aside>

        {/* ── RIGHT ── */}
        <section className="fp-right">
          <div className="fp-card">
            <div className="fp-card-header">
              <div className="fp-card-header-row">
                <div>
                  <div className="fp-card-eyebrow">Sign in to your account</div>
                  <h2 className="fp-card-title">Access Your<br />Command Center</h2>
                </div>
                <div className="fp-badges">
                  <div className="fp-badge-secure">🔒 Secure</div>
                  <div className="fp-badge-online">
                    <div className="fp-online-dot" />
                    System online
                  </div>
                </div>
              </div>
              <p className="fp-card-desc">
                Use your credentials or demo access to enter the Fresh Pump dashboard.
              </p>
            </div>

            {/* Google SSO */}
            <button className="fp-google-btn" onClick={handleLogin}>
              <div className="fp-google-inner">
                <div className="fp-google-avatar">G</div>
                <div className="fp-google-text">
                  <p>Continue with Google</p>
                  <small>Recommended for production accounts</small>
                </div>
              </div>
              <div className="fp-google-chev">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>

            <div className="fp-divider">
              <div className="fp-divider-line" />
              <span className="fp-divider-text">or use email & password</span>
              <div className="fp-divider-line" />
            </div>

            <form onSubmit={handleLogin} noValidate>
              {/* Email */}
              <div className="fp-field">
                <div className="fp-field-label">
                  <span>Email address</span>
                </div>
                <div className="fp-field-wrap">
                  <input
                    type="email"
                    className={`fp-input${error && !email ? " error" : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="fp-field">
                <div className="fp-field-label">
                  <span>Password</span>
                  <button type="button" className="fp-forgot" onClick={() => {}}>
                    Forgot password?
                  </button>
                </div>
                <div className="fp-field-wrap">
                  <input
                    type={showPass ? "text" : "password"}
                    className={`fp-input${error && !password ? " error" : ""}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("pass")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="fp-eye-btn"
                    onClick={() => setShowPass(!showPass)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    <EyeIcon open={showPass} />
                  </button>
                </div>
              </div>

              {error && (
                <div className="fp-error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Demo credentials */}
              <div className="fp-demo">
                <div className="fp-demo-title">Demo access credentials</div>
                <div className="fp-demo-cred">
                  {DEMO.email}<br />{DEMO.password}
                </div>
              </div>

              {/* Remember */}
              <div className="fp-extras">
                <label className="fp-check-label">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Keep me signed in
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="fp-btn-primary"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <div className="fp-spinner" />
                    Opening Dashboard…
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRightIcon />
                  </>
                )}
              </button>

              <button
                type="button"
                className="fp-btn-otp"
                onClick={handleLogin}
              >
                Login with OTP instead
              </button>
            </form>

            {/* Footer card */}
            <div className="fp-footer-card">
              <div className="fp-footer-top">
                <p>Need a walkthrough for your station network?</p>
                <button className="fp-req-demo" onClick={handleLogin}>
                  Request demo <ArrowRightIcon />
                </button>
              </div>
              <div className="fp-footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Support</a>
                <a href="#">English (NG)</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}