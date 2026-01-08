import { BlogSection } from "@/components/blog";
import { UserBlogsSection } from "@/components/user-blogs-section";
import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";

export default function Page() {
    return (
        <div className="bg-black min-h-screen text-white selection:bg-primary/30">
            <HeroHeader />
            <main className="pt-20">
                <UserBlogsSection title="Community Blogs" showCreateButton={true} />
                <BlogSection />
            </main>
            <FooterSection />
        </div>
    );
}
