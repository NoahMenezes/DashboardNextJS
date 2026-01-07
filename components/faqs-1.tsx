"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faqs1() {
  const faqs = [
    {
      question: "What makes Lyra different from other AI platforms?",
      answer:
        "Lyra is built with a focus on developer experience and scalability. We offer a comprehensive ecosystem of tools, from pre-trained models to deployment infrastructure, all designed to work seamlessly together.",
    },
    {
      question: "How does the pricing model work?",
      answer:
        "We offer a flexible pay-as-you-go model for all our services. You only pay for the compute and storage you actually use. We also have volume discounts for enterprise customers.",
    },
    {
      question: "Is my data secure with Lyra?",
      answer:
        "Security is our top priority. We use enterprise-grade encryption for data at rest and in transit. We are also SOC 2 Type II compliant and offer advanced access controls.",
    },
    {
      question: "Can I fine-tune the models?",
      answer:
        "Yes! Lyra provides easy-to-use APIs for fine-tuning our base models on your own proprietary data, allowing you to create custom AI solutions for your specific needs.",
    },
  ];

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-3xl space-y-8 px-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about the product and billing.
          </p>
        </div>
        <div className="mx-auto mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
