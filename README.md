This is a [Next.js](https://nextjs.org) project designed to replicate the Supabase Dashboard UI and provide an AI-powered SQL Agent.

## Environment Variables

To deploy this project successfully, set the following environment variables in your deployment platform (e.g., Vercel):

```env
# OAuth Credentials (from Supabase Dashboard > Organization Settings)
SUPABASE_CLIENT_ID=your_client_id
SUPABASE_CLIENT_SECRET=your_client_secret

# Redirect URI (must match your OAuth app config)
NEXT_PUBLIC_REDIRECT_URI=https://your-domain.com/api/callback

# Public ID for OAuth initiation
NEXT_PUBLIC_SUPABASE_CLIENT_ID=your_client_id
```

## Backend Requirements

The **AI Data Agent** requires a separate Python backend to handle complex SQL generation and schema analysis. Ensure your backend endpoint is accessible by the Next.js API routes defined in `src/app/api/agent/`.

## Deployment on Vercel

The easiest way to deploy is via the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Import the project to Vercel.
3. Add the Environment Variables listed above.
4. Deploy!
