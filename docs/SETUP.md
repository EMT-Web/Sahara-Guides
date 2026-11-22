# Launch and account setup

Everything below needs your accounts or approval. Nothing here has been done yet: **no DNS has been changed, no accounts have been created and no site has been verified.**

## 1. GitHub

1. Make sure the Claude GitHub App is installed on the `saharaguides` organisation with access to `Sahara-Guides` (https://claude.ai/connect-github), so the code can be pushed.
2. The default branch is `main`.

## 2. Vercel (hosting)

1. In Vercel, **Add New → Project** and import `saharaguides/Sahara-Guides`. Framework: Next.js (auto-detected). No build settings to change.
2. Add the environment variables from `.env.example` (at minimum `NEXT_PUBLIC_SITE_URL=https://saharaguides.com`).
3. Deploy. Check the preview URL. Temporary `*.vercel.app` addresses send `Disallow: /` and a `noindex` header, so only saharaguides.com can be indexed.
4. **Domain (needs your approval):** in Project → Settings → Domains, add `saharaguides.com` and `www.saharaguides.com`. Choose the apex (`saharaguides.com`) as primary and redirect `www` to it. Vercel shows the DNS records to add at your registrar. Only change DNS when you are ready to go live.

## 3. Sanity (CMS)

1. Create a project at https://www.sanity.io/manage (free plan). Dataset: `production`.
2. In the project's API settings, add CORS origins `http://localhost:3333`, `https://saharaguides.sanity.studio` and `https://saharaguides.com`.
3. Studio:
   ```bash
   cd studio
   npm install
   SANITY_STUDIO_PROJECT_ID=<id> npm run deploy
   ```
   The Studio is then at https://saharaguides.sanity.studio (rename `studioHost` in `studio/sanity.cli.js` if taken).
4. Website: set `NEXT_PUBLIC_SANITY_PROJECT_ID` in Vercel and redeploy.
5. Optional: move the launch guides into the CMS. Create an **Editor** API token, put it in `.env.local` as `SANITY_API_TOKEN`, and run `npm run import:sanity`. Imported articles then override the Markdown files.
6. Recommended: add a Sanity webhook to a Vercel **Deploy Hook**, so publishing a redirect triggers a rebuild. (Articles update automatically within an hour.)

## 4. Email (Resend)

1. Create a Resend account, verify the `saharaguides.com` domain (DNS records), and create an API key.
2. Create an Audience for the newsletter and copy its ID.
3. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` and `RESEND_AUDIENCE_ID` in Vercel.
4. Until then, the forms show a polite “not available yet” message rather than losing submissions.
5. Create the public mailbox (`hello@saharaguides.com` or whatever you choose) and set `NEXT_PUBLIC_CONTACT_EMAIL`.

## 5. Google Search Console

1. Add a **Domain property** for `saharaguides.com` (DNS TXT verification), or a URL-prefix property using `NEXT_PUBLIC_GOOGLE_VERIFICATION`.
2. Submit `https://saharaguides.com/sitemap.xml`.
3. Use URL Inspection on the homepage and two guides to request indexing.

## 6. Bing Webmaster Tools

1. Import the site from Search Console (quickest), or verify with `NEXT_PUBLIC_BING_VERIFICATION`.
2. Submit the sitemap.
3. After each deploy, run `npm run indexnow` to notify Bing and other IndexNow engines. The key file is `public/82a8345a88392b8ee8d175bb075a4092.txt`; keep it deployed.

## 7. Analytics

- **Vercel Web Analytics:** enable it in the Vercel project (Analytics tab). It is cookieless and already wired in.
- **Google Analytics 4 (optional):** create a GA4 property and web stream and set `NEXT_PUBLIC_GA_ID=G-…`. It loads only after a visitor accepts cookies. Events sent: `search` (internal search terms), `newsletter_signup`, `share`, `planner_change`. Mark `newsletter_signup` as a key event.
- **Microsoft Clarity (optional):** create a project and set `NEXT_PUBLIC_CLARITY_ID`. Also consent-gated.
- Google Tag Manager is not needed at this stage.

## 8. Before going live (checklist)

- [ ] Confirm the legal entity and contact details to show in the privacy policy.
- [ ] Decide whether Sahara Guides has any commercial relationship with a tour operator; if so, update `/affiliate-disclosure` and label relevant links.
- [ ] Add real photographs for Marrakech and Fes (currently pattern placeholders), and register them in `src/data/images.js`.
- [ ] Add named contributors (real people only) in Sanity → Authors, and update `/contributors`.
- [ ] Set social profile URLs if the accounts exist.
- [ ] Final review of every guide by a Morocco-based editor.
