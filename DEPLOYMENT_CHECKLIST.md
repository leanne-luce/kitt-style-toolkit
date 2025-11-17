# iOS App Store Deployment Checklist

Use this checklist to track your progress deploying Kitt Style Toolkit to the App Store.

## Phase 1: Account Setup

- [ ] **Enroll in Apple Developer Program**
  - Cost: $99/year
  - URL: https://developer.apple.com/programs/
  - Processing time: Usually instant, can take up to 48 hours

- [ ] **Create Expo Account**
  - URL: https://expo.dev
  - Free tier available

- [ ] **Install EAS CLI**
  ```bash
  npm install -g eas-cli
  ```

- [ ] **Login to EAS**
  ```bash
  eas login
  ```

## Phase 2: App Assets

- [ ] **Create App Icon** (1024x1024 PNG)
  - No transparency
  - Replace: `./assets/images/icon.png`
  - Tools: https://www.appicon.co/

- [ ] **Verify Splash Screen**
  - Check: `./assets/images/splash-icon.png` exists and looks good

- [ ] **Prepare Screenshots** (at least 3)
  - 6.7" Display: 1290 x 2796 pixels (iPhone 15 Pro Max)
  - Show: Home screen, weather, Vogue archive, profile
  - Use iOS Simulator or real device

## Phase 3: Legal & Privacy

- [ ] **Create Privacy Policy**
  - Customize: `PRIVACY_POLICY_TEMPLATE.md`
  - Include: data collection, usage, storage, user rights
  - Host online: GitHub Pages, Notion, or your website
  - Get public URL

- [ ] **Create Support Email**
  - Set up dedicated email for support
  - Example: support@kittstyletoolkit.com

- [ ] **Create Demo Account**
  - Email: demo@example.com
  - Password: (simple for reviewers)
  - Pre-fill: birth date, profile picture
  - Document credentials for App Store review

## Phase 4: App Store Connect

- [ ] **Create App in App Store Connect**
  - URL: https://appstoreconnect.apple.com/
  - My Apps → "+" → New App
  - Bundle ID: `com.kittstyletoolkit.app`
  - (If taken, change in app.json)
  - Name: Kitt Style Toolkit
  - Language: English

- [ ] **Note Important IDs**
  - App ID (ASC App ID): ________________
  - Team ID: ________________
  - Bundle ID: com.kittstyletoolkit.app

- [ ] **Update eas.json**
  - Replace placeholder values with your IDs

## Phase 5: App Information

- [ ] **Write App Description**
  - See template in IOS_DEPLOYMENT_GUIDE.md
  - Highlight: weather, horoscope, Vogue archive features
  - Length: Compelling but concise

- [ ] **Select Keywords**
  - Examples: fashion, style, weather, horoscope, zodiac, outfit, vogue
  - Max 100 characters

- [ ] **Set Pricing**
  - Free or Paid
  - In-app purchases: None (currently)

- [ ] **Complete Age Rating**
  - Answer questionnaire in App Store Connect
  - Likely: 4+ or 9+

- [ ] **Add URLs**
  - Privacy Policy URL: ________________
  - Support URL: ________________
  - Marketing URL (optional): ________________

## Phase 6: Build & Submit

- [ ] **Configure Build**
  ```bash
  eas build:configure
  ```

- [ ] **Run Production Build**
  ```bash
  npm run build:ios
  # or: eas build --platform ios --profile production
  ```
  - Time: 10-20 minutes
  - Monitor: https://expo.dev/builds

- [ ] **Build Succeeded**
  - Check dashboard for green checkmark
  - Download .ipa if needed

- [ ] **Submit to App Store**
  ```bash
  npm run submit:ios
  # or: eas submit --platform ios --latest
  ```

## Phase 7: App Store Connect Completion

- [ ] **Upload Screenshots**
  - 6.7" Display: Upload 3-5 screenshots
  - 5.5" Display: Upload 3-5 screenshots (if available)

- [ ] **Select Build**
  - Go to "Build" section
  - Select the build you just uploaded
  - May take 5-10 minutes to process

- [ ] **App Review Information**
  - Contact: First name, last name, phone, email
  - Demo account: Username and password
  - Notes: Brief guide for reviewers

- [ ] **Export Compliance**
  - Answer encryption questions
  - Likely: "No" for custom encryption

## Phase 8: Submit for Review

- [ ] **Review All Information**
  - Screenshots uploaded ✓
  - Description complete ✓
  - Privacy policy URL added ✓
  - Build selected ✓
  - Demo account provided ✓
  - Age rating completed ✓

- [ ] **Click "Submit for Review"**
  - Final check of all fields
  - Confirm submission

- [ ] **Status: Waiting for Review**
  - Check status in App Store Connect
  - Timeline: 24-48 hours typically

## Phase 9: Post-Submission

- [ ] **Monitor Review Status**
  - Check email for updates
  - Check App Store Connect dashboard

- [ ] **If Rejected**
  - Read rejection reason carefully
  - Make required changes
  - Resubmit (build again if code changes needed)

- [ ] **If Approved**
  - 🎉 Congratulations!
  - App goes live automatically (or on your scheduled date)
  - Share with users

## Phase 10: Post-Launch

- [ ] **Test Live App**
  - Download from App Store
  - Verify all features work

- [ ] **Monitor Feedback**
  - Check App Store reviews
  - Respond to user feedback
  - Monitor crash reports in App Store Connect

- [ ] **Plan Updates**
  - Bug fixes
  - New features
  - Version increments

---

## Quick Commands Reference

```bash
# Build for production
npm run build:ios

# Submit latest build
npm run submit:ios

# Build and submit in one step
npm run deploy:ios

# Check build status
eas build:list

# View credentials
eas credentials
```

## Timeline Estimate

- ✅ Account setup: 1-2 days (Apple enrollment)
- ✅ Assets & prep: 2-3 hours
- ✅ Build configuration: 30 minutes
- ✅ First build: 20 minutes
- ✅ App Store Connect: 1-2 hours
- ⏳ Apple Review: 1-3 days
- **Total: ~3-5 days**

## Costs

- Apple Developer: $99/year (required)
- Expo EAS: Free tier or $29/month
- **Minimum: $99**

---

**Current Status:** [ ] Not Started / [ ] In Progress / [ ] Submitted / [ ] Live

**Submission Date:** _______________

**Expected Live Date:** _______________

**Notes:**
_______________________________________________________________________
_______________________________________________________________________
_______________________________________________________________________
