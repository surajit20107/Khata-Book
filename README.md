# Khata Book 📔

A professional and modern digital ledger application built with Next.js 15, designed to manage daily financial records (Hisab) with ease and security.

## 🚀 Features

- **User Authentication**: Secure Login and Registration using JWT and Bcrypt.
- **Digital Ledger**: Track your daily transactions (Hisab) efficiently.
- **Modern UI**: Built with Tailwind CSS 4 for a sleek, responsive design.
- **Database**: Integrated with MongoDB using Mongoose for robust data persistence.
- **Form Validation**: Type-safe validations with Zod.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)

## 🏁 Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd khata-book
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

## 📂 Project Structure

- `src/app`: Next.js App Router (Pages and API Routes)
- `src/components`: Reusable UI components (Header, Footer, etc.)
- `src/lib`: Core logic (Auth, DB connection, Utils, Validations)
- `src/models`: Mongoose schemas for User and Hisab
- `src/middleware.ts`: Security and route protection

## 📄 License

This project is licensed under the MIT License.
