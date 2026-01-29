# Setup Instructions

## Step 1: Install Node.js (if not already installed)

1. Download Node.js from: https://nodejs.org/
2. Install it (includes npm)
3. Restart your terminal/command prompt

## Step 2: Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- Next.js
- React
- InstantDB
- TypeScript
- Tailwind CSS

## Step 3: Verify Environment Variables

Make sure `.env.local` exists in the root directory with:

```
NEXT_PUBLIC_INSTANT_APP_ID=1ee7619b-194f-423c-84f0-19d6a00b05ef
```

## Step 4: Start the Development Server

```bash
npm run dev
```

The app should be available at: http://localhost:3000

## Step 5: Open in Browser

Open your browser and navigate to: http://localhost:3000

## Common Issues

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Install Node.js from nodejs.org
- Restart terminal after installation

### "Port 3000 is already in use"
- Another app is using port 3000
- Kill the process or use: `npm run dev -- -p 3001`

### "Module not found" errors
- Dependencies not installed: Run `npm install`
- Clear cache: Delete `node_modules` and `.next` folders, then `npm install` again

### Blank page or errors in browser
- Check browser console (F12) for specific errors
- Verify `.env.local` exists with correct app ID
- Check terminal for build errors

## Verification Checklist

- [ ] Node.js installed (`node --version` shows 18+)
- [ ] npm installed (`npm --version` works)
- [ ] Dependencies installed (`node_modules` folder exists)
- [ ] `.env.local` file exists with app ID
- [ ] Dev server starts without errors
- [ ] Browser opens to http://localhost:3000
- [ ] No errors in browser console (F12)
