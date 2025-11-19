# 📦 Car Park Booking System

A full-stack mobile application built with:

-   **React Native (Expo)** -- mobile app\
-   **Node.js + Express.js** -- backend API\
-   **MySQL** -- database\
-   **Axios** -- API communication

This system allows users to **view booked dates**, **select a date**,
and **book a car parking slot**.

------------------------------------------------------------------------

# 🛠 Backend Setup (Express.js + Node.js + MySQL)

### 1️⃣ Install dependencies

    cd backend
    npm install

### 2️⃣ Create MySQL database

    CREATE DATABASE carpark;

### 2️⃣ Create MySQL database with prisma 
     
     npx prisma generate 

     npx prisma db push


### 3️⃣ Create `.env`

    DATABASE_URL="mysql://root:<password>@localhost:3306/carpark"

### 4️⃣ Start backend

    npm run dev

------------------------------------------------------------------------

# 🖥 API Endpoints

### GET /api/bookings

### POST /api/bookings

------------------------------------------------------------------------

# 📱 React Native Setup

### Install deps

    cd app
    npm install

### Setup `.env`

    API_URL=http://YOUR_IPV4:3000

Find IPv4 using:

    ipconfig

### Start Expo

    npx expo start

------------------------------------------------------------------------

# 🔥 Screenshots



![IMG-20240711-WA0013](https://github.com/RayanCooray/car-park-booking/blob/main/images/IMG-20251119-WA0012.jpg)
![IMG-20240711-WA0013](https://github.com/RayanCooray/car-park-booking/blob/main/images/IMG-20251119-WA0013.jpg)
![IMG-20240711-WA0013](https://github.com/RayanCooray/car-park-booking/blob/main/images/IMG-20251119-WA0014.jpg)
![IMG-20240711-WA0013](https://github.com/RayanCooray/car-park-booking/blob/main/images/IMG-20251119-WA0015.jpg)
![IMG-20240711-WA0013](https://github.com/RayanCooray/car-park-booking/blob/main/images/IMG-20251119-WA0016.jpg)

------------------------------------------------------------------------

# 🌐 Static IP Setup Guide (Windows)

### Option 1 --- Router Static Lease

Log in to your router → DHCP Settings → Reserve IP for your laptop →
Save.



------------------------------------------------------------------------

# ❗ Fix: Network Errors in React Native

-   Phone & laptop must be on same WiFi\
-   Use `http://YOUR_IPV4:3000`\
-   Disable VPN\
-   Ensure backend running and reachable\
-   Test in browser:\

```{=html}
<!-- -->
```
    http://YOUR_IPV4:3000/api/bookings

------------------------------------------------------------------------

# 🚫 No Deployments (Local Only)

This project is intended to run **locally only**, no Render/Cloud
deployment included.

------------------------------------------------------------------------

# 🎯 Future Improvements

-   Push notifications\
-   Admin dashboard\
-   Auth system\
-   Multiple slot support

------------------------------------------------------------------------





# ✅ End of Documentation
