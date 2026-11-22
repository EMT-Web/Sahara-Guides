/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBF8F3',
        sand: { 50: '#FAF6EF', 100: '#F4EDE2', 200: '#E9DDCB', 300: '#D9C6A8', 400: '#C4A77F', 500: '#A88A60' },
        ink: { 900: '#1C1915', 800: '#2A251F', 700: '#3D372F', 600: '#544C42', 500: '#6B6257', 400: '#8C8276' },
        clay: { 50: '#FBF1EB', 100: '#F5DECF', 400: '#D97B4A', 500: '#C2602F', 600: '#A84E22', 700: '#8A3F1B', 800: '#6E3216' },
        majorelle: { 50: '#EEF1FA', 100: '#D8DEF2', 500: '#3A5BB8', 600: '#2F4DA0', 700: '#253E82', 800: '#1C2F63' },
        oasis: { 50: '#EDF5F1', 600: '#2F6B55', 700: '#245443' },
        night: { 700: '#2B2620', 800: '#201C18', 900: '#15120F' },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { prose: '42rem', site: '82rem' },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.700'),
            '--tw-prose-headings': theme('colors.ink.900'),
            '--tw-prose-links': theme('colors.clay.700'),
            '--tw-prose-bold': theme('colors.ink.900'),
            '--tw-prose-quotes': theme('colors.ink.800'),
            '--tw-prose-quote-borders': theme('colors.clay.500'),
            '--tw-prose-th-borders': theme('colors.sand.300'),
            '--tw-prose-td-borders': theme('colors.sand.200'),
            '--tw-prose-bullets': theme('colors.clay.500'),
            '--tw-prose-counters': theme('colors.clay.600'),
            '--tw-prose-hr': theme('colors.sand.300'),
            fontSize: '1.125rem',
            lineHeight: '1.75',
            maxWidth: 'none',
            'h2, h3, h4': { fontFamily: 'var(--font-serif)', fontWeight: '600', letterSpacing: '-0.01em', scrollMarginTop: '6rem' },
            h2: { fontSize: '1.875rem', marginTop: '2.5em', lineHeight: '1.2' },
            h3: { fontSize: '1.375rem', marginTop: '1.8em' },
            a: { textDecorationColor: theme('colors.clay.400'), textUnderlineOffset: '3px', fontWeight: '500' },
            'a:hover': { color: theme('colors.clay.800') },
            table: { fontSize: '0.95rem' },
            'thead th': { fontFamily: 'var(--font-sans)', fontWeight: '600', color: theme('colors.ink.900') },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            figcaption: { color: theme('colors.ink.500'), fontSize: '0.875rem' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
