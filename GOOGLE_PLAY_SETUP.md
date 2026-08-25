# 📱 HẮC ĐỘNG - Google Play Deployment Guide

## 📦 What You Got
- **hacdong-cordova-project.zip** - Cordova project ready to build APK
- **BUILD_GUIDE.md** - Step-by-step build instructions

## 🚀 Quick Steps

### 1. Setup (First Time)
```bash
# Extract project
unzip hacdong-cordova-project.zip
cd hacdong-app

# Install dependencies
npm install

# Add Android platform
cordova platform add android
```

### 2. Build APK for Google Play
```bash
# Release build (optimized, no debug info)
cordova build android --release

# Output: platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
```

### 3. Sign APK (Required!)
```bash
# Create keystore (ONE TIME ONLY - Keep safe!)
keytool -genkey -v -keystore hacdong-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias hacdong

# Sign the APK
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore hacdong-key.keystore \
  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk \
  hacdong

# Optimize APK
zipalign -v 4 \
  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk \
  HacDong-v1.0.0.apk
```

### 4. Upload to Google Play
1. Go to https://play.google.com/console
2. Create developer account ($25 registration fee)
3. Create new app:
   - Name: **HẮC ĐỘNG**
   - Category: **Games > Puzzle**
   - Content rating: **3+**
4. Upload the signed APK
5. Fill app details:
   - Short description: *Xếp khối, lấp hàng cho nổ tung*
   - Full description: *Kéo các khối xếp lên bảng 8×8, xóa hàng/cột để lấy điểm, kích hoạt Hố Đen để nuốt sạch một vùng. Hệ thống anti-deadlock đảm bảo bạn luôn có nước đi.*
   - Screenshots: Thêm 2-5 ảnh từ game
   - Video teaser: Thêm video 30s (optional)
6. Configure monetization:
   - Type: Free with ads
   - AdMob: Already configured (Banner + Rewarded)
7. Submit for review (24-48 hours)

## 📋 Project Structure
```
hacdong-app/
├── www/
│   ├── index.html          ← Game file (2.3MB)
│   └── manifest.webmanifest ← PWA config
├── config.xml              ← Cordova settings
├── platforms/
│   └── android/            ← Android-specific code
├── plugins/                ← Cordova plugins
└── BUILD_GUIDE.md          ← Detailed build instructions
```

## 🔑 Important Files
- **hacdong-key.keystore** - Your signing key (KEEP SAFE!)
  - Without this, you can't update your app on Google Play
  - Store it in a secure location
  - Back it up!

## 🐛 Troubleshooting

| Error | Solution |
|-------|----------|
| `No Android SDK` | Install Android SDK Platform 36 via Android Studio |
| `Java not found` | Install JDK 11+ (Oracle or OpenJDK) |
| `Build fails` | Delete `platforms/` folder and rebuild |
| `Cordova not found` | Run `npm install -g cordova` |

## 📊 Game Features
✅ 70% Smart Piece generation (AI-assisted)  
✅ 30% Random pieces (adds variety)  
✅ Anti-Deadlock system (never gets stuck)  
✅ Hardcore mode (no safety net)  
✅ AdMob Banner ads  
✅ Rewarded ads for revive  
✅ 200+ unlock themes & achievements  

## 💰 Monetization
- **Banner Ads**: Top or bottom of screen
- **Rewarded Ads**: Offers revive on game over
- AdMob IDs already configured:
  - Banner: `ca-app-pub-2424151177279863/1541700380`
  - Rewarded: `ca-app-pub-2424151177279863/4089184121`

## 🎮 Test Before Upload
```bash
# Debug build (for testing on device)
cordova run android

# Or:
cordova build android
# Then manually install: adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

## 📈 Update on Google Play
After first release, to update:
1. Increment version in `config.xml` (e.g., 1.0.1)
2. Build new release APK
3. Sign with same keystore
4. Upload to Play Console (same app, new version)

## ❓ Questions?
- Cordova docs: https://cordova.apache.org
- Google Play Help: https://support.google.com/googleplay
- AdMob integration: Already done in game code

---
**Ready to ship! 🚀**
