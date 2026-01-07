const { db } = require('../db');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../../.env.local'),
  silent: true,
});

const newBlogs = [
  {
    title: "Transform Your Workflow with AI-Powered Automation in 2026",
    category: "Productivity",
    date: "January 7, 2026",
    readTime: "5 mins read",
    image: "https://ik.imagekit.io/demo/img/image1.jpg",
    content: "<h1>AI-Powered Automation</h1><p>Discover how artificial intelligence is revolutionizing productivity workflows and helping teams achieve more in less time...</p>"
  },
  {
    title: "Mastering Team Collaboration with AI Assistant Tools",
    category: "Team Productivity",
    date: "January 6, 2026",
    readTime: "6 mins read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>Team Collaboration</h1><p>Learn how AI-powered collaboration tools are transforming the way teams work together...</p>"
  },
  {
    title: "Unlock Data-Driven Insights with AI Analytics Platforms",
    category: "Analytics",
    date: "January 5, 2026",
    readTime: "7 mins read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>AI Analytics</h1><p>Explore how AI-powered analytics platforms provide actionable insights from complex data...</p>"
  },
  {
    title: "10 Productivity Hacks That Actually Work with AI",
    category: "Productivity Tips",
    date: "January 4, 2026",
    readTime: "4 mins read",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>Productivity Hacks</h1><p>Practical tips and tricks to boost your productivity using AI-powered tools...</p>"
  },
  {
    title: "The Remote Work Revolution: AI Tools for Distributed Teams",
    category: "Remote Work",
    date: "January 3, 2026",
    readTime: "6 mins read",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>Remote Work</h1><p>How AI-powered tools are making remote work more productive and engaging...</p>"
  },
  {
    title: "Your Personal AI Assistant: Getting Started Guide",
    category: "AI Technology",
    date: "January 2, 2026",
    readTime: "5 mins read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>AI Assistant</h1><p>A comprehensive guide to leveraging AI assistants for maximum productivity...</p>"
  },
  {
    title: "Streamline Your Processes with Intelligent Workflow Automation",
    category: "Automation",
    date: "December 31, 2025",
    readTime: "6 mins read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>Workflow Automation</h1><p>Discover how to automate repetitive tasks and optimize your workflows with AI...</p>"
  },
  {
    title: "Machine Learning for Productivity: A Practical Introduction",
    category: "AI & ML",
    date: "December 30, 2025",
    readTime: "8 mins read",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>Machine Learning</h1><p>Understanding how machine learning enhances productivity applications...</p>"
  },
  {
    title: "Smart Scheduling: Let AI Manage Your Calendar",
    category: "Time Management",
    date: "December 29, 2025",
    readTime: "5 mins read",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>Smart Scheduling</h1><p>How AI-powered scheduling tools optimize your time and meetings...</p>"
  },
  {
    title: "Tracking Performance with AI-Powered Analytics",
    category: "Performance",
    date: "December 28, 2025",
    readTime: "6 mins read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>Performance Tracking</h1><p>Leverage AI to track KPIs and improve team performance...</p>"
  },
  {
    title: "Cloud-Based AI Solutions for Modern Businesses",
    category: "Cloud Computing",
    date: "December 27, 2025",
    readTime: "7 mins read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>Cloud AI Solutions</h1><p>Exploring cloud-based AI platforms that drive business productivity...</p>"
  },
  {
    title: "AI-Powered Security: Protecting Your Productivity Data",
    category: "Security",
    date: "December 26, 2025",
    readTime: "6 mins read",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>AI Security</h1><p>How AI enhances cybersecurity for productivity platforms...</p>"
  },
  {
    title: "Mobile-First Productivity: AI Apps for On-the-Go Work",
    category: "Mobile Technology",
    date: "December 25, 2025",
    readTime: "5 mins read",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>Mobile Productivity</h1><p>The best AI-powered mobile apps to boost productivity anywhere...</p>"
  },
  {
    title: "The Future of Work: AI Trends Shaping 2026 and Beyond",
    category: "Future Trends",
    date: "December 24, 2025",
    readTime: "8 mins read",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>Future of Work</h1><p>Predictions and trends in AI-powered productivity for the coming years...</p>"
  },
  {
    title: "Smart Notifications: AI-Driven Priority Management",
    category: "Productivity",
    date: "December 23, 2025",
    readTime: "4 mins read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    content: "<h1>Smart Notifications</h1><p>How AI intelligently filters and prioritizes notifications to reduce distractions...</p>"
  }
];

async function addBlogs() {
  try {
    console.log('Adding new blog posts to the database...');
    
    for (const post of newBlogs) {
      await db.execute({
        sql: "INSERT INTO blogs (title, category, date, read_time, image_url, content) VALUES (?, ?, ?, ?, ?, ?)",
        args: [
          post.title,
          post.category,
          post.date,
          post.readTime,
          post.image,
          post.content
        ]
      });
      console.log(`Added: ${post.title}`);
    }
    
    console.log('\n✅ Successfully added 15 new blog posts!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error adding blogs:', err);
    process.exit(1);
  }
}

addBlogs();
