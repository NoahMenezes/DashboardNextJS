"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardPattern } from "@/components/ui/evervault-card";
import { useMotionValue } from "motion/react";
import { useState, useCallback, useRef } from "react";

interface Testimonial {
  image: string;
  title: string;
  subtitle: string;
  handle: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      image: "https://tailus.io/images/reviews/shekinah.webp",
      title: "Shekinah Tshiokufila",
      subtitle: "Software Engineer",
      handle: "@Shekinah",
    },
    {
      image: "https://tailus.io/images/reviews/jonathan.webp",
      title: "Jonathan Yombo",
      subtitle: "Software Engineer",
      handle: "@Jonathan",
    },
    {
      image: "https://tailus.io/images/reviews/yucel.webp",
      title: "Yucel Faruksahan",
      subtitle: "Creator, Tailkits",
      handle: "@Yucel",
    },
    {
      image: "https://tailus.io/images/reviews/rodrigo.webp",
      title: "Rodrigo Aguilar",
      subtitle: "Creator, TailwindAwesome",
      handle: "@Rodrigo",
    },
  ];

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-4xl font-medium lg:text-5xl">
            Build by makers, loved by thousand developers
          </h2>
          <p>
            Gemini is evolving to be more than just the models. It supports an
            entire to the APIs and platforms helping developers and businesses
            innovate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");
  const lastUpdate = useRef(0);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);

      // Throttle random string generation to every 150ms to prevent memory issues
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

  return (
    <Card
      className="border-border hover:border-primary transition-colors relative overflow-hidden group/card"
      onMouseMove={onMouseMove}
    >
      <CardPattern
        mouseX={mouseX}
        mouseY={mouseY}
        randomString={randomString}
      />
      <CardHeader className="relative z-10">
        <Avatar className="h-16 w-16">
          <AvatarImage src={testimonial.image} alt={testimonial.title} />
          <AvatarFallback>{testimonial.title.charAt(0)}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="space-y-2 relative z-10">
        <h3 className="font-semibold">{testimonial.title}</h3>
        <p className="text-sm text-muted-foreground">{testimonial.subtitle}</p>
        <p className="text-sm text-primary">{testimonial.handle}</p>
      </CardContent>
    </Card>
  );
}
