
# Community Food Sharing

A platform for sharing surplus food within communities to reduce waste and help those in need.

## Getting Started

### Prerequisites

- Node.js 18+ (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Maradum/Licenta_communityfoodsharing.git
   cd Licenta_communityfoodsharing
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with the required environment variables:
   ```env
   DATABASE_URL=mysql://root:DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS@mainline.proxy.rlwy.net:47569/railway
   JWT_SECRET=foodsharing_jwt_secret_2024
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Accounts

This application does not include predefined demo accounts.  
You can test the app by creating a new user via the Sign Up page.

### Account Roles

Users can sign up as:
- **Food Donor** – users who wish to donate food.
- **Food Receiver** – users who are looking to receive food support.

> 🔐 Admin role is not implemented in the current version.

## Build for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Deployment to Vercel

### Environment Variables

When deploying to Vercel, set:

- `DATABASE_URL`: Your MySQL database connection string (from Railway)
- `JWT_SECRET`: Secret key for JWT token generation

### Database

This app uses a MySQL database hosted on Railway, with Sequelize ORM.  
Tables are auto-created on first connection using `sequelize.sync()`.

### Build Configuration

The app is configured to ignore ESLint and TypeScript errors during build to ensure successful deployment.

### Dependency Resolution

Includes an override for `react-speech-kit` to ensure compatibility with React 19:

```json
"overrides": {
  "react-speech-kit": {
    "react": "$react"
  }
}
```

Also includes `.npmrc` with `legacy-peer-deps=true` to ensure correct installs.

## Local Development Recap

```bash
# Clone the repository
git clone https://github.com/Maradum/Licenta_communityfoodsharing.git
cd Licenta_communityfoodsharing

# Install dependencies
npm install

# Create a .env file
DATABASE_URL=mysql://root:DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS@mainline.proxy.rlwy.net:47569/railway
JWT_SECRET=foodsharing_jwt_secret_2024

# Start development
npm run dev
```

## License

This project is for educational purposes only.
