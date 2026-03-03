# Celesta '25 Website

---

[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Active Development](https://img.shields.io/badge/Status-Active%20Development-brightgreen.svg)](https://github.com/Diptanshu-215/celesta-25-site/commits/main)

---

## ✨ Welcome to Celesta '25 - IIT Patna's Techno-Cultural Fest! ✨

This repository hosts the official website for **Celesta '25**, the annual techno-cultural extravaganza of IIT Patna. Designed to be the central hub for all festival activities, this platform offers a seamless experience for participants, from event registration and ticketing to QR-based entry and real-time updates. With a sleek, interactive, and user-friendly interface, the Celesta '25 website ensures everyone stays connected and engaged throughout the fest.

---

## 🚀 Features

The Celesta '25 website is packed with functionalities to manage every aspect of the festival:

*   **Dynamic Homepage:** Engaging introductory section with hero images, video glimpses, and captivating animations.
*   **Comprehensive Event & Workshop Listings:** Dedicated pages to showcase all events and workshops with detailed descriptions, schedules, and registration options.
*   **Secure User Authentication:**
    *   Seamless user registration and login powered by Firebase Authentication.
    *   OTP verification for email during registration.
    *   Personalized user profiles to manage registrations and orders.
*   **Integrated Ticketing & Store System:**
    *   Browse and purchase various products, including fest passes and merchandise.
    *   Dynamic pricing updates managed via admin APIs.
    *   Shopping cart functionality for a smooth purchase flow.
*   **Robust Payment Gateway Integration:**
    *   Secure online payments processed via Atom Technologies (NTT Pay).
    *   Real-time payment status updates and redirection.
*   **QR Code Based Entry System:**
    *   Generate unique, signed QR codes for registered users and purchased tickets (initially enabled for IIT Patna email domains).
    *   Secure API for QR code verification, ensuring controlled access to events and venues.
*   **Admin Capabilities:** API endpoints for administrative tasks like updating product prices.
*   **Interactive Galleries:** Showcase the vibrant moments from past Celesta editions.
*   **Team Showcase:** An interactive organizational chart to highlight the dedicated team behind Celesta '25.
*   **Contact & Support:** A dedicated contact section with an engaging UI for inquiries and feedback.

---

## 🛠️ Tech Stack

This project leverages a modern and powerful stack to deliver a high-performance and scalable web application:

*   **Framework:** [Next.js](https://nextjs.org/) (React Framework for Production)
*   **Frontend Library:** [React.js](https://react.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (for enhanced type safety and developer experience) & JavaScript
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (for rapid UI development) & CSS Modules
*   **Backend (API Routes):** Next.js API Routes
*   **Database:** [Firebase Firestore](https://firebase.google.com/docs/firestore) (NoSQL cloud database)
*   **Authentication:** [Firebase Authentication](https://firebase.google.com/docs/auth)
*   **Payment Gateway:** Atom Technologies (NTT Pay)
*   **Email Service:** [Nodemailer](https://nodemailer.com/about/)
*   **Animations:** [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) & [Motion](https://www.framer.com/motion/)
*   **UI Components:** [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/icons/), [React Icons](https://react-icons.github.io/react-icons/)
*   **QR Generation:** [qrcode.react](https://github.com/zpao/qrcode.react)
*   **Carousel/Slider:** [Swiper.js](https://swiperjs.com/)
*   **Data Visualization:** [D3.js](https://d3js.org/) (specifically for the team organizational chart)
*   **Validation:** [Zod](https://zod.dev/) (schema declaration and validation, though schema validation is currently commented out in `src/app/api/order/route.js`)
*   **Utilities:** `axios`, `clsx`, `tailwind-merge`

---

## ⚡ Getting Started

Follow these instructions to set up and run the Celesta '25 website locally.

### Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/en/download/) (v18.x or higher recommended)
*   [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/getting-started/install)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Diptanshu-215/celesta-25-site.git
    cd celesta-25-site
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root of the project and add the following environment variables. Obtain these values from your respective service providers (Firebase, Atom Technologies, Nodemailer).

    ```env
    # Firebase Admin SDK Configuration
    # This should be the JSON service account key contents, base64 encoded, or individual credentials.
    # The current setup expects credentials to be accessible by firebaseAdmin.js.
    # Example for service account JSON:
    # FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
    # FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@xxxxx.iam.gserviceaccount.com"
    # FIREBASE_PROJECT_ID="your-project-id"

    # NTT Pay (Atom Technologies) Configuration
    NEXT_PUBLIC_MERCHANT_ID=your_merchant_id
    MERCHANT_PASSWORD=your_merchant_password
    PRODUCT_ID=your_product_id
    ATOM_AUTH_URL=https://paynet.atomtech.in/paynetz/vfpdirect.php # Or your specific gateway URL

    # QR Code Security
    QR_SECRET_KEY=a_strong_secret_key_for_qr_hashing

    # Email Service (Nodemailer)
    EMAIL_USER=your_gmail_username@gmail.com
    EMAIL_PASS=your_gmail_app_password
    ```

    *Note:* For Firebase Admin SDK, ensure your `firebaseAdmin.js` correctly initializes the SDK using these environment variables or a service account key file.

### Running the Development Server

1.  **Start the development server:**
    ```bash
    npm run dev
    # OR
    yarn dev
    ```

2.  **Open in your browser:**
    Navigate to `http://localhost:3000` in your web browser to see the application running.

### Building for Production

To create an optimized production build:

```bash
npm run build
# OR
yarn build
```

Then, you can start the production server:

```bash
npm run start
# OR
yarn start
```

---

## 📂 Project Structure

The project follows a standard Next.js directory structure with additional modules for better organization:

```
├── public/                       # Static assets (images, fonts, videos)
├── src/
│   ├── app/                      # Next.js App Router root
│   │   ├── api/                  # API routes (backend endpoints)
│   │   │   ├── admin/            # Admin-specific APIs (e.g., price updates, product listing)
│   │   │   ├── login/            # User login API
│   │   │   ├── order/            # Order creation API
│   │   │   ├── payment/          # Payment initiation & response handling APIs
│   │   │   ├── profile/          # User profile API
│   │   │   ├── qr/               # QR code generation & verification APIs
│   │   │   ├── register/         # User registration API
│   │   │   └── send-otp/         # OTP sending API
│   │   ├── contact/              # Contact page & components
│   │   ├── events/               # Events page, event cards, modal, data (events.json)
│   │   ├── gallery/              # Photo gallery page
│   │   ├── login/                # Login page
│   │   ├── profile/              # User profile page & checkout modal
│   │   ├── register/             # Registration page
│   │   ├── so-far/               # Timeline/History page
│   │   ├── spons/                # Sponsors page
│   │   ├── store/                # Store/Ticketing page, product cards, data (events.json is duplicated here, may refer to products)
│   │   ├── team/                 # Team page with D3.js organizational chart
│   │   ├── workshop/             # Workshops page, workshop cards, modal, data (workshops.json)
│   │   ├── Home.module.css       # Homepage specific styles
│   │   ├── globals.css           # Global CSS styles
│   │   ├── layout.js             # Root layout for Next.js App Router
│   │   └── page.js               # Homepage
│   ├── components/               # Reusable React components (navbar, footer, cart, performer cards, UI elements)
│   │   ├── ui/                   # Shadcn/ui or similar components
│   ├── context/                  # React Contexts (AuthUserContext, CartContext)
│   ├── hooks/                    # Custom React Hooks (e.g., useInvoices, useProducts)
│   ├── lib/                      # Utility functions, helpers, and configurations
│   │   ├── checkout.js           # Checkout logic
│   │   ├── firebase.js           # Firebase client-side config
│   │   ├── firebaseAdmin.js      # Firebase Admin SDK config for server-side
│   │   ├── nttpay.js             # NTT Pay (Atom Technologies) encryption/decryption utilities
│   │   ├── pricing_algo.js       # Pricing algorithms (if any)
│   │   ├── schemas.js            # Zod schemas for validation
│   │   └── utils.js / utils.ts   # General utility functions
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── next.config.mjs               # Next.js configuration
├── package.json                  # Project dependencies and scripts
├── postcss.config.mjs            # PostCSS configuration (for Tailwind CSS)
├── README.md                     # Project README
├── tsconfig.json                 # TypeScript configuration
└── jsconfig.json                 # JavaScript configuration (if not using TypeScript widely)
```

---

## 🤝 Contributing

We welcome contributions to make Celesta '25 even better! If you'd like to contribute, please follow these steps:

1.  **Fork** the repository.
2.  **Clone** your forked repository: `git clone https://github.com/your-username/celesta-25-site.git`
3.  **Create a new branch**: `git checkout -b feature/your-feature-name`
4.  **Make your changes** and commit them with descriptive commit messages.
5.  **Push** your changes to your fork: `git push origin feature/your-feature-name`
6.  **Open a Pull Request** to the `main` branch of the original repository.

Please ensure your code adheres to the existing style and conventions.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file (if present, otherwise assume MIT for open-source project) for details.

---

Made with ❤️ by the Developers of Celesta '25.
