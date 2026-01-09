# Forgot Password with Telegram OTP - Setup Guide

## 📋 Overview

This feature implements a secure password reset flow using:
- **Phone verification** (ensures user owns the phone number)
- **OTP delivery via Telegram** (6-digit code valid for 5 minutes)
- **Password reset** with confirmation
- **Database update** (password hashed and stored securely)

---

## 🔧 Backend Setup

### 1. Install Python Package

```bash
cd /home/labuser/Desktop/Policy/RestAPI
source venv/bin/activate
pip install python-telegram-bot==20.7
```

Or update requirements.txt:
```bash
pip install -r requirements.txt
```

### 2. Get Telegram Bot Token

**Follow these steps exactly:**

1. **Open Telegram** (desktop, mobile, or web)

2. **Search for @BotFather** and open it

3. **Send `/start`** to BotFather

4. **Send `/newbot`** and follow prompts:
   - **Bot Name**: `Insurance Policy Bot` (or any name)
   - **Bot Username**: `insurance_policy_bot` (must end with `_bot` and be unique)

5. **BotFather responds with**:
   ```
   Use this token to access the HTTP API:
   1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh
   ```
   **Copy this token!**

6. **Get your Telegram User ID**:
   - Search for `@userinfobot`
   - Send it `/start`
   - It shows your **User ID** (e.g., `123456789`)

### 3. Configure Telegram Token in Django

**Option A: Environment Variable (Recommended)**
```bash
export TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN_HERE"
# Then run Django
python manage.py runserver 0.0.0.0:8000
```

**Option B: Hard-code in settings.py** (Development only)
Edit `/home/labuser/Desktop/Policy/RestAPI/restapi/restapi/settings.py`:
```python
# Around line 130
TELEGRAM_BOT_TOKEN = '1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh'
```

### 4. Update User Phone Numbers

Ensure users have valid phone numbers (10 digits):
```bash
# Via Django shell
python manage.py shell
>>> from user.models import User
>>> user = User.objects.get(email='admin@test.com')
>>> user.phone = '9876543210'  # 10 digits
>>> user.save()
```

---

## 🎯 Frontend Setup

The forgot password page is already created at:
- **File**: `Fend/frontend/forgot-password.html`
- **URL**: `http://localhost:8080/forgot-password.html`
- **Login Page Link**: Added "Forgot Password?" button to login page

---

## 📱 API Endpoints

### 1. Request OTP (Step 1)
```
POST http://127.0.0.1:8000/api/forgot-password/phone/

Request:
{
    "phone": "9876543210"
}

Response (Success):
{
    "message": "OTP sent to your Telegram. Check your messages.",
    "phone": "9876543210"
}

Response (Error):
{
    "message": "Phone number not found in our system"
}
```

### 2. Verify OTP (Step 2)
```
POST http://127.0.0.1:8000/api/forgot-password/verify-otp/

Request:
{
    "phone": "9876543210",
    "otp": "123456"
}

Response (Success):
{
    "message": "OTP verified. You can now reset your password.",
    "phone": "9876543210"
}

Response (Error):
{
    "message": "Invalid OTP. 2 attempts remaining."
}
```

### 3. Reset Password (Step 3)
```
POST http://127.0.0.1:8000/api/forgot-password/reset/

Request:
{
    "phone": "9876543210",
    "new_password": "newPassword123",
    "confirm_password": "newPassword123"
}

Response (Success):
{
    "message": "Password reset successfully. You can now login with your new password.",
    "email": "admin@test.com"
}

Response (Error):
{
    "message": "Passwords do not match"
}
```

---

## 🧪 Testing

### Test Scenario 1: Successful Password Reset

1. **Open login page**:
   ```
   http://localhost:8080/login.html
   ```

2. **Click "Forgot Password?"**

3. **Enter phone number**: `9876543210` (must match existing user)

4. **Check Telegram** for OTP message

5. **Enter 6-digit OTP**

6. **Create new password** with confirmation

7. **Login with new password**

### Test Scenario 2: Error Handling

- **Wrong phone number**: Shows "Phone number not found"
- **Wrong OTP**: Shows remaining attempts (max 3)
- **Password mismatch**: Shows validation error
- **Expired OTP**: Shows "OTP expired" message

---

## 🔐 Security Features

✅ **Password Hashing**: Passwords hashed using Django's `make_password`
✅ **OTP Expiry**: 5 minutes (configurable in `password_reset.py`)
✅ **OTP Attempts**: Max 3 attempts (then OTP expires)
✅ **Cache Storage**: OTP stored in memory (not database)
✅ **Telegram Security**: Uses official Telegram Bot API
✅ **Phone Verification**: Must match existing user's phone
✅ **No Password in Response**: API responses never include hashed password

---

## 📂 Files Created/Modified

### Backend
- ✅ `user/password_reset.py` - OTP manager class
- ✅ `user/serializers.py` - New serializers for password reset
- ✅ `user/views.py` - 3 new API endpoints
- ✅ `user/urls.py` - Added new routes
- ✅ `restapi/settings.py` - Cache & Telegram config
- ✅ `requirements.txt` - Added python-telegram-bot

### Frontend
- ✅ `forgot-password.html` - Complete forgot password flow
- ✅ `login.html` - Added "Forgot Password?" link

---

## 🚀 Running the System

### Terminal 1: Backend
```bash
cd /home/labuser/Desktop/Policy/RestAPI/restapi
export TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN"
/home/labuser/Desktop/Policy/RestAPI/venv/bin/python manage.py runserver 0.0.0.0:8000
```

### Terminal 2: Frontend
```bash
cd /home/labuser/Desktop/Policy/Fend/frontend
python3 -m http.server 8080
```

### Access
- **Login**: http://localhost:8080/login.html
- **Forgot Password**: http://localhost:8080/forgot-password.html
- **API**: http://127.0.0.1:8000/api/

---

## 🐛 Troubleshooting

### Issue: "Telegram bot not configured"
**Solution**: Set `TELEGRAM_BOT_TOKEN` environment variable or in settings.py

### Issue: "Telegram chat ID not found"
**Solution**: The phone number needs to be verified first. Ensure the phone matches the user's phone in database.

### Issue: OTP not received
1. Check Telegram bot token is correct
2. Verify phone number matches database
3. Check Telegram privacy settings allow bot messages

### Issue: Django throws import error
```bash
pip install python-telegram-bot==20.7
```

---

## 📞 Support

For issues, check:
1. Django logs for backend errors
2. Browser console (F12) for frontend errors
3. Telegram bot settings in BotFather
4. User phone number format (must be 10 digits)

---

**Ready to use!** 🎉

