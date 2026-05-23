<h1>PullBase Tests</h1>
<p>
  <a href="https://pullbase.net"><img src="https://img.shields.io/badge/Live-pullbase.net-6366f1?style=flat-square" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" /></a>
  <img src="https://img.shields.io/badge/Playwright-E2E-45ba4b?style=flat-square&logo=playwright" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" />
</p>

End-to-end and integration test suite for [PullBase](https://pullbase.net).

## Stack

- **Playwright** — browser automation (Chromium, Firefox, WebKit)
- **TypeScript** — typed test files
- **Axe-core** — accessibility checks

## Getting Started

```bash
git clone https://github.com/pullbase-dev/pullbase-tests.git
cd pullbase-tests
npm install
npx playwright install --with-deps chromium

cp .env.example .env
# set BASE_URL to the instance you want to test
```

## Run Tests

```bash
# All tests (headless)
npm test

# With browser UI visible
npm run test:headed

# Specific file
npx playwright test tests/models.spec.ts

# Debug mode (step through)
npx playwright test --debug

# HTML report
npm run report
```

## Test Coverage

| File | What it covers |
|---|---|
| `tests/home.spec.ts` | Homepage loads, hero section, stats, navigation |
| `tests/models.spec.ts` | Model listing, search, filter by task/framework |
| `tests/model-detail.spec.ts` | Model detail page, README, IPFS CID, star button |
| `tests/datasets.spec.ts` | Dataset listing and detail |
| `tests/agents.spec.ts` | Agent listing, detail tabs (Run/Skill/Jobs) |
| `tests/search.spec.ts` | Global search across models/datasets/orgs |
| `tests/docs.spec.ts` | Docs page navigation, CLI section, API reference |
| `tests/organizations.spec.ts` | Org listing and detail |
| `tests/explore.spec.ts` | Explore live feed (real-time updates) |
| `tests/publish.spec.ts` | Publish wizard steps (mocked wallet) |

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `BASE_URL` | `https://pullbase.net` | Instance to test against |
| `API_URL` | `https://api.pullbase.net` | API base URL |

## License

MIT © [PullBase](https://pullbase.net)
