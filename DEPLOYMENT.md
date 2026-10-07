# ADEEL ART deployment

## Netlify setup

1. Push this repository to GitHub and connect the repository to a Netlify site. Keep the repository private because publishing uses a GitHub token with repository content write access.
2. Netlify builds the public files into `dist/`; only those files are deployed. Netlify Functions and setup scripts are outside that output.
3. Install dependencies locally with `npm install`, then run `npm run hash-admin-password`. Enter the requested initial password when prompted. Put only the generated `salt:hash` value in Netlify's `ADMIN_PASSWORD_HASH` environment variable. Do not commit the hash or put it in `admin.js`.
4. Add these Netlify environment variables: `GITHUB_PUBLISH_TOKEN` (fine-grained token with Contents read/write access), `GITHUB_REPOSITORY` (`owner/repository`), and `GITHUB_BRANCH` (usually `main`). Keep the token scoped to this private repository.
5. Trigger a deploy. Open `/admin`, sign in with the configured initial password, then use Security to replace it with a unique password of at least 12 characters.

After an administrator publishes, the server backs up the previous `content/site-content.json`, commits the new catalog to the connected GitHub branch, and Netlify automatically deploys that commit. Failed commits leave the currently deployed catalog untouched.

Orders and revocable admin sessions are stored privately in Netlify Blobs. Product catalog, public settings, About content, FAQ, and category menus are versioned in `content/site-content.json`. Customer image URLs must load before a product can be saved or content can be published.

For local development, use `npm install` and `npm run dev`. Configure the same server-only values in an untracked local `.env` file for authentication and publishing. The static pages can be previewed without those values, but authenticated admin, persistent orders, and publishing require Netlify Functions and Blobs.
