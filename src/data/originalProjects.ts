// Original portfolio case studies retained during the redesign.
export type ProjectDetail = {
  challenge: string;
  solution: string;
  features: string[];
  impact: string;
};

export type Project = {
  name: string;
  description: string;
  tags: string[];
  image: string;
  details: ProjectDetail;
  orientation?: "vertical" | "horizontal";
  githubUrl?: string;
  liveUrl?: string;
};

export const originalProjects: Project[] = [
  {
    name: "AqiLizer",
    description:
      "I built a mobile application that actively routes users along the healthiest path possible. By bringing in real time Google Air Quality and Directions data, the app helps athletes and pedestrians avoid harmful urban air pollution.",
    tags: ["Flutter", "Spring Boot", "PostgreSQL"],
    image: "/aqilizer.jpg",
    details: {
      challenge:
        "Athletes and pedestrians face constant exposure to harmful urban air pollution, and this is made worse by GPS inaccuracies in dense cities known as the urban canyon effect.",
      solution:
        "Instead of just finding the shortest route, I architected a mobile app that dynamically routes users along the healthiest path by using advanced geographical filtering algorithms.",
      features: [
        "Brought in Google Air Quality and Directions data using Polyline Sampling and asynchronous batching.",
        "Engineered Polyline Decimation so the mobile map renders at a smooth 60 frames per second even with thousands of coordinates.",
        "Used mathematical GPS Kalman Filtering to predict user movement and smooth out annoying hardware signal glitches.",
      ],
      impact:
        "Successfully eliminated rate limit exhaustion, keeping turn by turn tracking completely stable while providing accurate, pollution aware navigation.",
    },
    orientation: "vertical",
  },
  {
    name: "Zenhospitality.in",
    description:
      "I deployed a production FastAPI and React app on cPanel shared hosting, wiring up a2wsgi middleware and custom .htaccess rewrite rules to route /api requests to Python WSGI while preserving SPA client routing. The platform features Gemini AI powered itinerary generation, streaming chat, and a full admin portal with JWT authentication.",
    tags: [
      "React 19",
      "FastAPI",
      "Python",
      "SQLAlchemy 2.0",
      "Gemini AI",
      "LiteSpeed",
    ],
    image: "/zenhospitality.jpg",
    liveUrl: "https://zenhospitality.in/",
    githubUrl: "https://github.com/sahilas-gif/Zenhospitality",
    details: {
      challenge:
        "Deploying a modern async Python backend (FastAPI with ASGI) on traditional cPanel shared hosting with LiteSpeed was the core problem. Standard WSGI adapters broke ASGI coroutines, the Passenger runner expected synchronous apps, and SQLite with async drivers needed absolute path resolution to avoid cold start failures.",
      solution:
        "I bridged the ASGI/WSGI gap using a2wsgi middleware inside passenger_wsgi.py, configured .htaccess to split /api traffic to the Python backend while all other routes fall through to the React SPA index.html, and built an async database layer with SQLAlchemy 2.0 and aiosqlite using absolute paths with auto-creation and data seeding handlers.",
      features: [
        "Integrated Gemini AI with an automated 3-tier fallback chain (gemini-3.6-flash, gemini-2.5-pro, gemini-3.5-flash) for itinerary generation and streaming chat, keeping the service up during model rate limits.",
        "Implemented JWT authentication using HttpOnly cookies and Axios interceptors for silent token refresh, securing admin routes for package management and enquiry listings without relying on external auth providers.",
        "Built a full admin portal with package CRUD, enquiry management, image uploads, and a branding system featuring a gold monogram on dark green across SVG, PNG, JPG, and ICO formats.",
      ],
      impact:
        "Successfully shipped a production full-stack AI travel platform on budget shared hosting, with zero-downtime deploys, resilient AI failover, and a complete admin workflow for the business owner.",
    },
    orientation: "horizontal",
  },
  {
    name: "Magic Mehendi Art by Punam",
    description:
      "I built a full-stack web application for a local Mehendi business to digitize client bookings and showcase a high-resolution design portfolio. By combining automated SMS notifications with a mobile-first image optimization pipeline, the platform eliminates booking lead drops and delivers a fast, responsive user experience on smartphones.",
    tags: [
      "React",
      "Spring Boot",
      "PostgreSQL",
      "Twilio SDK",
      "Netlify",
      "Back4app",
    ],
    image: "/IMG_2489.png",
    liveUrl: "https://magicmehendiartbypunam.netlify.app",
    details: {
      challenge:
        "Managing client bookings via manual phone calls and Instagram DMs led to missed leads and delayed responses. Additionally, displaying over 50 uncompressed high-resolution images caused severe mobile WebKit memory crashes, high Cumulative Layout Shift (CLS), and slow load times on mobile devices.",
      solution:
        "Instead of relying on third-party social channels, I architected an end-to-end web platform featuring an automated multi-channel notification engine, a high-performance WebP media pipeline with lazy loading, and local SEO optimization targeting local search intent.",
      features: [
        "Automated Multi-Channel Notification Pipeline: Integrated the Twilio SMS SDK and JavaMail API into Spring Boot to trigger instant SMS and email alerts to the business owner the second a booking form is submitted.",
        "High-Performance Responsive Image Engine: Converted portfolio assets into dual-resolution WebP formats (400w/800w) with aspect-ratio skeleton placeholders, reducing image payload size by 50% and eliminating mobile browser layout shifts (0px CLS).",
        "Mobile-First UX & Local SEO Architecture: Engineered a strict 320px mobile-first layout with pagination (Load More) and structured JSON-LD Schema.org data to rank for high-intent local search queries across Mulund and Mumbai.",
      ],
      impact:
        "Reduced initial page load payload by 50%, achieved 0px Cumulative Layout Shift (CLS) on mobile WebKit, and automated 100% of client lead notifications.",
    },
    orientation: "vertical",
  },
  {
    name: "Zeu (formerly NexKirana)",
    description:
      "Built as a demonstration project for the Zeu startup. I started this project as an academic analysis to understand customer satisfaction when dealing with chatbots. We ended up building a live demonstration model that the NexKirana startup used for their customer service, backed by the RIDDL Incubator.",
    tags: ["Python", "Machine Learning", "React", "Gemini API"],
    image: "/nexkirana.png",
    githubUrl: "https://github.com/sahilas-gif/chatbot_in_marketing",
    liveUrl: "https://chatbot-in-marketing-1.onrender.com/",
    details: {
      challenge:
        "We started by analyzing MBA survey data regarding chatbot service recovery. We quickly found out that complex ensemble methods like Random Forest suffered from overfitting due to our small sample size of 34.",
      solution:
        "I pivoted to using Linear models like Ridge and Lasso Regression which proved highly robust. We built a machine learning pipeline that predicted Satisfaction, Frustration, and Problem Resolution, all combined to predict Repeat purchase intent.",
      features: [
        'Machine Learning: Our research showed that an "Unresolved but polite" interaction still heavily dictates customer loyalty.',
        "We integrated the Gemini model to enable deep thinking, discovering that fast but inaccurate answers deeply frustrated customers.",
        "Built an easy human transfer protocol. Research showed missing and late orders were easily solved by AI, but complex issues required human empathy.",
      ],
      impact:
        "The analytical phase resulted in a published academic research paper, a React based interactive demo, and a real world implementation for NexKirana with guidance from the RIDDL Incubator.",
    },
    orientation: "horizontal",
  },
  {
    name: "Ocean Suites",
    description:
      "The hotel owner handed over 12 months of raw bill register data. I engineered a data pipeline and built an interactive Power BI dashboard to figure out exactly where they were making money and where they were losing it.",
    tags: ["Power BI", "Python", "Data Analytics"],
    image: "/bi-dashboard.png",
    details: {
      challenge:
        "The challenge was digging through approximately 2.07 Crore in total revenue across 12 months to find actionable insights for Ocean Suites rather than just looking at messy Excel files.",
      solution:
        "I analyzed the data and uncovered three major findings: The Food and Beverage Gap, The B2B Goldmine, and The Executive Audience.",
      features: [
        'The F&B Gap: MakeMyTrip brought massive volume but the average food cart size was under ₹110. I suggested packaging "Breakfast Included" rates.',
        "The B2B Goldmine: Corporate channels like Carnival Support Services averaged ₹3,026 in F&B per booking. One corporate booking outspends 15 OTA bookings.",
        "The Executive Audience: Executive rooms showed a 36 percent higher food order value than standard rooms, highlighting the need for quick dial room service.",
      ],
      impact:
        "I presented these findings directly to the hotel owner, who immediately implemented the MakeMyTrip package recommendations we suggested to plug the revenue leaks.",
    },
    orientation: "horizontal",
  },
  {
    name: "Dx-EDGE",
    description:
      "I recently finished IT consultancy at Savvydigitech, part of the DxEDGE program run by CII, with support from NITI Aayog and AICTE. The basic idea: students get placed with actual companies to work on actual problems.",
    tags: ["IT Consultancy", "Digital Transformation", "MSME"],
    image: "/dexedge.jfif",
    details: {
      challenge:
        "There were no case studies or simulated scenarios. Savvydigitech handles ERP, IT Security, and Cloud Solutions. My task was to find where things were slowing down digitally.",
      solution:
        "I mapped out their digital workflows and proposed actionable solutions that could realistically be built and implemented by their team.",
      features: [
        "Worked on actual problems within a real corporate environment, stepping away from purely academic exercises.",
        "Analyzed digital bottlenecks across their Enterprise Resource Planning and Cloud Solution pipelines.",
        "Received invaluable mentorship from Dr. Naimesh Tugare Sir and Subhash Salvi Sir to keep the project focused and practical.",
      ],
      impact:
        "Successfully completed the consultancy, providing Savvydigitech with realistic proposals to improve their digital efficiency. I was given actual work to do and room to figure it out.",
    },
    orientation: "horizontal",
  },
];
