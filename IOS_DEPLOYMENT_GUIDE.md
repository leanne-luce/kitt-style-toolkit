# iOS App Store Deployment Guide for Kitt Style Toolkit

This guide will walk you through deploying your app to the iOS App Store.

## Prerequisites

### 1. Apple Developer Account
- **Required**: Apple Developer Program membership ($99/year)
- Sign up at: https://developer.apple.com/programs/
- You need this to distribute apps on the App Store

### 2. Required Accounts
- [ ] Apple Developer Account (developer.apple.com)
- [ ] Expo Account (expo.dev) - Free
- [ ] App Store Connect Account (appstoreconnect.apple.com) - Included with Developer Account

### 3. Install EAS CLI
```bash
npm install -g eas-cli
```

## Step 1: Prepare Your App

### Update app.json
✅ Already configured with:
- Bundle identifier: `com.kittstyletoolkit.app`
- Privacy descriptions for location, camera, photo library
- iOS-specific settings

### Important Configuration Notes
- **Bundle Identifier**: `com.kittstyletoolkit.app`
  - This must be unique across the App Store
  - If taken, you'll need to change it (e.g., `com.yourcompany.kittstyletoolkit`)
- **Version**: Currently `1.0.0`
- **Build Number**: Currently `1`

## Step 2: Create App Assets

### App Icon Requirements
- **Size**: 1024x1024 pixels
- **Format**: PNG (no transparency)
- **Location**: `./assets/images/icon.png`

