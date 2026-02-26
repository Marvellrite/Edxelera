## Infra & Integrations (non-negotiable)

This project uses:
- MySQL + Sequelize (Codex-owned)
- Redis (Codex-owned)
- AWS S3 + CloudFront for video delivery (Codex-owned)
- Paystack for payments (Codex-owned)
- `.env.example` must be present and kept up to date

### v0 restrictions
v0 must NOT:
- implement Paystack logic
- implement AWS S3/CloudFront logic
- implement Sequelize models/migrations
- implement Redis utilities
v0 may only:
- build billing UI screens and “Pay with Paystack” buttons that call typed client wrappers

### Codex requirements
Codex must:
- implement Paystack initialization + webhook verification (webhook is source of truth)
- implement protected video URL generation (signed URL) enforcing enrollment + unlock rules
- implement Redis caching + rate limiting
- keep `.env.example` updated when adding new env vars