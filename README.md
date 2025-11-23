# Regal Wallet

A full-stack Web3 wallet application built with Next.js, enabling cryptocurrency management, blockchain interactions, and decentralized application connectivity.

## ✨ Features

- **Web3 Wallet Integration** - Connect and manage cryptocurrency wallets using Web3Modal and WalletConnect
- **Blockchain Interactions** - Send, receive, and manage crypto assets across multiple chains
- **Real-time Updates** - Live balance and transaction updates via WebSocket connections
- **User Authentication** - Secure authentication and session management
- **Transaction History** - Track and monitor all wallet transactions
- **Multi-chain Support** - Support for Ethereum and EVM-compatible chains
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Database Integration** - MongoDB for user data and transaction records
- **Customer Support** - Integrated Tawk.to live chat support
- **State Management** - Redux Toolkit for predictable state management

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14.2.4
- **UI Library:** React 18
- **Styling:** Tailwind CSS 3.4.1
- **State Management:** Redux Toolkit 2.2.6
- **Data Fetching:** TanStack React Query 5.48.0, SWR 2.2.5
- **Icons:** React Icons 5.2.1

### Web3 & Blockchain
- **Wallet Connection:** Web3Modal 5.0.3, Wagmi 2.10.7
- **Blockchain Libraries:** Ethers.js 5.3.1, Web3.js 4.11.1, Viem 2.16.2
- **Network:** Support for Ethereum and EVM-compatible chains

### Backend
- **Database:** MongoDB 6.7 with Mongoose 8.4.4
- **API Requests:** Axios 1.7.2
- **Scheduled Tasks:** Node-cron 3.0.3
- **Real-time:** WebSocket (ws 8.18.0)

### Additional Services
- **Email:** EmailJS 3.2.0
- **Live Chat:** Tawk.to 2.0.2
- **Image Optimization:** Sharp 0.33.4

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun
- MongoDB (local or cloud instance)
- A Web3 wallet (MetaMask, WalletConnect-compatible, etc.)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zahra-hsb/wallet.git
   cd wallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string
   
   # Web3
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   NEXT_PUBLIC_CHAIN_ID=1
   
   # EmailJS
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
   
   # Tawk.to
   NEXT_PUBLIC_TAWK_PROPERTY_ID=your_tawk_property_id
   NEXT_PUBLIC_TAWK_WIDGET_ID=your_tawk_widget_id
   
   # API
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Start MongoDB**

   Make sure your MongoDB instance is running and accessible.

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
wallet/
├── back-end/           # Backend logic and API handlers
├── public/             # Static assets (images, icons, etc.)
├── src/
│   ├── app/           # Next.js app directory (pages, layouts)
│   ├── components/    # React components
│   ├── lib/           # Utility functions and helpers
│   ├── store/         # Redux store configuration
│   └── styles/        # Global styles
├── .eslintrc.json     # ESLint configuration
├── .gitignore         # Git ignore rules
├── .liaraignore       # Liara deployment ignore rules
├── jsconfig.json      # JavaScript configuration
├── next.config.mjs    # Next.js configuration
├── package.json       # Project dependencies
├── postcss.config.mjs # PostCSS configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## ⚙️ Configuration

### Web3Modal Setup

To get your WalletConnect Project ID:
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy the Project ID to your `.env.local` file

### MongoDB Setup

You can use:
- **Local MongoDB:** Install MongoDB locally and use `mongodb://localhost:27017/wallet`
- **MongoDB Atlas:** Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

### EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Copy your Service ID, Template ID, and User ID

### Tawk.to Setup

1. Sign up at [Tawk.to](https://www.tawk.to/)
2. Create a new property
3. Get your Property ID and Widget ID from the admin panel

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Features Breakdown

### Wallet Connection
Connect various Web3 wallets including MetaMask, WalletConnect, Coinbase Wallet, and more through Web3Modal integration.

### Transaction Management
Send and receive cryptocurrency with real-time transaction tracking and confirmation.

### Multi-chain Support
Switch between different blockchain networks seamlessly with support for Ethereum and EVM-compatible chains.

### Security
- Secure wallet connections
- No private keys stored on servers
- Client-side transaction signing
- MongoDB for secure data storage

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zahra-hsb/wallet)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy to Liara

This project includes `.liaraignore` for Liara deployment:

1. Install Liara CLI: `npm install -g @liara/cli`
2. Login: `liara login`
3. Deploy: `liara deploy`

## 🔐 Environment Variables

Required environment variables for deployment:

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Project ID | Yes |
| `NEXT_PUBLIC_CHAIN_ID` | Default blockchain chain ID | Yes |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID | Optional |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID | Optional |
| `NEXT_PUBLIC_EMAILJS_USER_ID` | EmailJS user ID | Optional |
| `NEXT_PUBLIC_TAWK_PROPERTY_ID` | Tawk.to property ID | Optional |
| `NEXT_PUBLIC_TAWK_WIDGET_ID` | Tawk.to widget ID | Optional |

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 14.2.4 | React framework |
| react | ^18 | UI library |
| @reduxjs/toolkit | ^2.2.6 | State management |
| @tanstack/react-query | ^5.48.0 | Data fetching |
| @web3modal/wagmi | ^5.0.3 | Wallet connection |
| axios | ^1.7.2 | HTTP client |
| ethers | ^5.3.1 | Ethereum library |
| mongodb | 6.7 | Database driver |
| mongoose | ^8.4.4 | MongoDB ORM |
| react-redux | ^9.1.2 | Redux bindings |
| swr | ^2.2.5 | Data fetching |
| wagmi | ^2.10.7 | React hooks for Ethereum |
| web3 | ^4.11.1 | Web3 library |
| ws | ^8.18.0 | WebSocket library |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Wallet Connection Issues
- Ensure you have a Web3 wallet installed (MetaMask, etc.)
- Check that your WalletConnect Project ID is valid
- Try clearing browser cache and reconnecting

### MongoDB Connection Issues
- Verify your MongoDB URI is correct
- Ensure MongoDB is running and accessible
- Check network/firewall settings

### Build Issues
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Check Node.js version (18.0 or higher required)

## 🔒 Security Notes

- Never commit your `.env.local` file
- Keep your WalletConnect Project ID secure
- Regularly update dependencies for security patches
- This application does not store private keys
- Always verify contract addresses before transactions

## 📄 License

This project is private and not licensed for public use.

## 📞 Support

For support and questions:
- Open an issue on GitHub
- Use the integrated Tawk.to chat support
- Contact via email integration

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Wallet integration powered by [Web3Modal](https://web3modal.com/)
- Blockchain interactions via [Ethers.js](https://docs.ethers.io/) and [Web3.js](https://web3js.readthedocs.io/)
- Database powered by [MongoDB](https://www.mongodb.com/)
- State management with [Redux Toolkit](https://redux-toolkit.js.org/)

---

**Made with care by [zahra-hsb](https://github.com/zahra-hsb)**
