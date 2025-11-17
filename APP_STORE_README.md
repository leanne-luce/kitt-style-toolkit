# Quick Start: Deploying to iOS App Store

## TL;DR - Fast Track

If you just want to get started quickly:

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure Build**
   ```bash
   eas build:configure
   ```

4. **Build for iOS**
   ```bash
   eas build --platform ios --profile production
   ```

5. **Submit to App Store**
   ```bash
   eas submit --platform ios --latest
   ```

## What You Need First

### Required Accounts (Do These First!)
1. **Apple Developer Account** - https://developer.apple.com/programs/ ($99/year)
2. **Expo Account** - https://expo.dev (Free)

### Required Files (Already Set Up!)
- ✅ `app.json` - Configured with iOS settings
- ✅ `eas.json` - Build configuration ready
- ✅ Bundle ID: `com.kittstyletoolkit.app`

### To-Do Before Building
- [ ] Create app icon (1024x1024 PNG) and replace `./assets/images/icon.png`
- [ ] Create privacy policy and host it online
- [ ] Create demo account for App Store reviewers
- [ ] Prepare screenshots (use iOS simulator or real device)

## Building Your First Version

### Step 1: Build
```bash
# This will take 10-20 minutes
eas build --platform ios --profile production
```

During the build, EAS will ask for:
- Your Apple ID
- Apple ID password (or app-specific password)

### Step 2: Create App in App Store Connect
1. Go to https://appstoreconnect.apple.com/
2. Click "My Apps" → "+"
3. Create new app with Bundle ID: `com.kittstyletoolkit.app`
4. Note the **App ID** (10-digit number)

### Step 3: Update eas.json
Replace in `eas.json`:
```json
"appleId": "your-email@example.com",
"ascAppId": "1234567890",
"appleTeamId": "ABC123XYZ"
```

Find Team ID: https://developer.apple.com/ → Account → Membership

### Step 4: Submit
```bash
eas submit --platform ios --latest
```

### Step 5: Fill Out App Store Connect
1. Upload screenshots
2. Add description
3. Add privacy policy URL
4. Select age rating
5. Create demo account for reviewers
6. Submit for review

## Common Issues

### "Bundle identifier taken"
Change it in `app.json`:
```json
"bundleIdentifier": "com.yourname.kittstyletoolkit"
```

### Build fails
Check the logs in https://expo.dev/builds

### Need app icon
Use https://www.appicon.co/ to generate from your design

## Screenshots Quick Guide

Use iOS Simulator to take screenshots:
1. Open app in iOS Simulator (`expo start` → press `i`)
2. Navigate to your best screens
3. Press Cmd+S to save screenshot
4. Screenshots saved to Desktop

**Required sizes:**
- 6.7" Display: 1290 x 2796 (iPhone 15 Pro Max)
- 5.5" Display: 1242 x 2208 (iPhone 8 Plus)

Take at least 3-5 screenshots showing:
- Main screen with horoscope
- Weather recommendations
- Vogue Archive search
- Profile/settings

## Privacy Policy Quick Setup

1. Customize `PRIVACY_POLICY_TEMPLATE.md`
2. Host it on:
   - GitHub Pages (free)
   - Your own website
   - Notion (make it public)
3. Get the public URL
4. Add to App Store Connect

## Demo Account for Reviewers

Create a test account with:
- Email: demo@kittstyletoolkit.com (or similar)
- Password: Something simple for reviewers
- Pre-filled profile with birth date
- Add this info in App Store Connect review notes

## Cost Breakdown

- **Apple Developer**: $99/year (required)
- **Expo EAS**: Free tier available, or $29/month for unlimited builds
- **Total to start**: $99 (just Apple Developer)

## Timeline

- Build: 10-20 minutes
- Upload: 5-10 minutes
- App Store review: 24-48 hours (usually)
- **Total**: ~2-3 days from build to live

## Need Help?

- Full guide: See `IOS_DEPLOYMENT_GUIDE.md`
- Expo docs: https://docs.expo.dev/build/introduction/
- App Store guidelines: https://developer.apple.com/app-store/review/guidelines/

---

**Pro tip**: Build early and often. Don't wait until everything is perfect. Submit a v1, then iterate with updates!
