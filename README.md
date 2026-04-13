# Dunnes Stores Practice Grocery Shop

A practice e-commerce site for teaching elderly students how to shop online. Built with React, Sass, and Framer Motion.

**This is NOT a real store. No real purchases are made and no real payments are taken.**

## Features

- Browse grocery products by category
- Add items to a shopping basket
- View and manage basket contents
- Complete a checkout form with delivery details
- Practice entering payment details (no real charges)
- See an order confirmation page
- Optional: receive a confirmation email via EmailJS

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173`

## Deploying to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Vercel will auto-detect the Vite framework — just click "Deploy"
5. Your site will be live in about a minute!

## Email Confirmation (Optional)

To enable confirmation emails:

1. Sign up for a free account at [emailjs.com](https://www.emailjs.com/)
2. Add an email service (e.g., Gmail)
3. Create an email template with these variables:
   - `{{to_email}}` — recipient's email
   - `{{to_name}}` — recipient's name
   - `{{order_number}}` — order number
   - `{{order_total}}` — total price
   - `{{order_items}}` — list of items
4. Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

5. Add the same environment variables in Vercel's project settings

## Tech Stack

- **React 18** with React Router
- **Sass** for styling
- **Framer Motion** for animations
- **EmailJS** for confirmation emails
- **Vite** for build tooling
- Deployable to **Vercel** for free
