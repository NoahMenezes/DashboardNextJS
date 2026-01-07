"use client";

import { Badge } from "@/components/ui/badge";

export default function Faqs2() {
  return (
    <section className="py-16 md:py-32 bg-muted/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-4">
            <Badge variant="outline">Support</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              FAQs
            </h2>
            <p className="text-muted-foreground">
              Can&apos;t find the answer you&apos;re looking for? Reach out to our
              customer support team.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Contact Support &rarr;
            </a>
          </div>
          <div className="lg:col-span-2 grid gap-8 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">How do I get started?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sign up for an account and follow our quick start guide. We have documentation covering all SDKs and API endpoints.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">What integration options are available?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We offer SDKs for Python, Node.js, Go, and Ruby. You can also use our REST or GraphQL APIs directly.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Do you offer SLAs?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes, our Enterprise plan includes a 99.99% uptime SLA with financial backing.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Where is my data stored?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Data is stored in data centers located in the US, EU, and APAC regions. You can choose your preferred region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
