'use client'

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="btn-outline not-prose"
      onClick={() => {
        try {
          localStorage.removeItem('sg-consent')
        } catch {}
        window.dispatchEvent(new Event('sg-open-consent'))
      }}
    >
      Change cookie settings
    </button>
  )
}
