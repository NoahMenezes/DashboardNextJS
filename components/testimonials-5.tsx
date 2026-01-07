"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardPattern } from "@/components/ui/evervault-card";
import { motion, useMotionValue } from "motion/react";
import { useState, useCallback, useRef } from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

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
    {
      name: "Robert Taylor",
      role: "Director of Product",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      quote:
        "The analytics dashboard is intuitive and provides exactly the data we need to make informed decisions.",
      rating: 5,
    },
    {
      name: "Jennifer Wu",
      role: "Senior Developer",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      quote:
        "The code generation capabilities are impressive. It saves us hours of boilerplate coding every week.",
      rating: 5,
    },
    {
      name: "Thomas Lee",
      role: "Engineering Manager",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      quote:
        "Seamless deployment and scaling. We've had zero downtime since migrating our core services.",
      rating: 5,
    },
    {
      name: "Amanda Clarke",
      role: "Chief Operations Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      quote:
        "The AI-powered automation has revolutionized our operations. Tasks that took hours now complete in minutes.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Product Designer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      quote:
        "The interface is so intuitive. Our team was productive from day one without any training needed.",
      rating: 5,
    },
    {
      name: "Sofia Martinez",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      quote:
        "The predictive analytics features are groundbreaking. We can now anticipate issues before they occur.",
      rating: 5,
    },
    {
      name: "Daniel Cooper",
      role: "VP of Technology",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      quote:
        "Best investment we've made this year. The ROI was evident within the first month of implementation.",
      rating: 5,
    },
    {
      name: "Rachel Green",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      quote:
        "Customer support is exceptional. Every question we've had was answered within minutes.",
      rating: 5,
    },
    {
      name: "Kevin Patel",
      role: "Tech Lead",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      quote:
        "The AI recommendations have helped us optimize our workflow efficiency by over 60%.",
      rating: 5,
    },
    {
      name: "Nina Rossi",
      role: "Business Analyst",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      quote:
        "Real-time collaboration features make working with distributed teams feel effortless.",
      rating: 5,
    },
    {
      name: "Alex Thompson",
      role: "Solutions Architect",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      quote:
        "The platform integrates seamlessly with all our existing tools. No disruption to our workflow.",
      rating: 5,
    },
    {
      name: "Victoria Chen",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      quote:
        "Project tracking and resource allocation has never been easier. Our delivery times improved by 40%.",
      rating: 5,
    },
    {
      name: "Brian Foster",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
      quote:
        "Enterprise-grade security with startup-level simplicity. Exactly what we needed for our growing company.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl space-y-12 px-6">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Trusted by teams worldwide for AI productivity
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how AI-powered productivity tools are transforming workflows
            for teams and individuals across the globe
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
               <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
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
