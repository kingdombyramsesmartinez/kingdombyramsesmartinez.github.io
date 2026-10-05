# KINGDOM — Production Rules

## Security
- No inline `<script>`, `<style>` or `style=""` attributes.
- No third-party runtime JS/CDN dependencies in production.
- Keep Content-Security-Policy strict. Do not add `'unsafe-inline'` or `'unsafe-eval'`.
- No secrets, API keys, admin URLs, private Drive links, or credentials in source.
- New external services require an explicit privacy/security review and CSP update.
- All new `target="_blank"` links must use `rel="noopener noreferrer"`.

## Accessibility
- Keyboard access for all interactive elements.
- Visible focus states.
- Respect `prefers-reduced-motion`.
- Every informative image needs meaningful `alt`; decorative images use `aria-hidden`.

## Marketing/legal
- Every objective claim needs evidence before paid promotion.
- Do not imply endorsement, affiliation, certification, license, client relationship or ownership unless documented.
- Third-party trademarks/characters in portfolio must have a documented basis for display.
- Contracts, quotations and IP licenses are separate from this landing page.

## Change control
- Review CSP after adding any new asset/API.
- Test production headers after each deployment.
- Keep backups and version control; never edit only the production copy.
