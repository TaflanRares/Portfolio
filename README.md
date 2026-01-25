My basic portfolio site based on React

## Deployment
- Run: `npm run deploy` to publish to GitHub Pages.

## Custom Domain
- Provide a domain via: env var `CUSTOM_DOMAIN`, `package.json` `customDomain`, or `homepage` with non-github.io host.
- The deploy script generates a `CNAME` file in `dist` to associate the custom domain.

Examples:

```bash
CUSTOM_DOMAIN=yourdomain.com npm run deploy
```