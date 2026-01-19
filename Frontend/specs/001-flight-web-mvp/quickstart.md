# Quickstart: Flight Web MVP

## Prerequisites
- Node.js 18+
- Python 3.11+
- Amadeus API Keys (Client ID/Secret)

## Setup

### Backend
1. Navigate to `backend/`
2. Create venv: `python -m venv .venv`
3. Install deps: `pip install fastapi uvicorn httpx python-dotenv`
4. Create `.env`:
   ```
   AMADEUS_CLIENT_ID=your_id
   AMADEUS_CLIENT_SECRET=your_secret
   AMADEUS_ENV=test
   ```
5. Run: `uvicorn main:app --reload`

### Frontend
1. Navigate to `frontend/`
2. Install deps: `npm install`
3. Run: `npm run dev`

## Verification
1. Open `http://localhost:5173`
2. Enter "JFK" -> "LHR" -> Tomorrow's date
3. Click Search
4. Verify results appear
