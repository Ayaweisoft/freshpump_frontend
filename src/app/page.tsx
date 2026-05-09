"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Droplets,
  Globe2,
  Layers3,
  MonitorSmartphone,
  MoveRight,
  RadioTower,
  ShieldCheck,
  WalletCards,
  Zap,
  TrendingUp,
  Users,
  Clock,
  Lock,
  ArrowUpRight,
} from "lucide-react";

import { AppLogo } from "@/components/ui/app-logo";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const heroHighlights = [
  "Real-Time Pump Monitoring",
  "Smart Tank Management",
  "Multi-Branch Control",
  "Multi-Currency Support",
];

const features = [
  {
    title: "Smart Pump Operations",
    description: "Track pump activity, fuel dispensing, and sales volume in real time.",
    icon: RadioTower,
    gradient: "from-blue-500/20 to-cyan-500/20",
    highlights: ["Live monitoring", "Pump assignment", "Dispensing status", "Variance tracking"],
  },
  {
    title: "Intelligent Tank Monitoring",
    description: "Monitor fuel tank levels with smart sensor integrations and real-time alerts.",
    icon: Droplets,
    gradient: "from-emerald-500/20 to-teal-500/20",
    highlights: ["Level tracking", "Leakage detection", "Low stock alerts", "Analytics"],
  },
  {
    title: "Sales Management",
    description: "Capture fuel sales instantly with powerful financial reports and analytics.",
    icon: WalletCards,
    gradient: "from-purple-500/20 to-pink-500/20",
    highlights: ["Daily reports", "Shift management", "Cash reconciliation", "Revenue analytics"],
  },
  {
    title: "Branch Management",
    description: "Manage all your fuel stations from one intelligent enterprise dashboard.",
    icon: Building2,
    gradient: "from-amber-500/20 to-orange-500/20",
    highlights: ["Branch comparison", "Centralized reporting", "Multi-user permissions", "Regional oversight"],
  },
  {
    title: "Inventory Control",
    description: "Track lubricants, spare parts, and products with intelligent management tools.",
    icon: Layers3,
    gradient: "from-indigo-500/20 to-purple-500/20",
    highlights: ["Product tracking", "Stock alerts", "Movement logs", "Warehouse management"],
  },
  {
    title: "Data Analytics",
    description: "Transform operational data into actionable insights with intelligent dashboards.",
    icon: BarChart3,
    gradient: "from-rose-500/20 to-red-500/20",
    highlights: ["Forecasting", "Performance tracking", "Trend analysis", "KPI reporting"],
  },
];

const stats = [
  { label: "Fuel Transactions", value: "₦2.4B+", icon: TrendingUp },
  { label: "Active Pumps", value: "500+", icon: Zap },
  { label: "System Uptime", value: "99.9%", icon: Clock },
  { label: "Trusted By", value: "100+ Businesses", icon: Users },
];

const pricingPlans = [
  {
    name: "Standard",
    price: "₦25,000",
    period: "/month/branch",
    description: "Perfect for independent filling stations",
    features: [
      "1-6 pumps included",
      "Pump management",
      "Sales tracking",
      "Inventory management",
      "Shift management",
      "Basic reports",
    ],
    featured: false,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "₦35,000",
    period: "/month/branch",
    description: "Advanced automation for enterprise stations",
    features: [
      "Everything in Standard",
      "Tank monitoring",
      "Smart alerts",
      "IoT integrations",
      "Advanced analytics",
      "API access",
      "Priority support",
    ],
    featured: true,
    cta: "Request Demo",
  },
];

const testimonials = [
  {
    quote: "Fresh Pump transformed how we monitor our stations. Real-time visibility across all branches.",
    author: "John Okonkwo",
    role: "Station Manager",
  },
  {
    quote: "The analytics and tank monitoring helped us reduce fuel losses significantly.",
    author: "Chioma Eze",
    role: "Operations Director",
  },
  {
    quote: "Modern, fast, and enterprise-grade. Exactly what our operations needed.",
    author: "Ahmed Hassan",
    role: "Fuel Distributor",
  },
];

