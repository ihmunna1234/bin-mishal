# Bin Mishal Travels

A modern, full-stack web application for **Bin Mishal Travels & Tourism**, providing seamless travel management, Hajj & Umrah packages, visa processing, flight bookings, and tour packages with an admin management portal.

---

## 🚀 Features

- **Services Showcase**:
  - **Hajj & Umrah Packages**: Detailed package tiers, inclusions, itineraries, and booking inquiries.
  - **Flight Bookings**: Search assistance and flight reservation management.
  - **Visa Processing**: Streamlined visa applications and requirements guide.
  - **Tour Packages & Hotel Reservations**: Curated tour packages and accommodation bookings.
- **Authentication & Security**:
  - Supabase SSR Authentication with session management.
  - Role-Based Access Control (RBAC) via Next.js Middleware.
- **Admin Dashboard**:
  - Manage bookings, customer inquiries, services, and user roles.
- **Responsive & Modern UI**:
  - Built with Next.js 14 App Router, Tailwind CSS, and Lucide React icons.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) & [Supabase PostgreSQL](https://supabase.com/)
- **Authentication**: [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/nextjs)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📋 Prerequisites

Before running the project, ensure you have:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or `pnpm` / `yarn`)
- **Supabase Account**: A Supabase project set up with PostgreSQL database access.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory (refer to `.env.example`):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database Connections (Prisma)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

---

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd bin-mishal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Copy `.env.example` to `.env.local` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```

4. **Sync Database Schema**:
   Generate Prisma client and push the schema to Supabase:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the Next.js development server on port 3000 |
| **Build** | `npm run build` | Builds the application for production |
| **Start** | `npm run start` | Starts the production server |
| **Lint** | `npm run lint` | Runs Next.js ESLint check |
| **Typecheck** | `npm run typecheck` | Validates TypeScript types across the project |

---

## 📁 Project Structure

```text
bin-mishal/
├── prisma/
│   └── schema.prisma         # Prisma schema definition
├── src/
│   ├── app/                  # Next.js App Router pages & API routes
│   │   ├── admin/            # Admin portal dashboard
│   │   ├── api/              # API route handlers
│   │   ├── login/            # Authentication login page
│   │   ├── services/         # Travel service detail pages
│   │   ├── globals.css       # Global styles & Tailwind imports
│   │   └── page.tsx          # Homepage
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Database clients & utility functions
│   │   ├── prisma.ts         # Prisma client instance
│   │   └── supabase/         # Supabase client configurations
│   ├── middleware.ts         # Authentication & route protection middleware
│   └── types/                # TypeScript type declarations
├── .env.example              # Example environment configuration
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

---

## 📄 License

Private repository for Bin Mishal Travels. All rights reserved.
