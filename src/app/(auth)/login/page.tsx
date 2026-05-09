"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Shield } from "lucide-react";

import { AppLogo } from "@/components/ui/app-logo";

const highlights = [
  "Real-time pump and tank visibility",
  "Shift reconciliation and branch oversight",
  "Inventory, billing, analytics, and staff controls",
];

const demoCredentials = {
  email: "ayaweisoft@gmail.com",
  password: "12345678",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen overflow-hidden px-4 py-4 lg:px-6 lg:py-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="floating-orb absolute left-[8%] top-[10%] h-52 w-52 rounded-full bg-primary/16 blur-3xl" />
        <div className="floating-orb absolute right-[10%] top-[18%] h-72 w-72 rounded-full bg-success/10 blur-3xl [animation-delay:1.2s]" />
        <div className="floating-orb absolute bottom-[8%] left-[38%] h-64 w-64 rounded-full bg-primary/10 blur-3xl [animation-delay:2.4s]" />
      </div>

      <div className="auth-shell relative mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-7xl overflow-hidden rounded-[36px] shadow-[0_30px_120px_rgba(0,0,0,0.24)] lg:grid-cols-[1.15fr_0.85fr]">
        <section className="relative flex flex-col justify-between overflow-hidden border-b border-border-subtle p-8 lg:border-b-0 lg:border-r lg:p-12">
          <div>
            <AppLogo size="md" showSubtitle className="max-w-max" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-14 max-w-2xl"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-primary">Smart station control</p>
              <h1 className="mt-5 max-w-xl font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[3.65rem]">
                Powering smart filling station operations with real-time automation.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-text-secondary sm:text-lg">
                Manage pumps, tanks, attendants, inventory, sales, and multi-branch operations from one intelligent cloud platform.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Stations Live", value: "08" },
                { label: "Pumps Online", value: "42" },
                { label: "Daily Throughput", value: "48.3KL" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * index }}
                  className="glass-panel rounded-[26px] p-5"
                >
                  <p className="text-sm text-text-secondary">{item.label}</p>
                  <p className="mt-3 font-mono text-3xl font-semibold text-foreground">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="glass-panel rounded-[28px] p-6">
              <p className="text-sm font-semibold text-foreground">Platform highlights</p>
              <div className="mt-4 space-y-4">
                {highlights.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-text-secondary">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="leading-7">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[28px] p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-success/12 p-3 text-success">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Operationally secure</p>
                  <p className="text-xs text-text-secondary">Audit-ready access and branch controls</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-side-surface flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="auth-card w-full max-w-xl rounded-4xl p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-primary">Sign in</p>
                <h2 className="mt-3 font-heading text-3xl font-semibold text-foreground">
                  Access your command center
                </h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-text-secondary">
                  The live Fresh Pump app routes authentication through Google first. Use the Google path below, or continue with the demo access fields.
                </p>
              </div>
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Secure login
              </span>
            </div>

            <form className="mt-8 space-y-5">
              <button
                type="button"
                className="google-button flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]">
                    <span className="font-heading text-lg font-semibold text-primary">G</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Continue with Google</p>
                    <p className="text-xs text-text-muted">Preferred access method in production</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-border-subtle" />
                <span className="text-xs uppercase tracking-[0.2em] text-text-muted">or use demo access</span>
                <div className="h-px flex-1 bg-border-subtle" />
              </div>

              <label className="block">
                <span className="text-sm text-text-secondary">Email address</span>
                <input
                  type="email"
                  defaultValue={demoCredentials.email}
                  className="mt-2 w-full rounded-2xl border border-border-subtle bg-background/45 px-4 py-4 text-foreground outline-none transition placeholder:text-text-muted focus:border-primary/40"
                />
              </label>

              <label className="block">
                <span className="text-sm text-text-secondary">Password</span>
                <input
                  type="password"
                  defaultValue={demoCredentials.password}
                  className="mt-2 w-full rounded-2xl border border-border-subtle bg-background/45 px-4 py-4 text-foreground outline-none transition placeholder:text-text-muted focus:border-primary/40"
                />
              </label>

              <div className="rounded-3xl border border-primary/20 bg-primary/8 p-4 text-sm text-text-secondary">
                <p className="font-semibold text-foreground">Demo access</p>
                <p className="mt-2 font-mono text-xs text-primary sm:text-sm">
                  {demoCredentials.email}
                </p>
                <p className="mt-1 font-mono text-xs text-primary sm:text-sm">
                  {demoCredentials.password}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="flex-1 rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-white transition hover:bg-success hover:shadow-(--shadow-glow-success)"
                >
                  Sign In With Demo Access
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-2xl border border-border-subtle bg-card/70 px-5 py-4 text-sm font-semibold text-foreground transition hover:bg-card"
                >
                  Login with OTP
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm text-text-secondary">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-border-subtle bg-background/40" />
                  <span>Keep me signed in</span>
                </label>
                <button type="button" className="text-primary transition hover:text-primary-strong">
                  Forgot password?
                </button>
              </div>
            </form>

            <div className="mt-8 space-y-4 rounded-3xl border border-border-subtle bg-background/35 p-5 text-sm text-text-secondary">
              <div className="flex items-center justify-between gap-3">
                <span>Need a product walkthrough for your station network?</span>
                <Link href="/dashboard" className="inline-flex items-center gap-2 font-semibold text-primary">
                  Request demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-text-muted">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>English (United States)</span>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}