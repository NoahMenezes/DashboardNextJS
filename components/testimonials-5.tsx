"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardPattern } from "@/components/ui/evervault-card";
import { useMotionValue } from "motion/react";
import { useState, useCallback, useRef } from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

export default function Testimonials5() {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechCorp",
      image: "https://tailus.io/images/reviews/shekinah.webp",
      quote:
        "This platform has transformed how we manage our customer relationships. The AI-powered insights are game-changing.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      image: "https://tailus.io/images/reviews/jonathan.webp",
      quote:
        "Incredible user experience and powerful features. Our team productivity has increased by 40% since we started using this.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      image: "https://tailus.io/images/reviews/yucel.webp",
      quote:
        "The customization options are endless. We've been able to tailor everything to match our brand perfectly.",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "Software Architect",
      image: "https://tailus.io/images/reviews/rodrigo.webp",
      quote:
        "Outstanding performance and reliability. The API integration was seamless and the documentation is excellent.",
      rating: 5,
    },
    {
      name: "Lisa Anderson",
      role: "Startup Founder",
      image: "https://tailus.io/images/reviews/shekinah.webp",
      quote:
        "As a startup, we needed something that could scale with us. This solution exceeded all our expectations.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "CTO",
      image: "https://tailus.io/images/reviews/jonathan.webp",
      quote:
        "The security features and compliance tools give us peace of mind. Highly recommended for enterprise use.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl space-y-12 px-6">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Loved by thousands of developers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about their experience with our
            platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

  return (
    <Card
      className="border-border hover:border-primary transition-all duration-300 relative overflow-hidden group/card h-full"
      onMouseMove={onMouseMove}
    >
      <CardPattern
        mouseX={mouseX}
        mouseY={mouseY}
        randomString={randomString}
      />
      <CardContent className="p-6 space-y-4 relative z-10">
        <Quote className="h-8 w-8 text-primary opacity-50" />

        <p className="text-sm leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="flex items-center gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 fill-yellow-400"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
          <Avatar className="h-12 w-12">
            <AvatarImage src={testimonial.image} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-sm">{testimonial.name}</h4>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
