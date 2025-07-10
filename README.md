# 💰 Personal Finance Tracker

A modern, responsive web application built with Next.js and TypeScript for managing personal finances. Track income, expenses, set savings goals, and get insights into your financial health with beautiful charts and analytics.

![Personal Finance Tracker](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?style=for-the-badge&logo=redux)

## ✨ Features

### 📊 **Dashboard Overview**

- **Real-time Balance Tracking**: Monitor your current financial status
- **Monthly Income & Expense Analytics**: Visual representation of your cash flow
- **Savings Goal Progress**: Track progress towards your financial goals
- **Recent Transactions**: Quick view of latest financial activities
- **Interactive Charts**: Beautiful pie charts for spending analysis

### 💳 **Transaction Management**

- **Add Income**: Record various income sources with custom categories
- **Add Expenses**: Track spending with detailed categorization
- **Edit Transactions**: Modify existing entries with ease
- **Delete Transactions**: Remove unwanted entries
- **Bulk Operations**: Efficient management of multiple transactions

### 🎯 **Savings Goals**

- **Set Financial Goals**: Define target amounts and timelines
- **Progress Tracking**: Visual progress indicators
- **Goal Management**: Edit and update savings objectives

### 📱 **Mobile Responsive Design**

- **Mobile-First Approach**: Optimized for all screen sizes
- **Touch-Friendly Interface**: Easy navigation on mobile devices
- **Responsive Tables**: Card-based layout on mobile, table view on desktop

### 🔐 **Authentication & Security**

- **User Registration**: Secure account creation
- **Login/Logout**: Protected access to personal data
- **Token-Based Authentication**: Secure session management
- **Protected Routes**: Automatic redirection for unauthenticated users

### 🔔 **User Experience**

- **Toast Notifications**: Real-time feedback for all actions
- **Loading States**: Smooth user experience during data operations
- **Error Handling**: Comprehensive error messages and recovery
- **Form Validation**: Client-side validation for data integrity

## 🚀 Tech Stack

### **Frontend**

- **Next.js 15.3.5**: React framework with App Router
- **TypeScript 5.8.3**: Type-safe JavaScript development
- **Tailwind CSS 4.1.11**: Utility-first CSS framework
- **Redux Toolkit 2.8.2**: State management
- **React Hook Form**: Form handling and validation
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icons
- **React Hot Toast**: Toast notifications

### **Backend Integration**

- **Axios**: HTTP client for API communication
- **JWT Decode**: Token management
- **RESTful API**: Clean API architecture

### **Development Tools**

- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **Husky**: Git hooks for code quality
- **TypeScript**: Static type checking

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Personal-Finance-Tracker-Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard and related pages
│   ├── login/            # Authentication pages
│   ├── signup/           # User registration
│   └── layout.tsx        # Root layout with providers
├── components/           # Reusable UI components
│   ├── Dashboard/        # Dashboard-specific components
│   ├── TransactionModal.tsx
│   ├── TransactionTable.tsx
│   └── ProtectedRoute.tsx
├── common/              # Shared components
│   ├── NavBar.tsx       # Navigation component
│   ├── SidebarLinks.tsx # Sidebar navigation
│   └── ProfilePopup.tsx # User profile dropdown
├── hooks/               # Custom React hooks
│   ├── useToast.ts      # Toast notification hook
│   ├── useTypedDispatch.ts
│   └── useTypedSelector.ts
├── redux/               # State management
│   ├── auth/           # Authentication state
│   ├── balance/        # Balance tracking
│   ├── expense/        # Expense management
│   ├── income/         # Income management
│   ├── savingsGoal/    # Savings goals
│   └── store.ts        # Redux store configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── api/                # API configuration
    └── axiosInstance.ts
```

## 🎨 Key Components

### **Dashboard Page**

- Financial overview with real-time data
- Interactive charts and statistics
- Quick action buttons for adding transactions

### **Transaction Management**

- **TransactionModal**: Add/edit income and expenses
- **TransactionTable**: Display and manage transactions
- **CategoryDropdown**: Dynamic category selection

### **Authentication System**

- **ProtectedRoute**: Route protection middleware
- **Login/Signup**: User authentication forms
- **NavBar**: User session management

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues

# Git Hooks
npm run prepare      # Install Husky hooks
```

## 🌐 API Integration

The application integrates with a RESTful backend API for:

- User authentication and management
- Transaction CRUD operations
- Financial analytics and reporting
- Savings goal management

### API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/user` - Get user profile
- `GET /api/income` - Fetch income data
- `POST /api/income` - Add income
- `PUT /api/income/:id` - Update income
- `DELETE /api/income/:id` - Delete income
- Similar endpoints for expenses and savings goals

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-first design** approach
- **Breakpoint-specific layouts** for different screen sizes
- **Touch-optimized interactions** for mobile devices
- **Adaptive navigation** (sidebar on desktop, hamburger menu on mobile)

## 🔔 Toast Notifications

Comprehensive feedback system using react-hot-toast:

- **Success notifications** for successful operations
- **Error notifications** for failed operations
- **Info notifications** for general information
- **Consistent styling** across the application

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

- **Netlify**: Build command: `npm run build`
- **Railway**: Automatic deployment from GitHub
- **AWS Amplify**: Full-stack deployment solution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS approach
- **Redux Toolkit** for simplified state management
- **React Hot Toast** for beautiful notifications
- **Lucide React** for the icon library

## 📞 Support

For support and questions:

- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
