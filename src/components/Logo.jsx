export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#A84E22" />
      <g fill="none" stroke="#FBF8F3" strokeWidth="3.2" strokeLinejoin="round">
        <rect x="17" y="17" width="30" height="30" />
        <rect x="17" y="17" width="30" height="30" transform="rotate(45 32 32)" />
      </g>
      <circle cx="32" cy="32" r="4.5" fill="#FBF8F3" />
    </svg>
  )
}

export default function Logo({ light = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className={`font-serif text-[1.35rem] font-semibold leading-none tracking-[-0.01em] ${light ? 'text-paper' : 'text-ink-900'}`}>
        Sahara <span className="italic font-normal">Guides</span>
      </span>
    </span>
  )
}
