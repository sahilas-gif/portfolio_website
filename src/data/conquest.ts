export const conquest = {
  title: "Give Teas",
  award: "Runner-Up",
  event: "KJSIM Hackathon 2026",
  qualifier: "Smart India Hackathon Pre-qualifiers",
  date: "23 September 2026",
  problem: "SIH PS 26162 · Disaster Management",
  repo: "https://github.com/akkisavi/Hackathon",
  revision: "db4785bdfa17204cf9f7d1f237e8799456923b19",
  evidence:
    "https://www.linkedin.com/posts/sahil-singh-88aab7395_kjsim-sih2026-smartindiahackathon-activity-7509290257385881600-7AVk",
  // Set only to a verified public deployment. The embedded walkthrough is illustrative.
  liveDemo: null as string | null,
  team: [
    { name: "Akshay Gosavi", url: "https://www.linkedin.com/in/agosavi621/" },
    {
      name: "Akshay Patil",
      url: "https://www.linkedin.com/in/akshay-patil-123b4b242/",
    },
    {
      name: "Umesh Menariya",
      url: "https://www.linkedin.com/in/umesh-menariya-097428227/",
    },
    {
      name: "Priyanka Shinde",
      url: "https://www.linkedin.com/in/priyankashinde30/",
    },
    {
      name: "Dhiraj Nimje",
      url: "https://www.linkedin.com/in/dhiraj-nimje-bb822139b/",
    },
  ],
};
export const pipelineStages = [
  {
    title: "NASA FIRMS",
    label: "01 / INGEST",
    file: "backend/app/ingestion/firms_client.py",
    description:
      "Normalize VIIRS satellite detections into coordinates, acquisition time, brightness and fire radiative power. A hot pixel is an observation, not yet an incident.",
    result: "thermal pixels → normalized detections",
  },
  {
    title: "DBSCAN",
    label: "02 / CLUSTER",
    file: "backend/app/processing/clustering.py",
    description:
      "Group detections with a haversine-distance neighborhood of about one kilometer. Summarize persistence, day/night activity, intensity and footprint for each source.",
    result: "repeated detections → persistent sources",
  },
  {
    title: "PostGIS",
    label: "03 / CONTEXT",
    file: "backend/app/processing/features.py",
    description:
      "Join sources to OpenStreetMap infrastructure, reference flares and land-cover context. Proximity and temporal behavior become features for classification.",
    result: "source history + spatial context → features",
  },
  {
    title: "LightGBM",
    label: "04 / CLASSIFY",
    file: "backend/app/processing/classify.py",
    description:
      "A rule engine handles obvious patterns; LightGBM uses weak labels for classification. Isolation Forest then flags persistent sources with no matching facility record.",
    result: "features → class + rationale + anomaly flag",
  },
];
