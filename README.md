# Community Food Sharing

A platform for sharing surplus food within communities to reduce waste and help those in need.

## Deployment to Vercel

### Environment Variables

When deploying to Vercel, you only need to set:

- `MONGODB_URI`: Your MongoDB connection string

### Build Configuration

The application is configured to ignore ESLint and TypeScript errors during build, which ensures successful deployment even if there are linting issues.

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
