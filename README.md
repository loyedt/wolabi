# Woliba Registration App

A multi-step user registration flow for the Woliba wellness platform, built with React, Redux Toolkit, and Tailwind CSS.

## Features

- 8-step guided registration flow
- Company verification with API authentication
- Email OTP verification with 3-minute countdown and resend
- Custom date picker modal for birthday selection
- Wellness interests selection (accordion grouped by category)
- Wellbeing pillars selection (exactly 3, with numbered badges)
- Animated loading screen with live API registration call
- Personalised welcome screen

## Tech Stack

| Layer | Library |
|---|---|
| UI | React 19, Tailwind CSS v4 |
| State | Redux Toolkit, React Redux |
| Routing | React Router DOM v7 |
| HTTP | Axios |
| Build | Vite 8 |

## Local Setup

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Test Credentials

| Field | Value |
|---|---|
| Company Name | `Woliba` |
| Company Password | `Woliba@123!` |

Use any valid work email — an OTP will be sent to it.

## Project Structure

```
src/
├── api/          # Axios instance + all API functions
├── assets/       # Logo, background, loader
├── components/
│   ├── Layout/   # AuthLayout (shared header/footer/card)
│   ├── OTPInput/ # 6-box OTP input with auto-focus
│   ├── DatePicker/ # Custom calendar modal
│   └── ui/       # Button, InputField
├── pages/        # Step1–Step8
├── redux/        # Store + registrationSlice
├── routes/       # React Router config with guards
└── utils/        # Validation helpers
```

## API

All requests go through a proxy to `https://dev.api.woliba.io/v1/`:

| Step | Endpoint |
|---|---|
| 1 | `POST /verify-by-company-name-and-password` |
| 2 | `POST /save-user-details-and-send-otp` |
| 3 | `POST /verify-otp-for-user-registration` |
| 3 resend | `POST /send-otp-for-user-registration` |
| 5 | `GET /viewWellnessInterest` |
| 6 | `GET /get-wellbeing-pillars/1` |
| 7 | `POST /user-registration` |

## Deployment (Vercel)

The `vercel.json` in the project root handles two things:
1. Proxies `/api/*` → `https://dev.api.woliba.io/*` (replaces the Vite dev proxy)
2. SPA catch-all so React Router deep links don't 404

To deploy:
1. Push this repo to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Framework preset: **Vite** (auto-detected)
4. Build command: `npm run build` / Output: `dist`
5. No environment variables needed
6. Click Deploy
