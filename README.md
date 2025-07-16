# 🌐 WorkNet - Freelancer Marketplace

A modern, serverless-first freelancer marketplace built with SvelteKit, enabling remote service outsourcing between clients and skilled freelancers.

## 🎯 Project Overview

WorkNet is a comprehensive platform where:
- **Clients** post remote jobs and hire freelancers
- **Freelancers** showcase skills, apply to projects, and deliver work
- **Admins** moderate the platform and ensure quality standards

Built with a serverless-first architecture and deployed entirely on Vercel for optimal performance and scalability.

## ✨ Features

### 👥 For Freelancers
- **Profile Management**: Create detailed profiles with skills, hourly rates, and portfolio
- **Job Discovery**: Browse and filter available projects
- **Proposal System**: Submit customized proposals with pricing
- **Project Management**: Track active work and communicate with clients
- **Reputation Building**: Receive ratings and reviews from clients

### 🏢 For Clients
- **Job Posting**: Create detailed project listings with budgets and deadlines
- **Freelancer Discovery**: Browse profiles and review portfolios
- **Proposal Management**: Review and compare freelancer proposals
- **Project Oversight**: Communicate with freelancers and track progress
- **Quality Assurance**: Rate and review completed work

### 🛡️ For Administrators
- **User Management**: View, suspend, or reinstate user accounts
- **Content Moderation**: Flag inappropriate content and manage platform quality
- **Analytics Dashboard**: Monitor platform usage and performance metrics
- **Audit Logging**: Track all administrative actions for accountability
- **System Oversight**: Comprehensive platform management tools

## 🛠 Tech Stack

### Frontend
- **SvelteKit** - Full-stack framework with SSR and API routes
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system

### Backend & Database
- **SvelteKit API Routes** - Serverless backend functions
- **Neon PostgreSQL** - Serverless-native database
- **Prisma ORM** - Type-safe database access with migrations

### External Services
- **Cloudinary** - Image and file upload management
- **Supabase Realtime** - Real-time chat and notifications
- **Vercel** - Deployment and hosting platform

### Development Tools
- **ESLint & Prettier** - Code formatting and linting
- **Vitest** - Testing framework
- **TypeScript** - Static type checking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/pnpm/yarn
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WorkNet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/worknet"
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   
   # Supabase
   SUPABASE_URL="your-supabase-url"
   SUPABASE_ANON_KEY="your-supabase-anon-key"
   
   # Session Secret
   SESSION_SECRET="your-session-secret"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view the application.

## 📁 Project Structure

```
src/
├── routes/                   # SvelteKit routes
│   ├── auth/                # Authentication pages
│   │   ├── login/          # User login
│   │   └── register/       # User registration
│   ├── dashboard/           # User dashboards
│   │   ├── client/         # Client-specific dashboard
│   │   └── freelancer/     # Freelancer-specific dashboard
│   ├── admin/              # Admin panel
│   │   ├── dashboard/      # Admin overview
│   │   ├── users/          # User management
│   │   ├── jobs/           # Job moderation
│   │   └── analytics/      # Platform analytics
│   └── api/                # API endpoints
│       ├── auth/           # Authentication endpoints
│       ├── jobs/           # Job management
│       ├── proposals/      # Proposal handling
│       ├── messages/       # Chat system
│       └── admin/          # Admin operations
├── lib/                    # Shared utilities
│   ├── prisma.ts          # Database client
│   ├── auth.ts            # Authentication logic
│   └── utils.ts           # Helper functions
├── components/             # Reusable UI components
│   ├── JobCard.svelte     # Job listing component
│   ├── ProposalCard.svelte # Proposal display
│   └── ChatWidget.svelte  # Real-time chat
└── hooks.server.ts        # Server-side hooks for auth
```

## 🗄️ Database Schema

### Core Tables
- **users**: User accounts with role-based access
- **freelancer_profiles**: Extended freelancer information
- **jobs**: Client job postings
- **proposals**: Freelancer job applications
- **messages**: Real-time chat system
- **reviews**: Rating and feedback system
- **admin_logs**: Audit trail for admin actions

### Key Relationships
- Users can be freelancers, clients, or admins
- Jobs belong to clients and receive proposals from freelancers
- Messages connect users within job contexts
- Reviews link completed jobs with participants

## 🎨 Design System

### Color Palette
- **Primary**: `#1B1F3B` (Deep Navy)
- **Accent**: `#38B2AC` (Teal), `#9F7AEA` (Purple)
- **Background**: `#F7FAFC` (Light Gray)
- **Text**: Various shades for hierarchy

### Typography
- **Primary**: Manrope, Inter, Open Sans
- **Hierarchy**: Consistent sizing and weights

### Components
- Minimal, functional dashboard design
- Consistent spacing and layout patterns
- Accessible color contrasts and interactive states

## 🔐 Authentication & Security

### User Roles
- **Freelancer**: Can create profiles, apply to jobs, message clients
- **Client**: Can post jobs, hire freelancers, manage projects
- **Admin**: Platform moderation and management (cannot self-register)

### Security Features
- Secure password hashing with bcrypt
- Session-based authentication
- Role-based route protection
- Input validation and sanitization
- Admin action audit logging

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Link your GitHub repository to Vercel
   - Configure build settings for SvelteKit

2. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Ensure database connection is configured for production

3. **Database Migration**
   ```bash
   npx prisma db push
   ```

4. **Deploy**
   - Push to main branch for automatic deployment
   - Monitor build logs and deployment status

### Production Checklist
- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] Admin user created manually in database
- [ ] Cloudinary integration tested
- [ ] Supabase realtime configured
- [ ] Error monitoring setup

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration
```

## 📊 Admin Setup

### Creating First Admin User
Since admins cannot self-register, create the first admin directly in the database:

```sql
INSERT INTO users (name, email, password_hash, role, status)
VALUES ('Admin User', 'admin@worknet.com', 'hashed_password', 'admin', 'active');
```

Or use the Prisma client:
```typescript
await prisma.user.create({
  data: {
    name: 'Admin User',
    email: 'admin@worknet.com',
    passwordHash: await bcrypt.hash('secure_password', 10),
    role: 'admin',
    status: 'active'
  }
});
```

## 🔄 Development Workflow

1. **Feature Development**
   - Create feature branch from `develop`
   - Implement features with tests
   - Submit pull request for review

2. **Database Changes**
   - Update Prisma schema
   - Generate migration
   - Test migration locally

3. **Deployment**
   - Merge to `develop` for staging
   - Merge to `main` for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in `METHODOLOGY.md`
- Review the codebase for implementation details

---

Built with ❤️ using SvelteKit and deployed on Vercel
