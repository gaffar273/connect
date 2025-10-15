# Deployment Guide

## Vercel Deployment

This project is configured for deployment to Vercel with separate frontend and backend deployments.

### Frontend (client)

1. Environment Variables:
   - Create `.env.production` with:
     ```
     REACT_APP_BACKEND_URL=https://your-backend-url.vercel.app
     ```

2. Vercel Settings:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### Backend (server)

1. Environment Variables (in Vercel):
   - `MONGO_URL` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `NODE_ENV` - Set to "production"

2. Vercel Settings:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`

### CORS Configuration

The server is configured to accept requests from:
- `http://localhost:3000`
- `https://connectags-git-main-gaffar273s-projects.vercel.app`
- `https://connectags.vercel.app`
- `https://connect-git-main-gaffar273s-projects.vercel.app`
- Any URL ending with `.vercel.app`

### Troubleshooting

1. If you encounter CORS errors:
   - Check that the frontend is making requests to the correct backend URL
   - Verify that the backend URL is in the allowed origins list in `server.js`
   - Ensure both frontend and backend are deployed and running

2. If environment variables are not loading:
   - For frontend: Make sure variables are prefixed with `REACT_APP_`
   - For backend: Check that variables are correctly set in Vercel dashboard