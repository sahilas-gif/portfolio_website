import { useId } from "react";
const clusters = [
  { x: 117, y: 112, color: "#f3d484", label: "GAS FLARE" },
  { x: 269, y: 162, color: "#68b8f8", label: "INDUSTRIAL" },
  { x: 198, y: 271, color: "#ed9b8e", label: "REVIEW" },
];
export default function ThermalMap({ stage = 3 }: { stage?: number }) {
  const gridId = useId();
  return (
    <svg
      viewBox="0 0 420 360"
      className="thermal-map"
      role="img"
      aria-label={`Illustrative thermal pipeline: ${["raw detections", "spatial clusters", "infrastructure context", "classification results"][stage]}. Not live satellite data.`}
    >
      <defs>
        <pattern
          id={gridId}
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M28 0H0v28"
            fill="none"
            stroke="#c5a059"
            strokeOpacity=".1"
            strokeWidth=".6"
          />
        </pattern>
      </defs>
      <rect width="420" height="360" fill="#0c0d0e" />
      <rect width="420" height="360" fill={`url(#${gridId})`} />
      <g stroke="#5b594f" fill="none" strokeWidth=".7" opacity=".5">
        <path d="M0 189C45 154 27 101 98 104s46-55 111-26 90 1 109-40 55-36 102-27M0 210c55-45 42-88 99-86s47-61 110-27 87 6 124-45 65-28 87-24M0 248c81-56 69-73 140-55s76-7 115-56 134-48 165-80M0 275c61-5 106-76 166-53s66-38 122-50 91-51 132-63M6 360c58-66 73-89 138-82s99-33 146-29 77-71 130-56M43 360c78-75 93-68 146-50s77-43 117-35 72-29 114-19" />
      </g>
      {stage >= 2 && (
        <g fill="none" stroke="#8c8571" strokeWidth="1" strokeDasharray="3 4">
          <path d="M117 112l48 60 104-10-71 109" />
          <path d="M156 163h18v18h-18zM306 192h20v15h-20zM248 81h15v21h-15z" />
        </g>
      )}
      {clusters.map((cluster, index) => (
        <g key={cluster.label}>
          {stage >= 1 && (
            <>
              <circle
                cx={cluster.x}
                cy={cluster.y}
                r={30 + index * 3}
                fill={cluster.color}
                fillOpacity=".045"
                stroke={cluster.color}
                strokeOpacity=".3"
                strokeDasharray="3 5"
              />
              <circle
                cx={cluster.x}
                cy={cluster.y}
                r="5"
                fill={cluster.color}
              />
            </>
          )}
          {Array.from({ length: 8 }, (_, i) => (
            <circle
              key={i}
              cx={cluster.x + Math.sin(i * 2.1) * (12 + i * 2)}
              cy={cluster.y + Math.cos(i * 1.8) * (12 + i * 2)}
              r={stage === 0 ? 2.5 : 1.7}
              fill={stage === 0 ? "#c5a059" : cluster.color}
              opacity=".8"
            />
          ))}
          {stage === 3 && (
            <g>
              <path
                d={`M${cluster.x + 8} ${cluster.y - 8}l25-25h55`}
                stroke={cluster.color}
                strokeOpacity=".5"
              />
              <text
                x={cluster.x + 36}
                y={cluster.y - 39}
                fill={cluster.color}
                fontFamily="monospace"
                fontSize="9"
                letterSpacing="1"
              >
                {cluster.label}
              </text>
            </g>
          )}
        </g>
      ))}
      <g fill="#aaa7a0" fontFamily="monospace" fontSize="9" letterSpacing="1">
        <text x="16" y="23">
          THERMAL SOURCE INTELLIGENCE
        </text>
        <text x="16" y="342">
          SCHEMATIC / NOT LIVE DATA
        </text>
        <text x="358" y="23">
          N ↑
        </text>
      </g>
    </svg>
  );
}
