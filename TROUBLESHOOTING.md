# Troubleshooting Guide

## App Not Working - Common Issues

### 1. Dependencies Not Installed

**Problem**: The app won't start if dependencies aren't installed.

**Solution**:
```bash
npm install
```

If `npm` is not found, make sure Node.js is installed:
- Download from: https://nodejs.org/
- Restart your terminal/command prompt after installation

### 2. Environment Variable Not Set

**Problem**: InstantDB connection fails.

**Solution**: 
- Check that `.env.local` exists in the root directory
- Verify it contains: `NEXT_PUBLIC_INSTANT_APP_ID=1ee7619b-194f-423c-84f0-19d6a00b05ef`
- Restart the dev server after changing `.env.local`

### 3. Port Already in Use

**Problem**: `Error: Port 3000 is already in use`

**Solution**:
```bash
# Kill the process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### 4. Build Errors

**Problem**: TypeScript or build errors

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next
# Or on Windows:
rmdir /s /q .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try building
npm run build
```

### 5. Browser Console Errors

**Check the browser console (F12) for specific errors:**

- **"NEXT_PUBLIC_INSTANT_APP_ID is not set"**: Environment variable issue
- **"Cannot read property 'useQuery'"**: InstantDB not initialized properly
- **"Module not found"**: Dependencies not installed

### 6. Images Not Loading

**Problem**: Template images don't appear

**Solution**:
- Verify `public/Asset/` folder exists with template images
- Check image paths in `components/Sidebar.tsx` start with `/Asset/...`
- Clear browser cache (Ctrl+Shift+R)

### 7. Canvas Not Rendering

**Problem**: Canvas preview doesn't show

**Solution**:
- Check browser console for CORS errors
- Verify images are loading properly
- Check that canvas ref is properly connected

## Quick Fix Checklist

1. ✅ Run `npm install`
2. ✅ Check `.env.local` exists with correct app ID
3. ✅ Clear `.next` folder: `rmdir /s /q .next` (Windows)
4. ✅ Restart dev server: `npm run dev`
5. ✅ Check browser console (F12) for errors
6. ✅ Verify port 3000 is available

## Getting Help

If issues persist:
1. Check browser console (F12) for error messages
2. Check terminal output for build errors
3. Verify Node.js version: `node --version` (should be 18+)
4. Verify npm version: `npm --version`
