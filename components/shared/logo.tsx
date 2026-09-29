import { cn } from 'cn'

type LogoMarkProps = {
  className?: string
  /** tampilkan wordmark di samping mark */
  withWordmark?: boolean
  wordmarkClassName?: string
}

export function LogoMark({ className, withWordmark = false, wordmarkClassName }: LogoMarkProps) {
  return (
    <span className={cn('inline-flex items-center gap-3 select-none', className)}>
      {/* Emblem Muhammadiyah */}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="size-10 shrink-0 drop-shadow-xs"
      >
        {/* Lengkungan navy bawah */}
        <path d="M 22 92 A 46 46 0 0 0 98 92 A 48 48 0 0 1 22 92 Z" fill="#0D2B5C" />
        {/* 3 titik hijau di bagian paling bawah */}
        <circle cx="56" cy="112" r="2.5" fill="#007B3A" />
        <circle cx="60" cy="112" r="2.5" fill="#007B3A" />
        <circle cx="64" cy="112" r="2.5" fill="#007B3A" />

        {/* Tangkai Padi & Kapas */}
        <path d="M 18 56 C 18 34 35 16 60 16 C 85 16 102 34 102 56 C 102 76 86 92 60 94 C 34 92 18 76 18 56 Z" stroke="#007B3A" strokeWidth="2.5" fill="none" />
        <circle cx="60" cy="56" r="46" stroke="#007B3A" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />

        {/* Lingkaran hijau tengah (Matahari) */}
        <circle cx="60" cy="54" r="32" fill="#007B3A" />
        <circle cx="60" cy="54" r="32" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* 12 Sinar Utama Muhammadiyah */}
        <g fill="#FFFFFF">
          <polygon points="60,22 63.5,44 60,42.5 56.5,44" />
          <polygon points="60,22 63.5,44 60,42.5 56.5,44" transform="rotate(30 60 54)" />
          <polygon points="60,22 63.5,44 60,42.5 56.5,44" transform="rotate(60 60 54)" />
          <polygon points="60,22 63.5,44 60,42.5 56.5,44" transform="rotate(90 60 54)" />
          <polygon points="60,22 63.5,44 60,42.5 56.5,44" transform="rotate(120 60 54)" />
          <polygon points="60,22 63.5,44 60,42.5 56.5,44" transform="rotate(150 60 54)" />
          <polygon points="60,22 63.5,44 60,42.5 56.5,44" transform="rotate(180 60 54)" />
          <polygon points="60,22 63.5,44 60,42.5 56.5,44" transform="rotate(210 60 54)" />
          <polygon points="60,22 63.5,44 60,42.5 56.5,44" transform="rotate(240 60 54)" />
          <polygon points="60,22 63.5,44 60,42.5 56.5,44" transform="rotate(270 60 54)" />
          <polygon points="60,22 63.5,44 60,42.5 56.5,44" transform="rotate(300 60 54)" />
          <polygon points="60,22 63.5,44 60,42.5 56.5,44" transform="rotate(330 60 54)" />

          {/* Sinar Sekunder */}
          <polygon points="60,30 62,44 60,43 58,44" transform="rotate(15 60 54)" />
          <polygon points="60,30 62,44 60,43 58,44" transform="rotate(45 60 54)" />
          <polygon points="60,30 62,44 60,43 58,44" transform="rotate(75 60 54)" />
          <polygon points="60,30 62,44 60,43 58,44" transform="rotate(105 60 54)" />
          <polygon points="60,30 62,44 60,43 58,44" transform="rotate(135 60 54)" />
          <polygon points="60,30 62,44 60,43 58,44" transform="rotate(165 60 54)" />
          <polygon points="60,30 62,44 60,43 58,44" transform="rotate(195 60 54)" />
          <polygon points="60,30 62,44 60,43 58,44" transform="rotate(225 60 54)" />
          <polygon points="60,30 62,44 60,43 58,44" transform="rotate(255 60 54)" />
          <polygon points="60,30 62,44 60,43 58,44" transform="rotate(285 60 54)" />
          <polygon points="60,30 62,44 60,43 58,44" transform="rotate(315 60 54)" />
          <polygon points="60,30 62,44 60,43 58,44" transform="rotate(345 60 54)" />
        </g>

        {/* Lingkaran Kaligrafi Tengah */}
        <circle cx="60" cy="54" r="16" fill="#007B3A" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="60" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="serif">مُحَمَّدِيَّة</text>
      </svg>
      {withWordmark ? (
        <span className={cn('flex flex-col justify-center leading-tight', wordmarkClassName)}>
          <span className="font-serif text-lg font-bold tracking-[0.16em] text-[#0D2B5C] dark:text-white">
            SIBERMU
          </span>
          <span className="text-[0.55rem] font-medium tracking-[0.12em] text-[#0D2B5C]/80 uppercase dark:text-slate-300">
            Universitas Siber Muhammadiyah
          </span>
        </span>
      ) : null}
    </span>
  )
}

