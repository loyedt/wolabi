# Woliba Registration App

A multi-step user registration flow for the Woliba wellness platform.

---

## App Overview

This is an 8-step guided registration web application built for Woliba. Users start by verifying their company, provide personal details, confirm their email via OTP, set login credentials, and finally select their wellness interests and wellbeing pillars before being welcomed to the platform.

**Flow summary:**

| Step | Screen | Description |
|------|--------|-------------|
| 1 | Company Verify | Enter company name and password to verify organisation |
| 2 | User Details | Enter email, first name, last name (company pre-filled) |
| 3 | OTP Verification | Enter 6-digit OTP sent to work email, with 3-min timer and resend |
| 4 | Login Credentials | Set password, date of birth, contact number, accept Terms |
| 5 | Wellness Interests | Select wellness interests grouped by category (accordion) |
| 6 | Wellbeing Pillars | Choose exactly 3 pillars from a grid |
| 7 | Loading | Submits registration to API with animated loader |
| 8 | Welcome | Personalised welcome screen with user's first name |

---

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### Install and run locally

```bash
# Clone the repository
git clone https://github.com/loyedt/wolabi.git
cd wolabi

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at `http://localhost:5173`

### Build for production

```bash
npm run build
```

Output goes to `dist/`.

### Test credentials

| Field | Value |
|-------|-------|
| Company Name | `Woliba` |
| Company Password | `Woliba@123!` |

Use any valid work email — a real OTP will be sent to it.

---

## Libraries / Tools Used

| Library | Version | Purpose |
|---------|---------|---------|
| React | 19 | UI framework, functional components + hooks |
| Redux Toolkit | 2.x | Global state management, async thunks |
| React Redux | 9.x | React bindings for Redux |
| React Router DOM | 7.x | Client-side routing with route guards |
| Axios | 1.x | HTTP client for all API calls |
| Tailwind CSS | 4.x | Utility-first styling, responsive design |
| @tailwindcss/vite | 4.x | Tailwind v4 Vite integration |
| Vite | 8.x | Build tool and dev server (with proxy) |

---

## Folder Structure

```
wolabi/
├── public/                        # Static assets
├── src/
│   ├── api/
│   │   └── index.js               # Axios instance + all API functions
│   ├── assets/
│   │   ├── logo.png               # Woliba logo
│   │   ├── background.png         # Background illustration
│   │   └── loader.mp4             # Loader animation
│   ├── components/
│   │   ├── Layout/
│   │   │   └── AuthLayout.jsx     # Shared layout: header, bg, card, footer
│   │   ├── OTPInput/
│   │   │   └── OTPInput.jsx       # 6-box OTP input with auto-focus/backspace
│   │   ├── DatePicker/
│   │   │   └── DatePickerModal.jsx # Custom month/year/day calendar modal
│   │   └── ui/
│   │       ├── Button.jsx         # Primary (coral) + Back (outlined) variants
│   │       └── InputField.jsx     # Label + input + error + password eye toggle
│   ├── pages/
│   │   ├── Step1/index.jsx        # Company Name + Password
│   │   ├── Step2/index.jsx        # User Details
│   │   ├── Step3/index.jsx        # OTP Verification
│   │   ├── Step3b/index.jsx       # Post-OTP summary (read-only)
│   │   ├── Step4/index.jsx        # Login Credentials
│   │   ├── Step5/index.jsx        # Wellness Interests accordion
│   │   ├── Step6/index.jsx        # Wellbeing Pillars grid
│   │   ├── Step7/index.jsx        # Loading + registration API call
│   │   └── Step8/index.jsx        # Welcome screen
│   ├── redux/
│   │   ├── store.js               # Redux store
│   │   └── slices/
│   │       └── registrationSlice.js # State + all async thunks
│   ├── routes/
│   │   └── index.jsx              # Route config with guards
│   ├── utils/
│   │   └── validation.js          # Email, name, password, phone validators
│   ├── App.jsx                    # Root component (Provider + Router)
│   └── index.css                  # Tailwind v4 imports + custom theme tokens
├── vercel.json                    # Vercel rewrites (API proxy + SPA catch-all)
├── vite.config.js                 # Vite config with dev proxy
└── package.json
```

---

## Screenshots

### Step 1 — Company Verification
![Step 1](screenshots/step1.png)
Company name and password entry. Validates min 8 chars, 1 uppercase, 1 number.

### Step 2 — User Details
![Step 2](screenshots/step2.png)
Email, first name, last name. Company name is pre-filled and disabled.

### Step 3 — OTP Verification
![Step 3](screenshots/step3.png)
6-digit OTP input with 3-minute countdown timer and resend option.

### Step 4 — Login Credentials
![Step 4](screenshots/step4.png)
Password + confirm, date of birth (custom calendar picker), contact number, Terms of Service checkbox.

### Step 5 — Wellness Interests
![Step 5](screenshots/step5.png)
Accordion grouped by category (Individual Sports, Ball Sports, etc.). Multi-select pill buttons with icons.

### Step 6 — Wellbeing Pillars
![Step 6](screenshots/step6.png)
3-column grid. Select exactly 3 pillars — selected items show a numbered coral badge (1, 2, 3).

### Step 7 — Loading
![Step 7](screenshots/step7.png)
Animated running figure + coral progress bar while registration API call completes.

### Step 8 — Welcome
![Step 8](screenshots/step8.png)
Gradient blob background, meditating figure, personalised "Welcome {firstName}!" heading.

> To add screenshots: run `npm run dev`, capture each step, save as `screenshots/step1.png` through `screenshots/step8.png`.

---

## Deployment Instructions

The app is deployed on Vercel. The `vercel.json` handles two concerns:

1. **API proxy** — `/api/*` requests are forwarded to `https://dev.api.woliba.io/*`, replicating the Vite dev-server proxy in production.
2. **SPA catch-all** — All unmatched paths serve `index.html` so React Router deep links (e.g. `/register/step5`) work on direct load or refresh.

### Deploy to Vercel

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo
3. Framework preset: **Vite** (auto-detected)
4. Build command: `npm run build` / Output directory: `dist`
5. No environment variables required
6. Click **Deploy**

### vercel.json reference

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://dev.api.woliba.io/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Assumptions

- **Company credentials are provided externally.** The API does not expose a self-registration endpoint for companies — users must be given a company name and password by their administrator.
- **OTP email is real.** The API sends a live OTP to the entered email address. A valid, accessible work email is required to complete registration.
- **Single language (English).** The Language selector in the header is UI-only and does not switch locale.
- **`user_type: 0` (Employee).** The registration payload hardcodes `user_type: 0`. Dependent/spouse flows (types 1, 2) are out of scope for this assessment.
- **Timezone auto-detected.** `time_zone` is populated from `Intl.DateTimeFormat().resolvedOptions().timeZone` — no manual selection is required.
- **Work Anniversary is optional.** The field is included in Step 4 but not required for submission.
- **Step 3b skipped.** The post-OTP summary screen (Step 3b) is implemented but skipped in the navigation flow — OTP verification goes directly to Login Credentials (Step 4) for a smoother UX.
- **API base URL is dev only.** All calls target `https://dev.api.woliba.io/v1/` which has a self-signed TLS certificate. The Vite proxy uses `secure: false` and the Vercel rewrite handles this transparently.
