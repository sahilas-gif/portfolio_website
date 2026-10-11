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
      "I built a mobile app that routes people along the cleaner path. It pulls live Google Air Quality and Directions data so athletes and pedestrians can dodge the worst of the city air.",
    tags: ["Flutter", "Spring Boot", "PostgreSQL"],
    image: "/aqilizer.jpg",
    details: {
      challenge:
        "People walking or training in a dense city breathe a lot of bad air. GPS also jumps around between tall buildings. That second problem is called the urban canyon effect.",
      solution:
        "The shortest route was the wrong question. I built the app to pick a healthier one, filtering the map with live air and directions data.",
      features: [
        "Pulled Google Air Quality and Directions with polyline sampling and async batches, so the app did not hammer the API on every point.",
        "Decimated the polyline so the map still held 60 frames per second with thousands of coordinates.",
        "Used a GPS Kalman filter to guess the next step and smooth out the phone's signal glitches.",
      ],
      impact:
        "The rate limits stopped getting exhausted. Turn-by-turn tracking stayed up, and the route still accounted for the air.",
    },
    orientation: "vertical",
  },
  {
    name: "Zenhospitality.in",
    description:
      "I put a FastAPI and React app on cPanel shared hosting. a2wsgi plus custom .htaccess rules send /api to Python and leave the rest of the routes for the React app. Guests get Gemini itineraries and a streaming chat. The owner gets an admin portal with JWT.",
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
        "FastAPI is async. This host is cPanel with LiteSpeed, and it wanted a normal WSGI app. The usual adapters broke the coroutines. Passenger expected a synchronous app. SQLite with the async driver also failed on cold start unless the database path was absolute.",
      solution:
        "I put a2wsgi inside passenger_wsgi.py so ASGI could run as WSGI. .htaccess sends /api to Python and everything else to the React index.html. The database is SQLAlchemy 2.0 with aiosqlite, absolute paths, and handlers that create the file and seed it if it is missing.",
      features: [
        "Gemini tries gemini-3.6-flash, then gemini-2.5-pro, then gemini-3.5-flash, for itineraries and streaming chat, so a rate limit on one model does not take the chat down.",
        "Admin login is JWT in HttpOnly cookies. Axios refreshes the token quietly. Package and enquiry screens stay locked without a third-party auth service.",
        "The admin can edit packages, read enquiries, and upload images. The mark is a gold monogram on dark green, exported as SVG, PNG, JPG, and ICO.",
      ],
      impact:
        "The travel site is live on cheap shared hosting. Deploys do not take it down, the AI model can fail over, and the owner can run packages and enquiries from the admin.",
    },
    orientation: "horizontal",
  },
  {
    name: "Magic Mehendi Art by Punam",
    description:
      "I built the site for a local mehendi business so bookings did not depend on phone calls and Instagram DMs. The owner gets an SMS when someone books. The design gallery is compressed so phones can actually open it.",
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
        "Bookings came in by phone and Instagram DM, so leads got missed. The gallery had more than 50 huge images. On phones that crashed WebKit, shoved the layout around, and took too long to load.",
      solution:
        "I moved bookings onto the site. Spring Boot sends SMS and email when a form comes in. Gallery photos are WebP, lazy loaded, and the page is written for local search in Mulund and Mumbai.",
      features: [
        "Twilio and JavaMail fire an SMS and an email to the owner as soon as someone submits the booking form.",
        "Each photo has a 400w and an 800w WebP, plus a skeleton that holds the aspect ratio. The image payload dropped by half, and layout shift on mobile went to 0px.",
        "The layout starts at 320px, the gallery uses Load More, and JSON-LD schema marks the business for local search in Mulund and Mumbai.",
      ],
      impact:
        "The first load is about half the weight it was. Mobile layout shift is 0px. Every booking form now pings the owner.",
    },
    orientation: "vertical",
  },
  {
    name: "Zeu (formerly NexKirana)",
    description:
      "This started as an MBA-side look at how people feel after a chatbot handles a complaint. It turned into a demo that NexKirana, later Zeu, used for customer service, with the RIDDL Incubator involved.",
    tags: ["Python", "Machine Learning", "React", "Gemini API"],
    image: "/nexkirana.png",
    githubUrl: "https://github.com/sahilas-gif/chatbot_in_marketing",
    liveUrl: "https://chatbot-in-marketing-1.onrender.com/",
    details: {
      challenge:
        "The data was an MBA survey on chatbot service recovery. Random Forest and the other ensemble models overfit. We only had 34 responses.",
      solution:
        "I switched to ridge and lasso. Those held up. The pipeline predicts satisfaction, frustration, and whether the problem got solved, then uses all three to predict whether the person would buy again.",
      features: [
        "An unresolved complaint that stayed polite still drove loyalty. That was the result that surprised us.",
        "Gemini is in the demo for longer replies. Fast wrong answers annoyed people more than slow ones.",
        "Missing and late orders were fine for the bot. Messier problems needed a person, so there is a plain handoff to a human.",
      ],
      impact:
        "That work became a published paper, a React demo, and a live setup for NexKirana, with the RIDDL Incubator on the startup side.",
    },
    orientation: "horizontal",
  },
  {
    name: "Ocean Suites",
    description:
      "The owner of Ocean Suites gave me 12 months of the bill register. I cleaned it and built a Power BI dashboard so we could see which bookings actually made money.",
    tags: ["Power BI", "Python", "Data Analytics"],
    image: "/bi-dashboard.png",
    details: {
      challenge:
        "About ₹2.07 crore of revenue sat in a year of Excel. The owner needed to know where food and room money was leaking, not another raw export.",
      solution:
        "I went through the bills and kept three findings: food spend by channel, what corporate bookings were worth, and how executive rooms ordered.",
      features: [
        'MakeMyTrip brought the volume, but the average food cart was under ₹110. I suggested a "Breakfast Included" rate.',
        "Carnival Support Services and similar corporate channels averaged ₹3,026 in food and beverage per booking. One of those outspent about 15 OTA bookings.",
        "Executive rooms ordered about 36 percent more food than standard rooms, so room service needed to be easy to reach.",
      ],
      impact:
        "I walked the owner through it. He put the MakeMyTrip breakfast package in place.",
    },
    orientation: "horizontal",
  },
  {
    name: "Dx-EDGE",
    description:
      "I finished an IT consultancy at Savvydigitech through DxEDGE, a CII program backed by NITI Aayog and AICTE. Students sit with a company and work on a problem they actually have.",
    tags: ["IT Consultancy", "Digital Transformation", "MSME"],
    image: "/dexedge.jfif",
    details: {
      challenge:
        "No case study, no fake brief. Savvydigitech does ERP, IT security, and cloud work. I had to find where their own digital work was getting stuck.",
      solution:
        "I mapped the workflows and wrote proposals their team could actually build.",
      features: [
        "The problems were the company's, not a classroom scenario.",
        "I looked for slow spots in their ERP and cloud pipelines.",
        "Dr. Naimesh Tugare Sir and Subhash Salvi Sir kept the work practical.",
      ],
      impact:
        "Savvydigitech got proposals they could implement. I had real work and room to figure it out.",
    },
    orientation: "horizontal",
  },
];
