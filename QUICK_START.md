# Quick Start Guide - Fix "Connection Refused" Error

## The Problem
You're seeing `ERR_CONNECTION_REFUSED` because the Next.js development server isn't running. This happens because:
1. Node.js/npm is not installed, OR
2. Dependencies aren't installed, OR  
3. The dev server isn't started

## Solution - Step by Step

### Step 1: Install Node.js (Required)

**Download and Install:**
1. Go to: https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer
4. **Important**: Restart your terminal/command prompt after installation
5. Restart Cursor IDE if needed

**Verify Installation:**
Open a new terminal and run:
```bash
node --version
npm --version
```

Both commands should show version numbers (e.g., `v20.10.0` and `10.2.3`)

### Step 2: Install Project Dependencies

Open a terminal in this project folder (`c:\Users\enriq\Desktop\Cursor`) and run:

```bash
npm install
```

This will take 1-2 minutes and install all required packages.

### Step 3: Start the Development Server

After dependencies are installed, run:

```bash
npm run dev
```

You should see output like:
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### Step 4: Open in Browser

Once the server is running, open your browser and go to:
```
http://localhost:3000
```

The app should now work!

## Troubleshooting

### If `npm install` fails:
- Make sure Node.js is installed (Step 1)
- Restart your terminal after installing Node.js
- Try running as Administrator

### If `npm run dev` fails:
- Check that `.env.local` exists with your InstantDB app ID
- Make sure port 3000 isn't already in use
- Check the error message in the terminal

### If browser still shows connection refused:
- Make sure `npm run dev` is still running (don't close the terminal)
- Check the terminal for any error messages
- Try refreshing the browser (Ctrl+R or F5)

## What Each Command Does

- `npm install` - Downloads and installs all required packages (Next.js, React, InstantDB, etc.)
- `npm run dev` - Starts the Next.js development server on port 3000
- The server must stay running for the app to work

## Need Help?

If you're still having issues:
1. Check the terminal output for specific error messages
2. Verify Node.js is installed: `node --version`
3. Make sure you're in the correct directory: `c:\Users\enriq\Desktop\Cursor`
