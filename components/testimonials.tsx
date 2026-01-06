import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ChromaGrid from './ui/chroma-grid'

export default function Testimonials() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-4xl font-medium lg:text-5xl">Build by makers, loved by thousand developers</h2>
                    <p>Gemini is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.</p>
                </div>

                <div style={{ height: '600px', position: 'relative' }}>
                    <ChromaGrid 
                        items={[
                            {
                                image: "https://tailus.io/images/reviews/shekinah.webp",
                                title: "Shekinah Tshiokufila",
                                subtitle: "Software Ingineer",
                                handle: "@Shekinah",
                                borderColor: "#3B82F6",
                                gradient: "linear-gradient(145deg, #3B82F6, #000)",
                                url: "https://twitter.com"
                            },
                             {
                                image: "https://tailus.io/images/reviews/jonathan.webp",
                                title: "Jonathan Yombo",
                                subtitle: "Software Ingineer",
                                handle: "@Jonathan",
                                borderColor: "#10B981",
                                gradient: "linear-gradient(180deg, #10B981, #000)",
                                url: "https://twitter.com"
                            },
                            {
                                image: "https://tailus.io/images/reviews/yucel.webp",
                                title: "Yucel Faruksahan",
                                subtitle: "Creator, Tailkits",
                                handle: "@Yucel",
                                borderColor: "#F59E0B",
                                gradient: "linear-gradient(165deg, #F59E0B, #000)",
                                url: "https://twitter.com"
                            },
                            {
                                image: "https://tailus.io/images/reviews/rodrigo.webp",
                                title: "Rodrigo Aguilar",
                                subtitle: "Creator, TailwindAwesome",
                                handle: "@Rodrigo",
                                borderColor: "#EF4444",
                                gradient: "linear-gradient(195deg, #EF4444, #000)",
                                url: "https://twitter.com"
                            }
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}
