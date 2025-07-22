
# 🏞️ Helping for Tourism – Explore Gujarat with Us!


**Helping for Tourism** is a feature-rich, modern, and responsive travel guide website built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This platform is designed to assist tourists in exploring various **districts of Gujarat** by providing real-time data about destinations, hotels, transport options, and events—all wrapped in a clean and intuitive UI.

---

## 🚀 Live Features

### 🌐 Home Page
- Responsive **Navbar** with a logo (left) and Login/Signup buttons (right).
- **Infinite Hero Image Slider** showcasing Gujarat’s scenic states with titles & descriptions.
- **Smart Location Form**:
  - Dropdowns to select *State* & *District* (searchable).
  - Event-based logic:
    - If the district has an **upcoming event** → a popup shows event details (image, location, date).
    - If no event → redirects directly to the selected district page.

---

## 🧭 District Page Features

### 🔹 Navbar
- Left: Logo  
- Right: `Home | Destinations | Hotels | Transport | Plan Your Trip | About Us | Contact Us`

### 🔹 Home
- Welcome section with an overview of the selected district.
- Quick links to major sections.

### 🔹 Destinations
- Beautiful **cards** showing:
  - 📍 Place name  
  - 🖼️ Image  
  - 📖 Description  
- **Horizontal slider** if multiple destinations exist.

### 🔹 Hotels
- Hotels categorized into:
  - 💎 Luxury
  - 💼 Mid-range
  - 💰 Budget  
- Each hotel card displays:
  - 🏨 Name  
  - 📷 Image  
  - 💵 Price/night  
  - ⭐ Rating  
  - 🏷️ Category  
  - 📍 Address

### 🔹 Transport
- Details on reaching the district via:
  - 🛫 Nearest Airports  
  - 🚆 Railway Stations  
  - 🚌 Major Bus Stops

### 🔹 Plan Your Trip
- Users can select multiple destinations.
- “**Generate Path**” button shows the **optimized travel route** using **Google Maps** integration.

### 🔹 About Us
- Profile cards of the website creators.
- Mission & Vision behind the platform.

### 🔹 Contact Us
- **Left Section**: Email, phone number, and office address.
- **Right Section**: Contact form with:
  - Name  
  - Email  
  - Message  
  - Submit Button

### 🔹 Footer
- Helpful links  
- Social media (optional)  
- Credits & copyright

---

## 🔒 Admin Panel

> Accessible to admins only.

- Secure login for admin access.
- Admin can:
  - ➕ Create  
  - ✏️ Update  
  - ❌ Delete  
  the following data:
  - 🏞️ Places  
  - 🏨 Hotels  
  - 🎉 Events  
  - 🚍 Transport Details

---

## ⚙️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Swiper.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas  
- **Authentication**: JWT-based secure login/signup  
- **Image Hosting**: Cloudinary  
- **Maps Integration**: Google Maps API (for route optimization)

---

## 📱 100% Responsive Design

Built for all screen sizes:

✅ Mobile Devices  
✅ Tablets  
✅ Laptops  
✅ Large Monitors

---

## 🛠️ How to Run This Project Locally

```bash
# Step 1: Clone the repository
git clone (https://github.com/solankitushar2404/Helping-For-Tourism.git)

# Step 2: Navigate into the project
cd HelpingForTourism

# Step 3: Install frontend dependencies
cd client
npm install

# Step 4: Start frontend server
npm run dev

# Step 5: Open a new terminal tab for backend
cd ../server
npm install

# Step 6: Add environment variables
# Create a .env file for MongoDB URI, Cloudinary credentials, JWT secret, etc.

# Step 7: Start backend server
npm run dev
```

## 🧠 Scope
🎯 Currently focused on districts of Gujarat

🌍 Future plans include expanding across all Indian states

## ✨ Highlights
🏞️ Gujarat-first tourism guide with real district-level insights

💡 Interactive user interface with animations & transitions

🔐 Admin panel for managing live content

🗺️ Smart trip planning with Google Maps-powered routes

🔒 Secure login & registration system

💬 Real-time feedback via contact form

## 🙌 Made With Passion By
Tusharkumar Solanki
📍 Gujarat,India  
🛠️ Full Stack Developer & Project Member 
💼 Creator of the Platform

## 📬 Feedback or Suggestions?
Feel free to open GitHub issues or use the Contact Form on the site.  
Let’s make tourism in Gujarat smarter—one visitor at a time!

## ⭐ Star this Repository
If you find this project helpful or inspiring, please give it a star ⭐ on GitHub.  
It motivates us to build even better features!
