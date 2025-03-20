# TikTok Account Service Landing Page

## 📁 Project Structure

```
├── 📁 client/                    # Frontend React Application
│   ├── index.html               # Main HTML entry point
│   └── 📁 src/
│       ├── App.tsx              # Main application component
│       ├── main.tsx             # Application entry point
│       ├── index.css            # Global styles
│       ├── 📁 components/       # Reusable UI Components
│       │   ├── 📁 ThreeJS/     # 3D Components
│       │   │   ├── TikTokLogo.tsx
│       │   │   └── HeroBg.tsx
│       │   ├── 📁 ui/          # UI Components (shadcn/ui)
│       │   │   ├── button.tsx
│       │   │   ├── card.tsx
│       │   │   ├── form.tsx
│       │   │   └── [other UI components]
│       │   ├── CTA.tsx         # Call to Action component
│       │   ├── ContactForm.tsx # Contact form component
│       │   ├── Footer.tsx      # Footer component
│       │   ├── Hero.tsx        # Hero section component
│       │   ├── Navbar.tsx      # Navigation component
│       │   ├── Payment.tsx     # Payment section component
│       │   ├── Pricing.tsx     # Pricing section component
│       │   └── Testimonials.tsx # Testimonials component
│       └── 📁 pages/           # Route Pages
│           ├── Home.tsx        # Home page
│           ├── ContactUs.tsx   # Contact page
│           ├── PaymentConfirmation.tsx
│           ├── TermsAndConditions.tsx
│           ├── PrivacyPolicy.tsx
│           ├── RefundPolicy.tsx
│           └── not-found.tsx   # 404 page
├── 📁 server/                   # Backend server code
├── 📁 shared/                   # Shared utilities and types
├── package.json                # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── vite.config.ts           # Vite configuration
```

## 🚀 Website Structure

### 📄 Pages
1. **Home Page** (`/pages/Home.tsx`)
   - Hero Section with 3D TikTok Logo
   - Features Section
   - Pricing Plans
   - Testimonials
   - Call to Action (CTA)

2. **Payment/Order Page** (`/pages/PaymentConfirmation.tsx`)
   - Payment Instructions (JazzCash)
   - Contact Form with:
     * Plan Selection (Starter/Standard/Premium)
     * Personal Details
     * Account Email(s)
     * Transaction ID
     * WhatsApp Number

3. **Legal Pages**
   - Terms & Conditions (`/pages/TermsAndConditions.tsx`)
   - Privacy Policy (`/pages/PrivacyPolicy.tsx`)
   - Refund Policy (`/pages/RefundPolicy.tsx`)

4. **Contact Page** (`/pages/ContactUs.tsx`)

### 🧩 Components
1. **Navigation** (`/components/Navbar.tsx`)
   - Logo
   - Home
   - Pricing
   - How It Works
   - Order Now
   - Contact Us
   - Legal Dropdown (Terms, Privacy, Refund)

2. **Footer** (`/components/Footer.tsx`)
   - Logo & Description
   - Quick Links
   - Legal Links
   - Contact Information

3. **Interactive Elements**
   - 3D TikTok Logo (`/components/ThreeJS/TikTokLogo.tsx`)
   - Background Effects (`/components/ThreeJS/HeroBg.tsx`)

4. **Forms and UI**
   - Contact Form (`/components/ContactForm.tsx`)
   - Pricing Cards (`/components/Pricing.tsx`)
   - CTA Sections (`/components/CTA.tsx`)
   - Testimonials (`/components/Testimonials.tsx`)

## 🛠️ Tech Stack
- React + TypeScript
- Tailwind CSS
- Three.js for 3D elements
- Express.js backend
- shadcn/ui components
- Wouter for routing

## 📦 Dependencies
- React + TypeScript
- TailwindCSS
- Three.js
- Express
- shadcn/ui
- And more (see package.json)

## 🏃‍♂️ Getting Started
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5000 in your browser

## 📝 Environment Variables
Make sure to set up the following environment variables:
- `VITE_API_URL`
- Other necessary environment variables

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
