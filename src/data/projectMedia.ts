export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const projectMedia: Record<string, ProjectImage[]> = {
  aqilizer: [
    {
      src: "aqilizer.jpg",
      alt: "Full AqiLizer mobile screen with air-quality route, destination fields and navigation controls",
      caption: "AqiLizer · pollution-aware route planning",
      width: 1080,
      height: 2400,
    },
  ],
  zen: [
    {
      src: "zenhospitality.jpg",
      alt: "Zen World Hospitality website showing its travel landing page and packages",
      caption: "Zenhospitality · production travel website",
      width: 1376,
      height: 768,
    },
  ],
  mehendi: [
    {
      src: "IMG_2489.png",
      alt: "Full mobile screenshot of Magic Mehendi Art by Punam",
      caption: "Magic Mehendi Art · mobile booking and portfolio",
      width: 1179,
      height: 2414,
    },
  ],
  conquest: [
    {
      src: "projects/kjsim-award-3.jpg",
      alt: "Give Teas thermal monitoring dashboard showing a selected source, satellite view and incident information",
      caption: "Give Teas · thermal-source monitoring dashboard",
      width: 800,
      height: 461,
    },
    {
      src: "projects/kjsim-award-2.jpg",
      alt: "The team receiving the runner-up award at KJSIM Smart India Hackathon Pre-qualifiers on 23 September 2026",
      caption: "Runner-Up · KJSIM Hackathon 2026 · 23 September",
      width: 800,
      height: 600,
    },
    {
      src: "projects/kjsim-award-1.jpg",
      alt: "Give Teas source-inspection presentation showing a gas-flare classification and estimated emissions",
      caption: "Give Teas · source inspection and estimated impact",
      width: 800,
      height: 450,
    },
    {
      src: "projects/kjsim-award-4.jpg",
      alt: "Before and after maps from the hackathon presentation showing thermal detections and classified sources across India",
      caption: "Give Teas · detections before and after classification",
      width: 800,
      height: 827,
    },
  ],
  zeu: [
    {
      src: "nexkirana.png",
      alt: "Zeu, formerly NexKirana, customer-support demonstration interface",
      caption: "Zeu / NexKirana · AI support interface",
      width: 2478,
      height: 1315,
    },
  ],
  ocean: [
    {
      src: "bi-dashboard.png",
      alt: "Ocean Suites Power BI dashboard with revenue and booking analytics",
      caption: "Ocean Suites · Power BI revenue analysis",
      width: 1977,
      height: 1105,
    },
  ],
  savvy: [
    {
      src: "dexedge.jfif",
      alt: "DxEDGE consultancy project image from the original portfolio",
      caption: "SavvyDigitech · CII DxEDGE consultancy",
      width: 1000,
      height: 451,
    },
  ],
};

export const assetUrl = (src: string) =>
  `${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`;
