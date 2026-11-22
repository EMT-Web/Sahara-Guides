import { defineType, defineField } from 'sanity'

// Redirects are applied at build time. Publish, then trigger a redeploy
// (or set up a Sanity webhook to a Vercel deploy hook).
export default defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({ name: 'source', type: 'string', description: 'Old path, starting with /', validation: (r) => r.required().custom((v) => (v?.startsWith('/') ? true : 'Must start with /')) }),
    defineField({ name: 'destination', type: 'string', description: 'New path (/…) or full URL', validation: (r) => r.required() }),
    defineField({ name: 'permanent', type: 'boolean', initialValue: true, description: 'Permanent (308) for moved content; temporary (307) otherwise.' }),
    defineField({ name: 'note', type: 'string' }),
  ],
  preview: { select: { title: 'source', subtitle: 'destination' } },
})
