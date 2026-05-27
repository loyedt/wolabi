# CLAUDE.md — Woliba Registration App

## Commands

```bash
npm run dev      # Start dev server at localhost:5173
npm run build    # Production build → dist/
npm run lint     # ESLint
```

## Architecture

**8-step registration flow** — each step is a page component in `src/pages/StepN/`. All state lives in Redux (`src/redux/slices/registrationSlice.js`). Route guards in `src/routes/index.jsx` redirect to step1 if required state is missing.

**Step navigation:**
```
Step1 → Step2 → Step3 → Step4 → Step5 → Step6 → Step7 → Step8
```
Step3b exists but is skipped in navigation (Step3 → Step4 directly).

## API

**Base URL:** `/api/v1` (relative — routes through proxy)

**Dev:** Vite proxy in `vite.config.js` forwards `/api/*` → `https://dev.api.woliba.io/*` with `secure: false` (self-signed cert on that server).

**Production:** `vercel.json` rewrites do the same forwarding.

Do NOT change `baseURL` in `src/api/index.js` to an absolute URL — it will break CORS in the browser.

**API error shape:** `{ status, data: { code, message } }` — extract errors with `err.response?.data?.data?.message`.

**Interests response quirk:** `GET /viewWellnessInterest` returns `{ data: [[...items]] }` (nested array). The slice flattens it with `.flat()` on store.

## Design Tokens

| Token | Value | Tailwind class |
|-------|-------|----------------|
| Coral (primary) | `#E07070` | `coral` |
| Navy (text/headings) | `#1D3857` | `navy` |
| Page bg | `#F8F8F8` | — |

Custom tokens are defined in `src/index.css` under `@theme`. Use `text-navy`, `bg-coral`, `border-coral` etc. — not raw hex values.

## Shared Components

- `AuthLayout` — wraps steps 1–4 in the white card + header + bg + footer
- `InputField` — label + input + error + password eye toggle
- `Button` — `variant="back"` for back arrow, default for primary coral
- `OTPInput` — 6-box with auto-focus, backspace, and paste support
- `DatePickerModal` — custom calendar overlay used in Step4

Steps 5, 6, 7, 8 have their own full-page layouts (not wrapped in AuthLayout).

## Redux State

Key fields in `registration` slice:

```js
companyId, companyName          // set in Step1
email, firstName, lastName      // set in Step2
token                           // OTP token, set in Step2 + updated on resend
password, birthday, phoneNumber,
workAnniversary, acceptedPrivacyPolicy  // set in Step4
areasOfInterest[]               // toggled in Step5
wellbeingPillars[]              // toggled in Step6, exactly 3
interestsList[], pillarsList[]  // fetched from API, cached in store
userData                        // final response from /user-registration
```

Use `setField({ field, value })` for scalar updates. Use `toggleInterest(id)` / `togglePillar(id)` for array toggles.

## Validation

All validators are in `src/utils/validation.js`:
- `isValidEmail`, `isValidName`, `isValidPassword`, `isValidPhone`
- Password rule: min 8 chars, ≥1 uppercase, ≥1 number

## Deployment

Deployed on Vercel. `vercel.json` handles API proxy + SPA catch-all. No environment variables needed. See README for full deploy steps.

GitHub: `git@github-loyedt:loyedt/wolabi.git` (uses SSH host alias `github-loyedt` for the `loyedt` account — not the default `github.com` alias which maps to a different account).
