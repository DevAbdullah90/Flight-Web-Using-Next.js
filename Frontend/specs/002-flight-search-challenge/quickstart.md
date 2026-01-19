# Quickstart: Flight Search Challenge MVP

## Prerequisites
- Node.js 18+
- Amadeus API Keys (Test Env)

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Environment Configuration**:
   Create `.env.local` in the root:
   ```bash
   AMADEUS_CLIENT_ID=your_client_id
   AMADEUS_CLIENT_SECRET=your_client_secret
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Verify**:
   - Open `http://localhost:3000`
   - Enter Origin: `JFK`, Destination: `LHR`, Date: Future Date.
   - Click Search.
   - Verify graph and list load.
