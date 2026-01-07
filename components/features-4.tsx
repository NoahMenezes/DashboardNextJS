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
      title: "Faaast",
      description: "It supports an entire helping developers and innovate.",
    },
    {
      icon: Cpu,
      title: "Powerful",
      description: "It supports an entire helping developers and businesses.",
    },
    {
      icon: Fingerprint,
      title: "Security",
      description: "It supports an helping developers businesses.",
    },
    {
      icon: Pencil,
      title: "Customization",
      description: "It supports helping developers and businesses innovate.",
    },
    {
      icon: Settings2,
      title: "Control",
      description: "It supports helping developers and businesses innovate.",
    },
    {
      icon: Sparkles,
      title: "Built for AI",
      description: "It supports helping developers and businesses innovate.",
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Deployed on the edge, available worldwide for minimal latency.",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Get deep insights into your users' behavior instantly.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Built-in tools for your entire team to work together seamlessly.",
    },
    {
      icon: Code2,
      title: "Developer API",
      description: "Extensible API for deeply integrating with your existing stack.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Grade",
      description: "Bank-grade security and compliance ready for the enterprise.",
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description: "Everything is synced to the cloud in real-time, never lose data.",
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            The foundation for creative teams management
          </h2>
          <p>
            Lyra is evolving to be more than just the models. It supports an
            entire to the APIs and platforms helping developers and businesses
            innovate.
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
