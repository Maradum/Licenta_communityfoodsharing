# Community Food Sharing

A platform for sharing surplus food within communities to reduce waste and help those in need.

## Deployment to Vercel

### Environment Variables

When deploying to Vercel, you only need to set:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

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
3. Create a `.env` file with the required environment variables
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
