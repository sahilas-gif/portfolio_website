/** Original vector engraving; no third-party game assets. */
export default function Bonfire() {
  return (
    <svg
      className="bonfire-art js-sword"
      viewBox="0 0 620 640"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ember-halo">
          <stop stopColor="#be7635" stopOpacity=".23" />
          <stop offset="1" stopColor="#be7635" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="blade"
          x1="296"
          y1="190"
          x2="332"
          y2="540"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#eee1bb" />
          <stop offset=".4" stopColor="#8d826a" />
          <stop offset="1" stopColor="#bc873e" />
        </linearGradient>
        <linearGradient
          id="flame"
          x1="315"
          y1="375"
          x2="315"
          y2="555"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f3d484" />
          <stop offset="1" stopColor="#8c1d18" stopOpacity=".1" />
        </linearGradient>
        <pattern id="etch" width="6" height="6" patternUnits="userSpaceOnUse">
          <path
            d="M0 6L6 0"
            stroke="#c5a059"
            strokeOpacity=".18"
            strokeWidth=".5"
          />
        </pattern>
      </defs>
      <circle cx="310" cy="335" r="288" fill="url(#ember-halo)" />
      <g stroke="#c5a059">
        <circle cx="310" cy="275" r="207" strokeOpacity=".12" />
        <circle
          cx="310"
          cy="275"
          r="188"
          strokeOpacity=".35"
          strokeWidth=".7"
        />
        <circle
          cx="310"
          cy="275"
          r="180"
          strokeOpacity=".15"
          strokeDasharray="1 11"
        />
        <circle cx="310" cy="275" r="129" strokeOpacity=".15" />
        <path
          d="M310 57v27M310 466v28M91 275h28M502 275h27M157 122l20 20M443 408l20 20M157 428l20-20M443 142l20-20"
          strokeOpacity=".5"
        />
        <path
          d="M310 84l133 231H177zM310 439L177 208h266z"
          strokeOpacity=".1"
        />
        <path d="M310 104v340M141 275h338" strokeOpacity=".09" />
        <path
          d="M306 49h8l-4 8zM306 502h8l-4-8zM78 271v8l8-4zM534 271v8l-8-4z"
          fill="#c5a059"
          stroke="none"
        />
      </g>
      <g opacity=".45" fill="#101113" stroke="#444138" strokeWidth=".7">
        <path d="M37 452l52-51 16 24 42-73 23 12 41-67 25 45 47 82 42-35 57-32 25 49 34-78 24 53 47 3 67 68v85H37z" />
        <path d="M55 474l66-28 39 12 78-55 35 28 63-33 86 39 48-20 86 60v48H55z" />
      </g>
      <ellipse
        cx="310"
        cy="536"
        rx="192"
        ry="25"
        stroke="#c5a059"
        strokeOpacity=".13"
      />
      <ellipse
        cx="310"
        cy="536"
        rx="156"
        ry="14"
        fill="url(#ember-halo)"
        stroke="#c5a059"
        strokeOpacity=".2"
      />
      <g fill="#1d1c1a" stroke="#786549" strokeWidth=".8">
        <path d="M205 537l35-25 29 7 27-10 31 9 31-15 39 22 29 11-74 17-98-4z" />
        <path d="M205 537l35-25 9 23 20-16 27 24 31-25 25 35 6-50 17 31 22-9" />
        <path
          d="M237 517l32-9 37 10 45-12 37 22-41 17-46-4-49 5z"
          fill="url(#etch)"
        />
      </g>
      <g className="bonfire-flame">
        <path
          d="M300 534c-78-49-46-98-55-133 42 33 11 58 48 76-17-46 42-68 30-120 66 77-9 109 24 152 4-30 28-36 30-61 20 44-12 78-45 87z"
          fill="url(#flame)"
          opacity=".65"
        />
        <path
          d="M292 529c-37-32-16-48-33-78 44 28 18 41 51 62-1-62 37-65 33-109 26 50-12 70-12 120"
          stroke="#dbab64"
          strokeOpacity=".6"
        />
      </g>
      <g transform="rotate(8 310 335)">
        <path d="M302 217h17l-2 242-8 37-8-37z" fill="url(#blade)" />
        <path
          d="M310 222v258M304 260l11 13-12 14 12 13-12 14 12 13-12 14 12 13-12 14 12 13-12 14"
          stroke="#292722"
          strokeWidth="1.5"
        />
        <path
          d="M266 213l7-8 28 8h19l28-8 7 8-14 11-25-4h-10l-25 4z"
          fill="#89734c"
          stroke="#d4b479"
        />
        <path d="M303 149h15v61h-15z" fill="#201d1a" stroke="#9f875f" />
        <path
          d="M304 153l12 7-12 7 12 7-12 7 12 7-12 7 12 7"
          stroke="#b79860"
        />
        <path
          d="M310 121l12 13-5 15h-13l-6-15z"
          fill="#5f5039"
          stroke="#d4b479"
        />
        <path d="M310 126v17M304 135h12" stroke="#e5c883" />
        <path
          d="M296 251c43 17 40 35 5 48s-32 27 13 43 24 27-11 40"
          stroke="#c5a059"
          strokeWidth="3"
        />
        <path
          d="M296 251c43 17 40 35 5 48s-32 27 13 43 24 27-11 40"
          stroke="#f3d484"
          strokeWidth=".7"
        />
      </g>
      <g fill="#f3d484" opacity=".7">
        <path d="M263 378h2v5h-2zM348 357h2v4h-2zM274 443h2v3h-2zM369 478h2v5h-2zM335 420h2v3h-2z" />
      </g>
      <g
        fill="#a89778"
        fontFamily="Georgia, serif"
        fontSize="10"
        letterSpacing="3"
      >
        <text x="302" y="39">
          I
        </text>
        <text x="552" y="280">
          II
        </text>
        <text x="295" y="590">
          III
        </text>
        <text x="46" y="280">
          IV
        </text>
      </g>
    </svg>
  );
}
