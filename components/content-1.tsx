import Image from 'next/image'

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">The AI productivity ecosystem that transforms how teams work.</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
                    <div className="relative mb-6 sm:mb-0">
                        <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                            <Image src="/payments.png" className="hidden rounded-[15px] dark:block" alt="payments illustration dark" width={1207} height={929} />
                            <Image src="/payments-light.png" className="rounded-[15px] shadow dark:hidden" alt="payments illustration light" width={1207} height={929} />
                        </div>
                    </div>

                    <div className="relative space-y-4">
                        <p className="text-muted-foreground">
                            Our platform is more than just tools. <span className="text-accent-foreground font-bold">It's an intelligent ecosystem</span> — from AI assistants to automated workflows helping teams achieve unprecedented productivity.
                        </p>
                        <p className="text-muted-foreground">Our AI-powered platform integrates seamlessly with your workflow, providing intelligent automation, predictive insights, and collaborative tools that empower your team to work smarter, not harder.</p>

                        <div className="pt-6">
                            <blockquote className="border-l-4 pl-4">
                                <p>Using AI-powered productivity tools has transformed our team's efficiency. The intelligent automation and insights have reduced our workload while increasing output quality dramatically.</p>

                                <div className="mt-6 space-y-3">
                                    <cite className="block font-medium">Sarah Chen, Head of Operations</cite>
                                    <img className="h-5 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/nvidia.svg" alt="Nvidia Logo" height="20" width="auto" />
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
