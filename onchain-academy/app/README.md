# Superteam Solana Academy — Next.js App

A Codecademy-style learning platform for Solana/crypto education with on-chain credentials, built on Next.js 14 App Router.

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs on port 5000 by default.

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SOLANA_RPC_URL` | No | `https://api.devnet.solana.com` | Solana RPC endpoint |
| `NEXT_PUBLIC_SOLANA_CLUSTER` | No | `devnet` | Solana cluster (devnet, mainnet-beta) |
| `NEXT_PUBLIC_XP_MINT` | No | — | XP Token-2022 mint address on Devnet |
| `NEXT_PUBLIC_HELIUS_API_KEY` | No | — | Helius API key for DAS (credential reads) |
| `NEXT_PUBLIC_HELIUS_BASE_URL` | No | `https://api.helius.xyz` | Helius API base URL |
| `NEXT_PUBLIC_SENTRY_DSN` | No | — | Sentry DSN for error tracking |
| `NEXT_PUBLIC_GA4_ID` | No | — | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_HEATMAP_ID` | No | — | Heatmap service ID (Hotjar, Clarity) |

## XP Token

XP is a soulbound fungible token (Token-2022, NonTransferable). A learner's token balance equals their XP. Level is calculated as `floor(sqrt(xp / 100))`.

XP mint address will be provided by Superteam; system is Devnet-ready.

## Credentials

On-chain credentials are Metaplex Core NFTs. The credentials service uses the Helius DAS API to read wallet assets. When `NEXT_PUBLIC_HELIUS_API_KEY` is not set, the system falls back to stub data and shows an informational empty state.

## Architecture

- **Service Layer**: All RPC/DAS calls go through the service layer (`src/services/`). UI components never call RPC directly.
- **Provider Switching**: `ServicesProvider` auto-selects onchain vs stub services based on wallet connection and env config.
- **i18n**: Client-side provider with JSON message files (en, pt-BR, es).

## Deploy to Netlify

This project is configured for Netlify deployment via `netlify.toml` at the repo root.

### Build Settings

| Setting | Value |
|---|---|
| Base directory | `onchain-academy/app` |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | 18+ |

### Required Plugin

Install the `@netlify/plugin-nextjs` plugin (already configured in `netlify.toml`).

### Environment Variables

Set the following in Netlify's dashboard under **Site settings > Environment variables**:

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SOLANA_RPC_URL` | No | Defaults to Devnet public endpoint |
| `NEXT_PUBLIC_SOLANA_CLUSTER` | No | `devnet` (default) or `mainnet-beta` |
| `NEXT_PUBLIC_XP_MINT` | No | XP Token-2022 mint (will be provided by Superteam) |
| `NEXT_PUBLIC_HELIUS_API_KEY` | No | Enables DAS credential + leaderboard reads |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Sentry error tracking |

### Notes

- Next.js 14 runs on Netlify using the `@netlify/plugin-nextjs` runtime, which handles SSR, API routes, and edge functions.
- All env vars prefixed with `NEXT_PUBLIC_` are embedded at build time.
- The app is fully functional without any env vars set (falls back to stub services).
