import { ShieldCheck, Zap, Users, Globe } from "lucide-react";

export default function Faqs4() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      description:
        "Bank-grade security standards with SOC2 compliance and end-to-end encryption for all your data.",
    },
    {
      icon: Zap,
      title: "High Performance",
      description:
        "Optimized for low-latency inference with edge caching and global distribution.",
    },
    {
      icon: Users,
      title: "Team Management",
      description:
        "Granular access controls and audit logs to manage your team's access securely.",
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description:
        "Deployed across 35+ regions worldwide to ensure the best performance for your users.",
    },
  ];

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6 space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
             Why developers choose Lyra
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We handle the infrastructure so you can focus on building great products.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-muted/30 rounded-xl p-6 space-y-3 border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
