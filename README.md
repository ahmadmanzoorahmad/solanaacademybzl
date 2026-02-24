# Superteam Solana Academy

## Overview
Two-project workspace for the Superteam Solana Academy - a Codecademy-style learning platform for Solana/crypto education with on-chain credentials.

## Projects

### 1. Vite SPA (workspace root)
Original React-based frontend imported from GitHub.
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4, Radix UI, MUI, shadcn/ui patterns
- **Routing**: React Router 7
- **Dev server**: `npm run dev` (port 5000)
- **Deployment**: Static site (dist/ directory)

### 2. Next.js Academy App (`onchain-academy/app/`)
Next.js 14+ App Router project with bounty-compliant architecture.
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS 3, Radix UI primitives, shadcn-style components
- **Wallet**: @solana/wallet-adapter-react (Phantom, Solflare) on Devnet
- **i18n**: Client-side provider with JSON message files (en, pt-BR, es)
- **Theme**: Dark mode primary with Solana gradients (#14F195 to #9945FF)
- **Services**: Structured service layer with stub/onchain variants + ServicesProvider
- **Credentials**: Helius DAS-based NFT credential reading + verification
- **Analytics**: Sentry (env-gated), GA4 + heatmap placeholders
- **Code Editor**: Monaco editor with Tests/Console panels in lesson view
- **Dev server**: `npm run dev` (port 5000)

#### Next.js Project Structure
```
onchain-academy/app/
  src/
    app/                 - App Router pages
      layout.tsx         - Root layout with providers
      providers.tsx      - Provider composition (Theme > I18n > Solana > Services)
      page.tsx           - Landing page
      dashboard/         - User dashboard (uses services + useWallet)
      courses/           - Course catalog & detail pages
      courses/[slug]/    - Course detail
      courses/[slug]/lessons/[lessonId]/ - Lesson view with Monaco editor
      leaderboard/       - Rankings (uses LeaderboardService)
      profile/           - User profile with on-chain credentials section
      settings/          - User settings
      identity/          - Digital identity / NFT credentials (uses services)
      certificates/[id]/ - Certificate detail view (mint-based)
      verify/[mint]/     - Public credential verification page
      not-found.tsx      - 404 page
    components/          - App components (Header, Footer, WalletButton, CodeEditor)
    components/ui/       - 16 shadcn-style UI primitives
    providers/           - SolanaProvider, ServicesProvider
    data/mock-data.ts    - Mock data (courses, users, achievements)
    i18n/                - Provider + JSON message files (en, pt-BR, es)
    services/            - Service layer
      index.ts           - Services interface + createStubServices factory
      xp.ts              - fetchXpBalance (Token-2022 RPC), levelFromXp, levelProgress
      analytics.ts       - GA4 + heatmap placeholder
      solana.ts          - Utility functions (shortenAddress, getExplorerUrl)
      learningProgress/  - types.ts, stub.ts, onchain.ts
      credentials/       - types.ts, stub.ts, onchain.ts, heliusDas.ts
      leaderboard/       - types.ts, stub.ts, helius.ts
      auth/              - types.ts, stub.ts
    lib/utils.ts         - cn() utility
    lib/env.ts           - Typed env getters (getSolanaRpcUrl, getXpMint, getHeliusApiKey, getSolanaCluster)
    types/index.ts       - TypeScript type definitions
  sentry.client.config.ts - Sentry client init (env-gated)
  sentry.server.config.ts - Sentry server init (env-gated)
  tailwind.config.ts     - Tailwind with custom Solana theme
  next.config.mjs        - Next.js config (webpack, transpilePackages)
  README.md              - Project documentation with env vars table
```

#### Environment Variables
- `NEXT_PUBLIC_SOLANA_RPC_URL` - Custom Devnet RPC (defaults to public endpoint)
- `NEXT_PUBLIC_SOLANA_CLUSTER` - Solana cluster: devnet (default) or mainnet-beta
- `NEXT_PUBLIC_XP_MINT` - XP Token-2022 mint address on Devnet (required for on-chain XP reads)
- `NEXT_PUBLIC_HELIUS_API_KEY` - Helius API key for DAS credential reads (optional; falls back to stub)
- `NEXT_PUBLIC_HELIUS_BASE_URL` - Helius API base URL (default https://api.helius.xyz)
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN (optional, init skipped if not set)
- `NEXT_PUBLIC_GA4_ID` - Google Analytics 4 measurement ID (optional)
- `NEXT_PUBLIC_HEATMAP_ID` - Heatmap service ID (optional)

#### Credentials Service Architecture
- `CredentialNft` type: id, mint, name, image, description, track, level, xp, coursesCompleted, owner, explorerUrl, verified
- `CredentialVerificationResult` type: mint, valid, owner, name, image, track, level, xp, explorerUrl, error
- `StubCredentialsService`: Returns 2 sample credentials; verifyCredential matches by mint
- `OnchainCredentialsService`: Uses Helius DAS (getAssetsByOwner / getAsset) to read wallet NFTs
- `heliusDas.ts`: 45-second cache per wallet, filters NFT interfaces, extracts metadata attributes
- ServicesProvider: Uses onchain credentials when wallet connected + HELIUS_API_KEY set; otherwise stub

#### Leaderboard Service Architecture
- `LeaderboardEntry` type: rank, wallet, displayName?, xp, level, avatarUrl?, streak?
- `LeaderboardTimeframe`: 'weekly' | 'monthly' | 'all'
- `StubLeaderboardService`: Returns 20 mock entries with realistic XP/levels; weekly=10, monthly=15, all=20
- `HeliusLeaderboardService`: Uses Helius DAS `getTokenAccounts` to scan XP mint holders, aggregates by wallet
- Cache TTLs: weekly=60s, monthly=120s, all=300s
- ServicesProvider: Uses HeliusLeaderboardService when HELIUS_API_KEY set (even without wallet); otherwise stub

## Workflows
- **Next.js Academy**: `cd onchain-academy/app && npm run dev` (active, port 5000)
- **Start application**: Vite app at root (paused)

## Deployment
- **Netlify**: `netlify.toml` at repo root with base=`onchain-academy/app`, `@netlify/plugin-nextjs`
- TypeScript build passes cleanly (12 routes, 9 static + 3 dynamic)

## User Preferences
- Dark mode primary design
- Solana brand colors (#14F195 green, #9945FF purple)
- Portuguese (pt-BR) and Spanish (es) i18n support alongside English
