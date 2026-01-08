const { createClient } = require("@libsql/client");
const path = require("path");
const fs = require("fs");

require("dotenv").config({
  path: path.join(__dirname, "../../.env.local"),
});

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("Error: TURSO_DATABASE_URL is not defined");
  process.exit(1);
}

const db = createClient({
  url: url,
  authToken: authToken,
});

// Convert image to base64
function imageToBase64(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const ext = path.extname(imagePath).toLowerCase();
    const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
    return `data:${mimeType};base64,${base64Image}`;
  } catch (err) {
    console.error(`Error reading image ${imagePath}:`, err.message);
    return null;
  }
}

async function seedBlogs() {
  console.log("🌱 Seeding 5 new blog posts...\n");

  // Get the generated images
  const image1 = imageToBase64("C:/Users/Noah/.gemini/antigravity/brain/6f58e30f-e241-4e79-aa5f-9068f016e7c1/ai_productivity_blog_1767886271793.png");
  const image2 = imageToBase64("C:/Users/Noah/.gemini/antigravity/brain/6f58e30f-e241-4e79-aa5f-9068f016e7c1/software_development_blog_1767886293502.png");

  const blogs = [
    {
      title: "The Future of Work: AI and Productivity in 2026",
      category: "AI & Trends",
      date: "January 8, 2026",
      readTime: "6 min read",
      imageUrl: image1 || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
      content: `<h1>The Future of Work: AI and Productivity</h1>
      
<p>As we navigate through 2026, artificial intelligence has become an indispensable tool in the modern workplace. The landscape of productivity has transformed dramatically, with AI-powered assistants handling routine tasks and enabling humans to focus on creative and strategic work.</p>

<h2>Key Transformations</h2>

<p>AI integration has revolutionized how teams collaborate. Smart scheduling systems now optimize meeting times across global teams, while AI-driven project management tools predict bottlenecks before they occur. The result? A 40% increase in team productivity reported across various industries.</p>

<h2>The Human Element</h2>

<p>Despite technological advancement, the human touch remains irreplaceable. <strong>Emotional intelligence, creativity, and strategic thinking</strong> are more valuable than ever. AI serves as an amplifier of human capabilities, not a replacement.</p>

<p>Organizations that successfully blend AI with human expertise are seeing unprecedented growth. The future of work isn't about humans versus machines—it's about humans and machines working in harmony.</p>`
    },
    {
      title: "Mastering Modern Development: Best Practices for 2026",
      category: "Development",
      date: "January 7, 2026",
      readTime: "8 min read",
      imageUrl: image2 || "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80",
      content: `<h1>Mastering Modern Development</h1>

<p>Software development in 2026 demands a new set of skills and practices. The rapid evolution of frameworks, tools, and methodologies requires developers to stay constantly updated and adaptable.</p>

<h2>Essential Development Practices</h2>

<ul>
<li><strong>AI-Assisted Coding:</strong> AI code completion tools have become standard, increasing coding speed by 50%</li>
<li><strong>Microservices Architecture:</strong> Scalable, maintainable systems are the norm</li>
<li><strong>DevOps Culture:</strong> Breaking down silos between development and operations</li>
<li><strong>Security First:</strong> Building security into every stage of development</li>
</ul>

<h2>The Developer's Toolkit</h2>

<p>Modern developers leverage cloud-native technologies, containerization with Docker and Kubernetes, and CI/CD pipelines for seamless deployment. <em>Continuous learning</em> has become the most critical skill.</p>

<p>Version control with Git, automated testing frameworks, and collaborative code review practices ensure code quality and team synchronization. The goal is to ship faster while maintaining excellence.</p>

<h2>Looking Ahead</h2>

<p>The future of development lies in automation, AI augmentation, and human creativity working together. Those who embrace this change will thrive in the evolving tech landscape.</p>`
    },
    {
      title: "Digital Transformation: A Complete Guide for Businesses",
      category: "Technology",
      date: "January 6, 2026",
      readTime: "7 min read",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
      content: `<h1>Digital Transformation in the Modern Era</h1>

<p>Digital transformation is no longer optional—it's essential for business survival. Companies that successfully digitize their operations report 3x revenue growth compared to their traditional counterparts.</p>

<h2>What is Digital Transformation?</h2>

<p>Digital transformation goes beyond simply adopting new technology. It's a fundamental shift in how businesses operate, deliver value to customers, and compete in the market. It involves:</p>

<ul>
<li>Reimagining business processes with technology at the core</li>
<li>Creating data-driven decision-making cultures</li>
<li>Building seamless digital customer experiences</li>
<li>Empowering employees with modern tools</li>
</ul>

<h2>The Transformation Journey</h2>

<p><strong>Phase 1: Digital Foundation</strong> - Establishing cloud infrastructure, data systems, and basic automation.</p>

<p><strong>Phase 2: Digital Optimization</strong> - Streamlining processes, implementing AI/ML solutions, and enhancing customer touchpoints.</p>

<p><strong>Phase 3: Digital Innovation</strong> - Creating new business models, products, and services powered by digital technologies.</p>

<h2>Success Factors</h2>

<p>Leadership commitment, employee buy-in, and customer-centric approach are critical. Organizations must balance innovation with stability, ensuring continuous improvement while maintaining core operations.</p>`
    },
    {
      title: "AI Revolution: How Machine Learning is Reshaping Industries",
      category: "AI & Trends",
      date: "January 5, 2026",
      readTime: "9 min read",
      imageUrl: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1200&q=80",
      content: `<h1>The AI Revolution is Here</h1>

<p>Machine learning has moved from experimental technology to mainstream business tool. From healthcare to finance, AI is transforming how industries operate and deliver value.</p>

<h2>Industry Impact</h2>

<p><strong>Healthcare:</strong> AI-powered diagnostics achieve 95% accuracy in detecting diseases from medical imaging, enabling earlier treatment and better outcomes.</p>

<p><strong>Finance:</strong> Fraud detection systems process millions of transactions in real-time, identifying suspicious patterns humans would miss.</p>

<p><strong>Retail:</strong> Personalized recommendation engines drive 35% of all online sales, creating tailored shopping experiences.</p>

<h2>The Technology Behind the Revolution</h2>

<p>Modern AI systems leverage deep learning, natural language processing, and computer vision to solve complex problems. These technologies are becoming more accessible, with cloud-based AI services democratizing advanced capabilities.</p>

<blockquote>
"AI is not about replacing humans—it's about augmenting human intelligence and enabling us to solve problems previously thought impossible."
</blockquote>

<h2>Ethical Considerations</h2>

<p>With great power comes great responsibility. Organizations must prioritize:</p>
<ul>
<li>Data privacy and security</li>
<li>Algorithmic fairness and transparency</li>
<li>Responsible AI deployment</li>
<li>Human oversight and accountability</li>
</ul>

<p>The future of AI is bright, but it requires thoughtful implementation and continuous ethical evaluation.</p>`
    },
    {
      title: "UI/UX Design Trends Defining 2026",
      category: "Design",
      date: "January 4, 2026",
      readTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
      content: `<h1>Design Trends Shaping 2026</h1>

<p>User interface and experience design continues to evolve rapidly. Today's designs prioritize accessibility, personalization, and immersive experiences that blur the line between digital and physical.</p>

<h2>Top Design Trends</h2>

<p><strong>1. Neumorphism 2.0</strong> - Soft, tactile interfaces with enhanced depth and realism</p>

<p><strong>2. AI-Personalized Interfaces</strong> - Designs that adapt to individual user preferences and behaviors</p>

<p><strong>3. Micro-Interactions</strong> - Subtle animations that provide feedback and enhance user engagement</p>

<p><strong>4. Voice-First Design</strong> - Interfaces optimized for voice commands and conversational AI</p>

<p><strong>5. Inclusive Design</strong> - Universal accessibility as a fundamental requirement, not an afterthought</p>

<h2>The Power of Simplicity</h2>

<p>Despite advanced capabilities, the best designs remain <em>simple and intuitive</em>. Users shouldn't need instructions to navigate your interface. Clean layouts, clear typography, and purposeful white space create pleasant experiences.</p>

<h2>Mobile-First, Always</h2>

<p>With 75% of web traffic coming from mobile devices, mobile-first design isn't optional. Responsive layouts, touch-optimized interactions, and performance optimization for lower-powered devices are essential.</p>

<h2>The Future is Immersive</h2>

<p>AR and VR interfaces are moving mainstream. Designing for spatial computing requires new thinking about interaction patterns, visual hierarchies, and user comfort. The next generation of designers must be comfortable creating experiences across physical and digital realms.</p>

<p>Great design is invisible—it simply works. As we move forward, the fusion of aesthetics, functionality, and technology will continue to push boundaries and create magical user experiences.</p>`
    }
  ];

  try {
    for (const blog of blogs) {
      await db.execute({
        sql: `INSERT INTO blogs (title, category, date, read_time, image_url, content) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [blog.title, blog.category, blog.date, blog.readTime, blog.imageUrl, blog.content]
      });
      console.log(`✅ Added: "${blog.title}"`);
    }

    console.log("\n🎉 Successfully seeded 5 blog posts!");
    console.log("📊 Check your blog page at http://localhost:3000/blog\n");
  } catch (err) {
    console.error("❌ Error seeding blogs:", err);
  }
}

seedBlogs().then(() => process.exit(0));
