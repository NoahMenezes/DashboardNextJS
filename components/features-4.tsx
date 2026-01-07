"use client";

import {
  Cpu,
  Fingerprint,
  Pencil,
  Settings2,
  Sparkles,
  Zap,
  Globe,
  BarChart3,
  Users,
  Code2,
  ShieldCheck,
  Cloud,
} from "lucide-react";

import { CardPattern } from "@/components/ui/evervault-card";
import { motion, useMotionValue } from "motion/react";
import { useState, useCallback, useRef } from "react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {
  const features: Feature[] = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "AI-powered performance optimization delivers instant results and real-time responses.",
    },
    {
      icon: Cpu,
      title: "Intelligent Automation",
      description: "AI algorithms automate complex workflows and eliminate repetitive tasks.",
    },
    {
      icon: Fingerprint,
      title: "AI-Powered Security",
      description: "Advanced AI threat detection and protection keeps your data secure 24/7.",
    },
    {
      icon: Pencil,
      title: "Smart Customization",
      description: "AI learns your preferences and adapts the interface to your workflow.",
    },
    {
      icon: Settings2,
      title: "Full Control",
      description: "Maintain complete oversight while AI handles the heavy lifting.",
    },
    {
      icon: Sparkles,
      title: "AI-First Platform",
      description: "Built from the ground up with artificial intelligence at its core.",
    },
    {
      icon: Globe,
      title: "Global AI Network",
      description: "Distributed AI processing across the globe for minimal latency.",
    },
    {
      icon: BarChart3,
      title: "AI Analytics",
      description: "Predictive insights and intelligent recommendations based on real-time data.",
    },
    {
      icon: Users,
      title: "AI Team Assistant",
      description: "Virtual AI assistant coordinates team collaboration and streamlines communication.",
    },
    {
      icon: Code2,
      title: "AI API Integration",
      description: "Powerful API with AI capabilities that integrates with your existing tools.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise AI",
      description: "Enterprise-grade AI with compliance, security, and scalability built-in.",
    },
    {
      icon: Cloud,
      title: "AI Cloud Sync",
      description: "Intelligent cloud synchronization with AI-powered conflict resolution.",
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            AI-Powered Features for Maximum Productivity
          </h2>
          <p>
            Our platform leverages cutting-edge AI technology to streamline your
            workflows, automate repetitive tasks, and empower your team to
            achieve more.
          </p>
        </div>

        <motion.div 
          className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
               <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");
  const lastUpdate = useRef(0);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);

      // Throttle to prevent memory leaks - only update every 150ms
      const now = Date.now();
      if (now - lastUpdate.current >= 150) {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        // Reduced from 500 to 200 characters to save memory
        for (let i = 0; i < 200; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length),
          );
        }
        setRandomString(result);
        lastUpdate.current = now;
      }
    },
    [mouseX, mouseY],
  );

  const Icon = feature.icon;

  return (
    <div
      className="space-y-3 relative overflow-hidden group/card"
      onMouseMove={onMouseMove}
    >
      <CardPattern
        mouseX={mouseX}
        mouseY={mouseY}
        randomString={randomString}
      />
      <div className="flex items-center gap-2 relative z-10">
        <Icon className="size-4" />
        <h3 className="text-sm font-medium">{feature.title}</h3>
      </div>
      <p className="text-sm relative z-10">{feature.description}</p>
    </div>
  );
}
