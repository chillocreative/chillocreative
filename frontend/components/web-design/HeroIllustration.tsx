const HeroIllustration = () => {
  return (
    <svg
      viewBox="0 0 560 480"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-[0_0_40px_rgba(168,85,247,0.25)]"
      role="img"
      aria-label="Ilustrasi website berprestasi tinggi dengan graf pertumbuhan"
    >
      <defs>
        <linearGradient id="wd-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#db2777" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="wd-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b0b22" />
          <stop offset="100%" stopColor="#1a1a3a" />
        </linearGradient>
        <linearGradient id="wd-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="wd-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="90" r="80" fill="url(#wd-bg)" />
      <circle cx="480" cy="380" r="110" fill="url(#wd-bg)" />

      <rect x="60" y="70" width="440" height="280" rx="18" fill="url(#wd-screen)" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="2" />
      <rect x="60" y="70" width="440" height="32" rx="18" fill="#0f0f26" />
      <circle cx="84" cy="86" r="5" fill="#ef4444" />
      <circle cx="104" cy="86" r="5" fill="#f59e0b" />
      <circle cx="124" cy="86" r="5" fill="#10b981" />
      <rect x="220" y="78" width="200" height="16" rx="8" fill="#ffffff" fillOpacity="0.06" />

      <rect x="84" y="124" width="160" height="14" rx="7" fill="#ffffff" fillOpacity="0.9" />
      <rect x="84" y="148" width="220" height="8" rx="4" fill="#ffffff" fillOpacity="0.4" />
      <rect x="84" y="164" width="180" height="8" rx="4" fill="#ffffff" fillOpacity="0.4" />
      <rect x="84" y="192" width="120" height="32" rx="16" fill="url(#wd-line)" />

      <rect x="320" y="124" width="160" height="180" rx="12" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.08" />
      <rect x="336" y="254" width="20" height="40" rx="4" fill="url(#wd-bar)" opacity="0.55" />
      <rect x="362" y="234" width="20" height="60" rx="4" fill="url(#wd-bar)" opacity="0.7" />
      <rect x="388" y="214" width="20" height="80" rx="4" fill="url(#wd-bar)" opacity="0.85" />
      <rect x="414" y="184" width="20" height="110" rx="4" fill="url(#wd-bar)" />
      <rect x="440" y="164" width="20" height="130" rx="4" fill="url(#wd-bar)" />
      <path d="M 340 270 L 374 240 L 400 220 L 424 200 L 450 180" stroke="#fff" strokeWidth="2" fill="none" opacity="0.55" strokeLinecap="round" />

      <rect x="84" y="248" width="220" height="56" rx="10" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.08" />
      <circle cx="110" cy="276" r="14" fill="url(#wd-line)" />
      <rect x="132" y="264" width="120" height="8" rx="4" fill="#ffffff" fillOpacity="0.5" />
      <rect x="132" y="280" width="80" height="6" rx="3" fill="#ffffff" fillOpacity="0.3" />

      <rect x="150" y="350" width="260" height="18" rx="6" fill="#0b0b22" stroke="#ffffff" strokeOpacity="0.08" />
      <rect x="145" y="366" width="270" height="6" rx="2" fill="#050511" />

      <g transform="translate(430 60)">
        <circle r="38" fill="#0b0b22" stroke="#ffffff" strokeOpacity="0.12" />
        <path d="M -14 4 L -4 14 L 16 -10" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      <g transform="translate(60 360)" opacity="0.9">
        <circle r="26" fill="url(#wd-line)" />
        <path d="M -8 0 L 0 -8 L 8 0 M 0 -8 L 0 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
};

export default HeroIllustration;