You'll need to create a high-quality app icon. Tools to help:
- [App Icon Generator](https://www.appicon.co/)
- [MakeAppIcon](https://makeappicon.com/)
- Design in Figma/Sketch and export at 1024x1024

### Splash Screen
- Currently using: `./assets/images/splash-icon.png`
- Ensure this exists and looks good

## Step 3: Set Up EAS Build

### Login to Expo
```bash
eas login
```

### Configure Your Project
```bash
eas build:configure
```

This will:
- Link your project to Expo
- Set up credentials
- Prepare for building

## Step 4: Update EAS Configuration

Open `eas.json` and update the `submit.production.ios` section with your details:

```json
"submit": {
  "production": {
    "ios": {
      "appleId": "your-apple-id@example.com",
      "ascAppId": "1234567890",
      "appleTeamId": "ABC123XYZ"
    }
  }
}
```

**How to find these values:**
- `appleId`: Your Apple ID email
- `ascAppId`: Found in App Store Connect after creating your app
- `appleTeamId`: Found in Apple Developer Account > Membership

## Step 5: Create App in App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Click "My Apps" → "+" → "New App"
3. Fill in:
   - **Platform**: iOS
   - **Name**: Kitt Style Toolkit
   - **Primary Language**: English
   - **Bundle ID**: Select `com.kittstyletoolkit.app`
   - **SKU**: `kitt-style-toolkit` (or any unique identifier)
   - **User Access**: Full Access

4. After creating, note the **App ID** (10-digit number) and add it to `eas.json` as `ascAppId`

## Step 6: Prepare App Store Listing

You'll need to prepare these materials for App Store Connect:

### Required Screenshots
- **6.7" Display (iPhone 15 Pro Max)**: 1290 x 2796 pixels (at least 3 screenshots)
- **6.5" Display (iPhone 14 Plus)**: 1284 x 2778 pixels (at least 3 screenshots)
- **5.5" Display (Optional)**: 1242 x 2208 pixels

### App Information
- **App Name**: Kitt Style Toolkit
- **Subtitle**: Style guidance powered by weather and astrology
- **Description**:
  ```
  Kitt Style Toolkit combines weather forecasting, zodiac insights, and fashion expertise to deliver personalized daily outfit recommendations.

  Features:
  • Daily style horoscope tailored to your zodiac sign
  • Weather-based outfit recommendations
  • Hourly weather forecast with style considerations
  • Vogue Archive search for fashion inspiration
  • Season-aware search results
  • Daily color palette suggestions
  • Track viewed items to discover new styles

  Whether you're checking the weather or seeking cosmic style guidance, Kitt Style Toolkit helps you look your best every day.
  ```

- **Keywords**: fashion, style, weather, horoscope, zodiac, outfit, wardrobe, vogue, archive
- **Support URL**: Your website or support page
- **Marketing URL**: Your app's landing page (optional)
- **Privacy Policy URL**: **REQUIRED** - You must create and host a privacy policy

### Privacy Policy
You MUST have a privacy policy because your app:
- Collects user data (email, name, birth date)
- Uses location services
- Uses Supabase for data storage

Create a privacy policy that covers:
- What data you collect (name, email, birth date, location, profile picture)
- How you use it (outfit recommendations, horoscope)
- Third-party services (Supabase, weather API)
- User rights (data deletion, access)

Host it on a public URL (your website, GitHub pages, etc.)

## Step 7: Build Your App

### Production Build for App Store
```bash
eas build --platform ios --profile production
```

This will:
- Upload your code to Expo servers
- Build the iOS app
- Sign it with your Apple Developer credentials
- Take 10-20 minutes

EAS will ask for credentials:
- **Apple ID**: Your Apple Developer account email
- **Password**: Your Apple ID password (or app-specific password if using 2FA)

EAS can manage your certificates and provisioning profiles automatically.

### Check Build Status
```bash
eas build:list
```

Or visit: https://expo.dev/builds

## Step 8: Submit to App Store

### Option 1: Automatic Submission (Recommended)
```bash
eas submit --platform ios --latest
```

This will automatically upload your build to App Store Connect.

### Option 2: Manual Submission
1. Download the `.ipa` file from the EAS build dashboard
2. Use Xcode's Transporter app to upload it to App Store Connect
3. Available at: https://apps.apple.com/us/app/transporter/id1450874784

## Step 9: Complete App Store Connect

After uploading the build:

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Select your app
3. Go to "App Store" tab
4. Click "+" next to "iOS App" to create a new version
5. Fill in all required information:
   - Screenshots
   - Description
   - Keywords
   - Support URL
   - Privacy Policy URL
   - Age Rating (answer questionnaire)
   - Pricing (Free or Paid)

6. Under "Build" section, select the build you just uploaded
7. Click "Save"
8. Click "Submit for Review"

## Step 10: App Review Information

You'll need to provide:

### Contact Information
- First Name
- Last Name
- Phone Number
- Email

### Demo Account (If login required)
Since your app has authentication, provide:
- Demo username/email
- Demo password
- Instructions for the reviewer

Create a test account specifically for App Review with:
- Pre-filled birth date
- Example data to showcase features

### Notes for Reviewer
```
Kitt Style Toolkit provides personalized fashion recommendations based on:
1. Current weather conditions (uses location services)
2. Daily horoscope (based on user's birth date)
3. Vogue Archive fashion search

Test Account Features:
- Login to see personalized style horoscope
- Location permission enables weather-based outfit suggestions
- Browse Vogue archive for fashion inspiration
```

## Step 11: Review Process

- **Timeline**: Typically 24-48 hours (can be up to a week)
- **Status**: Track in App Store Connect
- **Common Rejections**:
  - Missing privacy policy
  - Crash on launch
  - Missing demo account
  - Privacy descriptions unclear

## Step 12: Future Updates

### Updating Version Numbers
When releasing updates:

1. In `app.json`, increment:
   - `version`: "1.0.1", "1.1.0", "2.0.0" (semantic versioning)
   - `ios.buildNumber`: "2", "3", "4" (increment each build)

2. Build again:
   ```bash
   eas build --platform ios --profile production
   ```

3. Submit again:
   ```bash
   eas submit --platform ios --latest
   ```

### Versioning Guide
- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features, backwards compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

## Troubleshooting

### Build Fails
- Check error logs in EAS dashboard
- Ensure all dependencies are compatible
- Verify bundle identifier is correct

### "Bundle identifier already exists"
- Change bundle identifier in app.json
- Must be unique across all App Store apps
- Example: `com.yourname.kittstyletoolkit`

### Credentials Issues
- Ensure 2FA is enabled on Apple ID
- Use app-specific password if needed
- Run: `eas credentials` to manage

### App Rejected
- Read rejection reason carefully
- Make required changes
- Resubmit (no need to rebuild if just metadata changes)

## Environment Variables & Secrets

Your app uses Supabase. Make sure:
- Supabase URL and keys are configured
- No secrets are committed to git
- Test thoroughly before submitting

## Useful Commands

```bash
# Login to Expo
eas login

# Check build status
eas build:list

# View credentials
eas credentials

# Build for iOS
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios --latest

# Build and submit in one command
eas build --platform ios --profile production --auto-submit
```

## Resources

- [Expo EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [App Store Connect](https://appstoreconnect.apple.com/)
- [Apple Developer](https://developer.apple.com/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

## Pre-Submission Checklist

- [ ] Apple Developer Account enrolled ($99/year)
- [ ] Expo account created
- [ ] App icon created (1024x1024 PNG)
- [ ] Bundle identifier set (and available)
- [ ] Privacy policy created and hosted
- [ ] App Store listing prepared (description, keywords, screenshots)
- [ ] Demo account created for reviewers
- [ ] App tested thoroughly on real iOS device
- [ ] All permissions properly described in Info.plist
- [ ] eas.json configured with correct IDs
- [ ] App created in App Store Connect
- [ ] Build successful
- [ ] Uploaded to App Store Connect
- [ ] All App Store Connect fields filled
- [ ] Submitted for review

## Cost Summary

- **Apple Developer Program**: $99/year (required)
- **Expo EAS Build**: Free tier available (limited builds) or $29/month for unlimited
- **Hosting**: Need to host privacy policy (can use GitHub Pages - free)

---

Good luck with your App Store submission! 🚀
