```
# Community Food Sharing – Project Requirements

## 📌 Project Overview
Community Food Sharing is a digital platform connecting individuals with surplus food (Donors) to those in need (Beneficiaries). Its primary goal is to reduce food waste and efficiently distribute surplus food within communities across the United Kingdom. The platform is initially developed in English, with planned multilingual support via ChatGPT integration.

---

## 🎯 Main Objectives

- Reduce food waste through effective digital connections between donors and beneficiaries.
- Enhance easy community access to available surplus food.
- Provide comprehensive accessibility including Text-to-Speech and Dial-in capabilities.
- Integrate AI chatbot (ChatGPT) for seamless user interaction and support.

---

## ⚙️ Technology Stack

**Frontend:**
- Framework: NextJS (latest stable version)
- Language: TypeScript
- Styling: Tailwind CSS

**Backend (Initial MVP):**
- NextJS API Routes (basic authentication: login/signup)
- Future expansion: Node.js

**Database (Planned):**
- MongoDB

**Deployment:**
- Vercel (recommended)

---

## 🛠️ Functional Requirements

### 1. User Roles
- **Donors:** Can list available surplus food.
- **Beneficiaries:** Can search for and request listed food items.

### 2. Food Listings
- Users can post offers or requests for food with limited validity periods (1 day, 3 days, 1 week).
- Listings clearly display expiry dates and relevant details (description, location, contact information).

### 3. Location-Based Filtering
- Users can filter food listings by major cities: London, Manchester, Birmingham, Glasgow, Leeds, Liverpool, etc.

### 4. User Authentication
- Simple login and signup system using NextJS API Routes.
- Preparation for future secure MongoDB integration.

### 5. AI Chatbot Integration
- Frontend-ready chatbot interface.
- ChatGPT backend integration planned to assist users, multilingual support.

### 6. Accessibility Features
- HTML semantic structure prepared for Text-to-Speech (future integration).
- Dial-in option for less tech-savvy users (future implementation).

---

## 📁 Project Structure

```
CommunityFoodSharing/
├── app/
│   ├── page.tsx (Homepage)
│   ├── add-listing
│   ├── search-listings
│   ├── locations
│   ├── login
│   └── signup
├── components/
│   ├── Header
│   ├── Footer
│   ├── Button
│   ├── Card
│   ├── Form
│   ├── Modal
│   └── Chatbot
├── public/
│   ├── images/
│   │   ├── hero-image.png
│   │   └── logo.jpg
│   └── icons/
└── styles/
    └── globals.css
```

---

## 🗃️ Mock Data

### Example Food Listings
```json
[
  {
    "id": "1",
    "title": "Fresh Vegetables",
    "description": "Carrots, broccoli, spinach from local farm.",
    "expiry": "1 day",
    "location": "London",
    "postedBy": "Donor User 1"
  },
  {
    "id": "2",
    "title": "Baked Goods",
    "description": "Bread, pastries from local bakery.",
    "expiry": "3 days",
    "location": "Manchester",
    "postedBy": "Donor User 2"
  }
]
```

---

## 🔑 Backend API (Initial MVP)
- Simple mock API routes for user authentication:
  - `/api/login`
  - `/api/signup`
- Preparation for MongoDB integration.

---

## 💬 ChatGPT Integration (Planned)
- Frontend modal/chatbox to interact with users.
- Backend prepared to connect to ChatGPT (OpenAI API).

---

## ♿ Accessibility Strategy
- HTML and ARIA attributes optimized for screen readers.
- Placeholder for future Dial-in and Text-to-Speech integrations.

---

## 🎨 UI/UX Design
- Reference: "Hero image.png"
- Color Scheme: Yellow, White, Black
- Font: Modern, clear readability
- Interactive and intuitive design elements.

---

## 🚀 Future Roadmap

- Comprehensive backend (Node.js, MongoDB integration).
- Full integration of ChatGPT (OpenAI API).
- User dashboards for managing listings and profiles.
- Real-time notifications and updates (via WebSockets).
- Enhanced accessibility (full Text-to-Speech, voice navigation, Dial-in support).

---

## 📚 Additional Resources

- [NextJS Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenAI API](https://platform.openai.com/docs/api-reference)

---

This document details the complete frontend structure and requirements for the Community Food Sharing project, preparing thoroughly for future integrations and expansions.
```
