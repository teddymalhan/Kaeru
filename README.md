# Kaeru _(aws-amplify-gen2)_

<p align="center">
<img width="128" height="128" src="public/kaeru-icon.svg" alt="Kaeru icon">
</p>

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An AI-powered financial operations platform that automates cancellations, disputes, and fraud detection.

The name comes from 帰る (kaeru) — Japanese for "to return, go back, or restore" — reflecting the project's goal of helping users reclaim control over their financial life. Note: the npm package name in `package.json` is `aws-amplify-gen2` for historical reasons tied to the underlying AWS Amplify Gen2 scaffold; the repository, product, and folder name is `kaeru`.

Kaeru combines Next.js 14 (App Router), AWS Amplify Gen2, Plaid, VAPI voice agents, and LangChain-powered GPT-4 fraud detection into a single dashboard for managing subscriptions, disputing fraudulent charges, and automating customer outreach by phone and email.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Features](#features)
- [Documentation](#documentation)
- [API](#api)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Background

Cancelling subscriptions, disputing fraudulent transactions, and chasing refunds are time-consuming, repetitive tasks that financial institutions have historically pushed onto consumers. Kaeru automates this work using a combination of:

- **Plaid** for transaction aggregation and account linking.
- **LangChain + OpenAI GPT-4** for fraud detection and behavioral analysis.
- **VAPI** voice agents ("Riley") for placing cancellation and dispute phone calls.
- **AWS Step Functions** for orchestrating multi-step cancellation and dispute workflows.

See Also: [Plaid](https://plaid.com), [AWS Amplify Gen2](https://docs.amplify.aws/), [LangChain](https://js.langchain.com/), [VAPI](https://vapi.ai/).

## Install

This project requires [Node.js](https://nodejs.org/) `>=18.17 <=20.x` (Amplify Gen2 compatibility) and npm.

```sh
git clone https://github.com/teddymalhan/kaeru.git
cd kaeru
npm install
```

### Dependencies

The following external credentials are required for full functionality:

- `OPENAI_API_KEY` — for fraud detection (degrades gracefully if absent).
- Plaid credentials — see [`docs/PLAID_SETUP.md`](docs/PLAID_SETUP.md).
- VAPI credentials — see [`docs/vapi-assistants.md`](docs/vapi-assistants.md).
- AWS credentials — required for Amplify backend and Bedrock features.

Copy the environment template and fill in your values:

```sh
cp .env.example .env.local
```

## Usage

Start the Next.js development server:

```sh
npm run dev
```

Then visit `http://localhost:3000`.

To run the local Amplify sandbox backend in parallel:

```sh
npx ampx sandbox
```

Build and run for production:

```sh
npm run build
npm start
```

Lint the project:

```sh
npm run lint
```

## Features

- AI-driven subscription cancellation across multiple providers.
- Real-time fraud detection with risk scoring (LOW / MEDIUM / HIGH).
- One-click transaction dispute filing.
- Voice-agent phone automation for cancellations and disputes.
- Email-based cancellation workflows.
- Live agent and workflow status dashboard.
- Transaction history with export.

## Documentation

Detailed guides live in [`/docs`](docs/):

- [`PLAID_SETUP.md`](docs/PLAID_SETUP.md) — Plaid integration.
- [`FRAUD_DETECTION_README.md`](docs/FRAUD_DETECTION_README.md) — Fraud detection system.
- [`AI_FRAUD_DETECTION_SETUP.md`](docs/AI_FRAUD_DETECTION_SETUP.md) — AI configuration.
- [`vapi-assistants.md`](docs/vapi-assistants.md) — VAPI voice agents.
- [`riley-system-prompt.md`](docs/riley-system-prompt.md) — Voice agent prompts.

## API

The application exposes Next.js App Router API routes under [`/app/api/`](app/api/), and a shared `FraudDetectionAgent` class in [`lib/fraud-detection-agent.ts`](lib/fraud-detection-agent.ts):

```ts
import { fraudDetectionAgent } from "@/lib/fraud-detection-agent"

await fraudDetectionAgent.analyzeTransaction(transaction)
await fraudDetectionAgent.analyzeUserBehavior(userId)
await fraudDetectionAgent.batchAnalyzeTransactions(transactions)
```

Risk scoring thresholds are configured in [`lib/fraud-config.ts`](lib/fraud-config.ts): LOW (0–30), MEDIUM (30–50), HIGH (50+).

## Maintainers

- [@teddymalhan](https://github.com/teddymalhan)

## Contributing

Questions and bug reports are welcome via [GitHub Issues](https://github.com/teddymalhan/kaeru/issues). Feature discussions belong in [GitHub Discussions](https://github.com/teddymalhan/kaeru/discussions).

PRs are accepted. Please ensure `npm run lint` passes before opening a PR. See [CONTRIBUTING.md](CONTRIBUTING.md) if present for further guidelines.

## License

[MIT](LICENSE) © Teddy Malhan
