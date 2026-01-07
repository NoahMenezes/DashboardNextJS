import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Testimonials() {
    const testimonials = [
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
        }
    ];

    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-4xl font-medium lg:text-5xl">Build by makers, loved by thousand developers</h2>
                    <p>Gemini is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border-border hover:border-primary transition-colors">
                            <CardHeader>
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={testimonial.image} alt={testimonial.title} />
                                    <AvatarFallback>{testimonial.title.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <h3 className="font-semibold">{testimonial.title}</h3>
                                <p className="text-sm text-muted-foreground">{testimonial.subtitle}</p>
                                <p className="text-sm text-primary">{testimonial.handle}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
