# OpayCam - Mobile Finance for Cameroon

A comprehensive mobile finance platform for Cameroon, combining powerful features with a familiar, trusted user interface.

## 🚀 Project Overview

OpayCam is a React Native mobile application that provides:
- **Money Management**: Send/receive money, cash-in/out, bank transfers
- **Payments & Bills**: Utilities, airtime, data, merchant payments
- **Savings & Investments**: Flexible savings, fixed deposits
- **Lending & Credit**: Micro-loans, group lending schemes

## 📁 Project Structure

```
opaycam/
├── mobile/           # React Native mobile app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── screens/       # Screen components
│   │   ├── theme/         # Colors, typography, spacing
│   │   ├── navigation/    # Navigation setup
│   │   ├── services/      # API & business logic
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Helper functions
│   ├── android/      # Android native code
│   ├── ios/          # iOS native code
│   └── package.json
├── backend/          # Backend services (future)
├── docs/             # Documentation & branding
│   └── branding/     # Brand identity specs
└── README.md
```

## 🎨 Design System

**Color Palette:**
- Primary: OpayCam Yellow (#FFD700)
- Secondary: Deep Corporate Blue (#003366)
- Semantic: Success (#28A745), Warning (#FFA500), Error (#DC3545)

**Typography:**
- Font Family: Inter
- Sizes: H1 (32px), H2 (24px), Body (16px), Caption (12px)

**Spacing:**
- 8px grid system (4, 8, 16, 24, 32, 48, 64)

See [Brand Identity](./docs/branding/BRAND_IDENTITY.md) for complete guidelines.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm or Yarn
- React Native development environment:
  - **For Android**: Android Studio, JDK 17+
  - **For iOS**: Xcode, CocoaPods (macOS only)

### Installation

```bash
# Clone the repository
git clone https://github.com/YourUsername/OpayCam.git
cd OpayCam

# Navigate to mobile directory
cd mobile

# Install dependencies
npm install
# or
yarn install
```

### Running the App

#### iOS (macOS only)

```bash
# Install iOS dependencies
cd ios
pod install
cd ..

# Run on iOS simulator
npm run ios
# or
yarn ios
```

#### Android

```bash
# Make sure Android emulator is running or device is connected
npm run android
# or
yarn android
```

#### Start Metro Bundler

```bash
npm start
# or
yarn start
```

## 📱 Current Features

### ✅ Implemented
- Home screen with balance display
- Quick actions grid (8 actions)
- Recent transactions list
- Bottom tab navigation
- Complete theme system
- TypeScript support

### 🚧 In Progress
- Navigation between screens
- Authentication flow
- API integration

### 📋 Planned
- Money transfer functionality
- Bill payment integration
- Savings account management
- Loan application system
- QR code payments
- Analytics dashboard

## 🧪 Testing

```bash
# Run tests
npm test

# Run type checking
npm run tsc

# Run linter
npm run lint
```

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For inquiries or collaboration:
- GitHub Issues: [Create an issue](https://github.com/YourUsername/OpayCam/issues)
- Email: [Your contact email]

## 🙏 Acknowledgments

- Inspired by leading fintech platforms
- Built with React Native and TypeScript
- Designed for the Cameroonian market

---

**Made with ❤️ for Cameroon**
