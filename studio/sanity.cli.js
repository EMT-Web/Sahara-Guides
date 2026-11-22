import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Deployed at https://<studioHost>.sanity.studio after `npm run deploy`
  studioHost: 'saharaguides',
})
