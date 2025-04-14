# Community Food Sharing

A platform for sharing surplus food within communities to reduce waste and help those in need.

## Getting Started

### Prerequisites

- Node.js 18+ (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/communityfoodsharing.git
   cd communityfoodsharing
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with the required environment variables:
   ```
   DATABASE_URL=mysql://root:DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS@mainline.proxy.rlwy.net:47569/railway
   JWT_SECRET=foodsharing_jwt_secret_2024
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Accounts

Currently, this application does not include predefined demo accounts.  
You can test the app by creating a new user via the Sign Up page.

### Account Role

Users can sign up either as:
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

When deploying to Vercel, you need to set:

- `DATABASE_URL`: Your MySQL database connection string (from Railway)
- `JWT_SECRET`: Secret key for JWT token generation

### Database

This application uses a MySQL database hosted on Railway. The database connection is configured using Sequelize ORM.

Database tables are automatically created on first connection if they don't exist (using `sequelize.sync()`).

### Build Configuration

The application is configured to ignore ESLint and TypeScript errors during build, which ensures successful deployment even if there are linting issues.

### Dependency Resolution

The project includes an override for `react-speech-kit` to resolve compatibility issues with React 19. This is handled in the package.json file with:

```json
"overrides": {
  "react-speech-kit": {
    "react": "$react"
  }
}
```

Additionally, an `.npmrc` file with `legacy-peer-deps=true` is included to ensure proper dependency resolution.

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables:
   ```
   DATABASE_URL=mysql://root:DwpCyZFKlzRbbxVDBMUWFWzQpKzJhacS@mainline.proxy.rlwy.net:47569/railway
   JWT_SECRET=foodsharing_jwt_secret_2024
   NODE_ENV=development
   PORT=5000
   ```
4. Run the development server: `npm run dev`

## Build

To build the application locally:

```bash
npm run build
```

## Start Production Server

To start the production server locally:

```bash
npm start
```
📌 Note: Although this repository is hosted under a collaborator's GitHub account, all code, development work, and documentation were created and maintained by Mariana Dumitriu (Student ID: 2009552).
