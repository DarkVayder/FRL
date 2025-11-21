# Flex Living — Reviews Dashboard

A modern, responsive dashboard for managing property reviews, built with React, TypeScript, and Tailwind CSS, with a Node.js/Express backend. Supports Hostaway reviews (mocked) and optional Google Reviews exploration.

---

## Tech Stack

**Frontend**
- React + TypeScript  
- Tailwind CSS  
- React Icons (Feather icons)

**Backend**
- Node.js + Express  
- TypeScript  
- Axios for API requests  
- Mocked Hostaway JSON fallback

---

## Features

- Fetch and normalize Hostaway reviews
- Approve / Unpublish reviews
- Search and filter by listing name or slug
- Responsive grid layout for mobile, tablet, and desktop
- Review cards with badges, hover effects, and rating display
- Optional: Google Reviews exploration endpoint
- Optional: Dropdown filters for category, channel, and time
- Optional: Color-coded summary cards per property

---

## Getting Started

### 1. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
2. Setup Environment Variables
Create a .env file in the backend with:

env
Copy code
HOSTAWAY_ACCOUNT_ID=<your_hostaway_account_id>
HOSTAWAY_API_KEY=<your_hostaway_api_key>
PORT=5000
3. Start Development
bash
Copy code
# Backend
npm run dev

# Frontend
npm run dev
Frontend runs on http://localhost:5173

Backend runs on http://localhost:4000

API Endpoints
Hostaway Reviews
GET /api/reviews/hostaway

Returns normalized review data:

json
Copy code
{
  "success": true,
  "data": [
    {
      "id": 7453,
      "rating": 10,
      "publicReview": "Shane and family are wonderful! Would definitely host again :)",
      "categories": [
        { "name": "cleanliness", "rating": 10 },
        { "name": "communication", "rating": 10 },
        { "name": "respect_house_rules", "rating": 10 }
      ],
      "submittedAt": "2020-08-21 22:45:14",
      "listing": "2B N1 A - 29 Shoreditch Heights",
      "guest": "Shane Finkelstein",
      "type": "host-to-guest",
      "channel": "Hostaway"
    }
  ]
}
Google Reviews (Exploration)
GET /api/reviews/google

Returns an exploratory message:

json
Copy code
{
  "success": false,
  "message": "Google Reviews were not implemented — exploration only.",
  "reviews": []
}
Design & Logic Decisions
UI: Clean, centered header with gradient; review cards with badges and hover effects

Grid: Responsive layout for all screen sizes

Filtering: Search and optional dropdown filters (category, channel, time)

Approval Logic: Frontend handles approve/unpublish toggling

API Normalization: Null ratings are handled via average category calculation

Optional Enhancements
Google Reviews integration with Places API

Persisting approved/unpublished status to database

Analytics & trends per property (average rating, review counts)

Visual enhancements: mini charts, color-coded property summary cards
