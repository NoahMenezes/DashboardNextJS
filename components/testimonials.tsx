"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardPattern } from "@/components/ui/evervault-card";
import { motion, useMotionValue } from "motion/react";
import { useState, useCallback, useRef } from "react";

interface Testimonial {
  image: string;
  title: string;
  subtitle: string;
  handle: string;
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
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      title: "Sarah Chen",
      subtitle: "Product Manager",
      handle: "@SarahC",
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      title: "Marcus Rodriguez",
      subtitle: "Frontend Dev",
      handle: "@MarcusDev",
    },
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      title: "Emma Wilson",
      subtitle: "Designer",
      handle: "@EmmaW",
    },
    {
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      title: "David Kim",
      subtitle: "CTO",
      handle: "@DavidK",
    },
    {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      title: "Anna Martinez",
      subtitle: "Lead Designer",
      handle: "@AnnaM",
    },
    {
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      title: "James Wilson",
      subtitle: "DevOps Engineer",
      handle: "@JamesOps",
    },
    {
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&q=80",
      title: "Sofia Davis",
      subtitle: "Product Owner",
      handle: "@SofiaProduct",
    },
    {
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
      title: "Daniel Taylor",
      subtitle: "Backend Dev",
      handle: "@DanT",
    },
    {
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      title: "Olivia Brown",
      subtitle: "UX Researcher",
      handle: "@OliviaUX",
    },
    {
      image: "https://images.unsplash.com/photo-1522075469751-3a3694c60e9e?auto=format&fit=crop&w=150&q=80",
      title: "Lucas White",
      subtitle: "Full Stack Dev",
      handle: "@LucasDev",
    },
    {
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      title: "Emily Clarke",
      subtitle: "QA Engineer",
      handle: "@EmilyQA",
    },
    {
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=150&q=80",
      title: "Michael Lee",
      subtitle: "System Architect",
      handle: "@MikeArch",
    },
    {
      image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&w=150&q=80",
      title: "Rachel Green",
      subtitle: "Frontend Lead",
      handle: "@RachelFront",
    },
    {
      image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=150&q=80",
      title: "Chris Evans",
      subtitle: "Security Analyst",
      handle: "@ChrisSec",
    },
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      title: "Jessica Day",
      subtitle: "Data Scientist",
      handle: "@JessData",
    },
    {
      image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=150&q=80",
      title: "Mark Stone",
      subtitle: "Mobile Dev",
      handle: "@MarkMob",
    },
    {
      image: "https://images.unsplash.com/photo-1534751516054-033740e94620?auto=format&fit=crop&w=150&q=80",
      title: "Laura Bell",
      subtitle: "Content Strategist",
      handle: "@LauraContent",
    },
    {
      image: "https://images.unsplash.com/photo-1521119989659-a83eee488058?auto=format&fit=crop&w=150&q=80",
      title: "Kevin Hart",
      subtitle: "Cloud Engineer",
      handle: "@KevinCloud",
    },
    {
      image: "https://images.unsplash.com/photo-1560250097-929382221603?auto=format&fit=crop&w=150&q=80",
      title: "Samantha Jones",
      subtitle: "Marketing Lead",
      handle: "@SamMarket",
    },
    {
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=150&q=80",
      title: "Tom Holland",
      subtitle: "Software Engineer",
      handle: "@TomSoft",
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

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
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
