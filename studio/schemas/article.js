import { defineType, defineField, defineArrayMember } from 'sanity'

// Keep in sync with src/lib/taxonomy.js in the website.
const CATEGORIES = [
  { title: 'Destinations', value: 'destinations' },
  { title: 'Sahara Desert', value: 'sahara-desert' },
  { title: 'Itineraries', value: 'morocco-itineraries' },
  { title: 'Travel Tips', value: 'travel-tips' },
  { title: 'Getting Around', value: 'transportation' },
  { title: 'Culture & Food', value: 'culture-food' },
  { title: 'Things to Do', value: 'things-to-do' },
]

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'answers', title: 'Short answer & facts' },
    { name: 'trust', title: 'Sources & dates' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', group: 'content', validation: (r) => r.required().max(110) }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 80 },
      description: 'The URL becomes /<section>/<slug>. Do not change it after publishing; add a redirect instead.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Section',
      type: 'string',
      group: 'content',
      options: { list: CATEGORIES, layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'standfirst',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'The introduction under the headline. Answer the reader’s main question in 2–3 sentences.',
      validation: (r) => r.required().max(420),
    }),
    defineField({
      name: 'heroImage',
      title: 'Main image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string', description: 'Describe what the photo shows, for screen readers and search engines.', validation: (r) => r.required() }),
        defineField({ name: 'caption', type: 'string' }),
        defineField({ name: 'credit', type: 'string', description: 'Photographer, if not our own photo.' }),
      ],
    }),
    defineField({
      name: 'body',
      type: 'text',
      rows: 40,
      group: 'content',
      description:
        'Markdown. Use ## for sections and ### for sub-sections (they build the table of contents). Tables use | pipes |. Callouts: start a quote with > [!TIP], > [!NOTE], > [!WARNING] or > [!IMPORTANT]. Images: ![alt text](https://… "caption").',
      validation: (r) => r.required().min(800).warning('Cornerstone guides are usually 1,500+ words.'),
    }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }], group: 'content', description: 'Leave empty to credit the Sahara Guides Editorial Team.' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'content' }),
    defineField({ name: 'featured', type: 'boolean', group: 'content', initialValue: false }),
    defineField({ name: 'editorsPick', title: 'Editors’ pick', type: 'boolean', group: 'content', initialValue: false }),
    defineField({ name: 'related', title: 'Related reading', type: 'array', of: [{ type: 'reference', to: [{ type: 'article' }] }], group: 'content', validation: (r) => r.max(3) }),

    defineField({ name: 'keyTakeaways', title: 'The short answer (bullets)', type: 'array', of: [{ type: 'string' }], group: 'answers', validation: (r) => r.max(5) }),
    defineField({
      name: 'quickFacts',
      title: 'At a glance',
      type: 'array',
      group: 'answers',
      of: [defineArrayMember({ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'value', type: 'string' }], preview: { select: { title: 'label', subtitle: 'value' } } })],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'answers',
      of: [defineArrayMember({ type: 'object', fields: [{ name: 'question', type: 'string' }, { name: 'answer', type: 'text', rows: 3 }], preview: { select: { title: 'question' } } })],
    }),

    defineField({ name: 'publishedAt', type: 'date', group: 'trust', description: 'Articles stay hidden until this date (use it to schedule).', validation: (r) => r.required(), initialValue: () => new Date().toISOString().slice(0, 10) }),
    defineField({ name: 'updatedAt', title: 'Last updated', type: 'date', group: 'trust', description: 'Change only for substantive updates.' }),
    defineField({ name: 'verifiedAt', title: 'Facts last verified', type: 'date', group: 'trust', description: 'Date time-sensitive facts were last checked against the sources below.' }),
    defineField({
      name: 'sources',
      type: 'array',
      group: 'trust',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'title', type: 'string', validation: (r) => r.required() },
            { name: 'publisher', type: 'string' },
            { name: 'url', type: 'url' },
          ],
          preview: { select: { title: 'title', subtitle: 'publisher' } },
        }),
      ],
    }),

    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo', description: 'Shown in search results. 50–60 characters. Defaults to the title.', validation: (r) => r.max(65).warning('Long titles get cut off in search results.') }),
    defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 3, group: 'seo', description: '140–160 characters; summarise what the reader will learn.', validation: (r) => r.required().max(180) }),
    defineField({ name: 'noindex', title: 'Hide from search engines', type: 'boolean', group: 'seo', initialValue: false }),
  ],
  orderings: [{ title: 'Last updated', name: 'updatedDesc', by: [{ field: 'updatedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', category: 'category', media: 'heroImage', publishedAt: 'publishedAt' },
    prepare: ({ title, category, media, publishedAt }) => ({ title, subtitle: `${category || 'no section'} · ${publishedAt || 'unscheduled'}`, media }),
  },
})
