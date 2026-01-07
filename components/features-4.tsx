"use client";

import {
  Cpu,
  Fingerprint,
  Pencil,
  Settings2,
  Sparkles,
  Zap,
} from "lucide-react";
import { CardPattern } from "@/components/ui/evervault-card";
import { useMotionValue } from "motion/react";
import { useState, useCallback, useRef } from "react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

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

        <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
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
