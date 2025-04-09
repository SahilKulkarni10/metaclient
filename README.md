# MetaConnect - Tech Skills Exchange Platform

MetaConnect is a React Native mobile application designed to connect developers and tech professionals for skill exchange, collaboration, and learning opportunities. The platform facilitates bartering of tech skills, code collaboration sessions, and community building among developers.

![MetaConnect App](./assets/images/logo.png)

## Features

### Core Features
- **Skill Exchange Marketplace**: Find developers with complementary skills and exchange knowledge
- **Code Collaboration**: Collaborate on real projects with other developers
- **Messaging System**: Direct messaging with other tech professionals
- **User Profiles**: Showcase your skills, projects, and experience
- **Project Showcase**: Display ongoing and completed collaboration projects
- **Live Coding Sessions**: Real-time collaborative coding sessions
- **Community Building**: Connect with local tech communities

### Technical Features
- Built with React Native and Expo
- Modern UI with animations and transitions using Reanimated
- Clean and intuitive interface using custom components
- Tab-based navigation with Expo Router
- User authentication flow
- Responsive layouts for various device sizes

## Screens

### Main Screens
- **Home/Explore**: Discover developers and skills
- **Collaborate**: Find projects and collaboration opportunities
- **Messages**: Direct messaging with other users
- **Schedule**: Plan and schedule learning sessions
- **Community**: Discover and join tech meetups
- **Profile**: Your personal profile and settings

### Authentication Screens
- **Login**: User login screen
- **Sign Up**: New user registration with skill selection

## Getting Started

### Prerequisites
- Node.js (v14 or newer)
- npm or Yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/metaconnect.git
cd metaconnect
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your device or emulator:
   - Scan the QR code with the Expo Go app on your phone
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator

## Project Structure

```
metaclient/
├── app/                    # Main application code
│   ├── (tabs)/             # Tab-based navigation screens
│   │   ├── _layout.tsx     # Tab navigation configuration
│   │   ├── home.tsx        # Home/Explore screen
│   │   ├── collaborate.tsx # Collaboration screen
│   │   ├── messages.tsx    # Messaging screen
│   │   └── ...             # Other tab screens
│   ├── _layout.tsx         # Root layout configuration
│   ├── index.tsx           # Welcome/landing screen
│   ├── login.tsx           # Login screen
│   └── signup.tsx          # Sign up screen
├── assets/                 # Static assets
│   ├── images/             # Image assets
│   │   ├── avatars/        # User avatar images
│   │   └── logo.png        # App logo
├── components/             # Reusable UI components
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Roadmap

- Backend API integration
- Push notifications
- Video calling integration
- Skill verification
- Rating and review system
- Enhanced project management tools
- Offline support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Setting up Google OAuth with Clerk

To enable the "Continue with Google" feature:

1. Log in to your Clerk Dashboard at https://dashboard.clerk.dev/
2. Navigate to your application
3. Go to "JWT Templates" and click on "Configure" for the Google provider
4. Click "Enable" to enable Google OAuth
5. Set up your OAuth credentials:
   - Create a Google Cloud Platform project (if you don't have one)
   - Configure OAuth consent screen
   - Create OAuth credentials (Web application type)
   - Add the following Authorized redirect URIs:
     - `https://accounts.metaclient.clerk.accounts.dev/oauth/google/callback`
     - `https://accounts.clerk.accounts.dev/oauth/google/callback`
     - `metaclient://oauth-native-callback`
6. Copy the Client ID and Client Secret from Google Cloud Console
7. Add these to the Clerk Dashboard Google OAuth settings
8. Save your settings

Make sure the `CLERK_PUBLISHABLE_KEY` in your .env file is up to date.