const faqs = [
  {
    question: "Can Fresh Pump manage multiple branches?",
    answer: "Yes. Fresh Pump supports enterprise multi-branch operations with centralized control.",
  },
  {
    question: "Does it support smart tank monitoring?",
    answer: "Yes. The Pro plan includes IoT sensor integrations and real-time tank level tracking.",
  },
  {
    question: "Is Fresh Pump cloud-based?",
    answer: "Yes. Secure cloud infrastructure with offline synchronization support.",
  },
  {
    question: "Does it support multiple currencies?",
    answer: "Yes. Multi-currency support with automatic exchange rate conversions.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function LandingPage() {
  return (
    <main className="flex flex-col bg-linear-to-b from-background via-background to-surface/20">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border-subtle/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <AppLogo size="sm" showSubtitle={false} />
            
            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-text-secondary transition hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-success hover:shadow-(--shadow-glow-success) md:inline-flex"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-22">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-success/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary border border-primary/20">
              <Zap className="h-4 w-4" />
              Smart Fuel Retail Automation
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Powering Modern Filling Stations with
              <span className="bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}Real-Time Intelligence
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
              Manage pumps, tanks, attendants, inventory, and branch operations from one intelligent cloud platform.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap"
            >
              <motion.div variants={itemVariants}>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-success hover:shadow-(--shadow-glow-success)"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface/50 px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-surface"
                >
                  View Pricing
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface/50 px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-surface"
                >
                  Live Dashboard
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="rounded-lg border border-border-subtle bg-surface/50 p-3.5 text-center backdrop-blur-sm transition hover:bg-surface/80"
                >
                  <Icon className="mx-auto mb-2 h-5 w-5 text-primary" />
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="mt-1 text-xs font-medium text-text-muted">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              Powerful Features
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Everything Your Fuel Business Needs
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-text-secondary">
              Operational tools designed for modern fuel retail.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-xl border border-border-subtle bg-surface/50 p-5 transition hover:border-primary/50 hover:bg-surface/80"
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 transition group-hover:opacity-100`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <h3 className="mt-3 text-lg font-bold text-foreground">{feature.title}</h3>
                    <p className="mt-1.5 text-sm text-text-secondary">{feature.description}</p>

                    <ul className="mt-3 space-y-1.5">
                      {feature.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2 text-sm text-text-secondary">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-surface/30 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              Trusted by Fuel Businesses
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Built for Modern Fuel Retail
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-text-secondary">
              Used by stations, depots, marketers, and enterprise retailers.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {["Filling Stations", "Fuel Depots", "Petroleum Marketers", "Enterprise Retailers"].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -4 }}
                  className="rounded-lg border border-border-subtle bg-surface/50 p-4.5 text-center transition hover:bg-surface/80"
                >
                  <p className="font-semibold text-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              Simple Pricing
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Choose Your Plan
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-text-secondary">
              Straightforward pricing for every fuel business size.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                className={`relative overflow-hidden rounded-2xl border transition ${
                  plan.featured
                    ? "border-primary/50 bg-linear-to-br from-primary/10 to-purple-500/10 ring-2 ring-primary/20"
                    : "border-border-subtle bg-surface/50 hover:bg-surface/80"
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-xs font-bold text-white rounded-bl-lg">
                    POPULAR
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground">{plan.name} Plan</h3>
                  <div className="mt-3">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-text-secondary ml-2">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">{plan.description}</p>

                  <button
                    className={`mt-6 w-full rounded-lg py-3 font-semibold transition ${
                      plan.featured
                        ? "bg-primary text-white shadow-lg hover:bg-success hover:shadow-(--shadow-glow-success)"
                        : "border border-border-subtle text-foreground hover:bg-surface/80"
                    }`}
                  >
                    {plan.cta}
                  </button>

                  <div className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-surface/30 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              Success Stories
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              What Our Customers Say
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-5 md:grid-cols-3"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.author}
                variants={itemVariants}
                className="rounded-xl border border-border-subtle bg-background p-5 transition hover:border-primary/50"
              >
                <div className="mb-3 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">★</span>
                  ))}
                </div>
                <p className="text-sm text-text-secondary italic">"{testimonial.quote}"</p>
                <div className="mt-5">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-text-muted">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              Questions?
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                variants={itemVariants}
                className="group cursor-pointer rounded-lg border border-border-subtle bg-surface/50 p-5 transition hover:bg-surface/80"
              >
                <h3 className="flex items-center justify-between text-lg font-semibold text-foreground">
                  {faq.question}
                  <span className="text-primary group-hover:translate-x-1 transition">→</span>
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Ready to Modernize Your Fuel Operations?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
              Join fuel businesses using Fresh Pump to automate operations and increase profitability.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <motion.div variants={itemVariants}>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-success hover:shadow-(--shadow-glow-success)"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <a
                  href="mailto:ayaweisoft@gmail.com"
                  className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface/50 px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-surface"
                >
                  Contact Sales
                  <MoveRight className="h-4 w-4" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-surface/50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <AppLogo size="sm" showSubtitle={false} />
              <p className="mt-4 text-sm text-text-secondary">
                Modern fuel station management platform for intelligent fuel retail operations.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground">Product</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#features" className="text-sm text-text-secondary hover:text-foreground transition">Features</a></li>
                <li><a href="#pricing" className="text-sm text-text-secondary hover:text-foreground transition">Pricing</a></li>
                <li><a href="/dashboard" className="text-sm text-text-secondary hover:text-foreground transition">Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#about" className="text-sm text-text-secondary hover:text-foreground transition">About</a></li>
                <li><a href="#contact" className="text-sm text-text-secondary hover:text-foreground transition">Contact</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-foreground transition">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-text-secondary hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-foreground transition">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border-subtle pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-text-muted">
              © 2025 Fresh Pump. All rights reserved. Made by Ayaweisoft Limited.
            </p>
            <a href="mailto:ayaweisoft@gmail.com" className="mt-4 sm:mt-0 text-sm font-semibold text-primary hover:text-primary-strong transition">
              ayaweisoft@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}