# QR Code Scanner Guide

## Overview
This HRM system now supports QR code generation and scanning for candidate registration.

## Features

### 1. QR Code Display (Home Page)
- **URL**: `http://localhost:5173/`
- Displays a QR code that links to the registration form
- Can be printed or displayed on screens for candidates to scan

### 2. QR Code Scanner (Laptop/Desktop)
- **URL**: `http://localhost:5173/scan`
- Uses your laptop's webcam to scan QR codes
- Works on any device with a camera and browser

## How to Use QR Scanning on Laptop

### Step 1: Navigate to Scanner
1. Open the application in your browser
2. Click on "📷 Open QR Scanner" button or go to `http://localhost:5173/scan`

### Step 2: Enable Camera
1. Click the "🔓 Enable Camera Access" button
2. Allow camera permission when prompted by your browser
3. You'll see a live camera feed with a green scanning frame

### Step 3: Position the QR Code (Important!)
**Proper camera positioning is key to successful scanning:**

#### 📏 Distance
- Hold the QR code **6-12 inches (15-30 cm)** from your laptop camera
- Too far: QR code will be too small to read
- Too close: QR code will be blurry and distorted

#### 💡 Lighting
- Ensure **good, even lighting** on the QR code
- Avoid:
  - Bright lights or windows behind the QR code
  - Shadows covering parts of the QR code
  - Glare from overhead lights
- Best: Natural light from the front or side

#### 🎯 Alignment
- Center the QR code **inside the green scanning frame**
- Make sure all four corners of the QR code are visible
- The QR code should fill about 60-80% of the green frame

#### 📐 Angle
- Keep the QR code **flat and parallel** to your camera
- Avoid:
  - Tilted or rotated QR codes
  - Curved or wrinkled QR codes
  - Angled views (more than 15 degrees)

#### 💻 Laptop Camera Location
- **Where is it?** Usually at the **top center** of your laptop screen bezel
- **What does it look like?** A small circular lens (about 3-5mm diameter)
- **How to find it:** Look at the top edge of your screen - you'll see a tiny hole or lens
- **Tip:** The camera is typically in the middle of the screen, slightly above the display

### Step 4: Scan the QR Code
1. Click the "📸 Scan QR Code" button
2. The system will capture the image and decode the QR code
3. If successful, you'll see:
   - Candidate name and ID
   - Success message
   - Automatic redirect to registration form

### Alternative: Manual Input
If scanning doesn't work:
1. Click "⌨️ Enter Manually" button
2. Enter the QR code data or candidate ID
3. Click OK to process

## Backend API Endpoints

### Generate QR Code
```
GET /api/candidates/generate-qr/{candidate_id}/
```
Returns a base64 encoded QR code image for a specific candidate.

### Scan QR Code
```
POST /api/candidates/scan-qr/
Body: { "qr_data": "scanned_qr_content" }
```
Processes scanned QR code data and returns candidate information.

## Technical Details

### Frontend
- **Library**: jsQR for QR code decoding
- **Camera Access**: Uses browser's MediaDevices API
- **Framework**: React with Vite

### Backend
- **Library**: qrcode (Python) for QR generation
- **Framework**: Django REST Framework
- **Response**: Base64 encoded PNG images

## Troubleshooting

### Camera Not Working
- Ensure your laptop has a webcam
- Check browser permissions (click the camera icon in address bar)
- Try refreshing the page
- Use a different browser (Chrome, Firefox, Edge recommended)

### QR Code Not Detected
- Ensure good lighting
- Hold the QR code steady
- Make sure the entire QR code is within the green frame
- Try the manual input option instead

### Scan Successful but No Redirect
- Check if the candidate ID exists in the database
- Verify the backend server is running on port 8000
- Check browser console for errors

## Testing the System

### Test QR Code Generation
```bash
# Backend endpoint
curl http://localhost:8000/api/candidates/generate-qr/1/
```

### Test QR Scanning
1. Go to `http://localhost:5173/scan`
2. Enable camera
3. Point at any QR code
4. Click "Scan QR Code"

## Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Edge
- ✅ Safari
- ⚠️ Requires HTTPS in production (except localhost)

## Notes
- For production, HTTPS is required for camera access
- The QR code contains a URL to the registration form
- Scanning is done client-side using jsQR library
- Backend validates the scanned data and returns candidate info