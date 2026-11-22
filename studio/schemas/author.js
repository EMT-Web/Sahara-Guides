import { defineType, defineField } from 'sanity'

// Only create authors for real people, with accurate, verifiable backgrounds.
export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string', description: 'e.g. “Desert guide and contributor”' }),
    defineField({ name: 'bio', type: 'text', rows: 4, description: 'Factual and verifiable. No invented credentials.' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'links', type: 'array', of: [{ type: 'url' }], description: 'Profiles that confirm who this person is.' }),
  ],
})
