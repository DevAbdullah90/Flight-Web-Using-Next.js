# Flight Search Engine MVP (Challenge)

A high-performance, data-heavy Flight Search application built with Next.js App Router, Tailwind CSS, and Recharts. Designed to demonstrate robust architecture, complex state management, and live data visualization.

## Features

- **Live Flight Search**: Real-time integration with Amadeus Self-Service API.
- **Complex Filtering**: Filter by Price, Airlines, Stops, and Time of Day (Client-side).
- **Live Price Graph**: Interactive visualization of price trends synced with filters.
- **Responsive Design**: Mobile-optimized layout with drawer-based filters.
- **Performance**: Normalized data model and efficient state management (Zustand).

## Architecture

This project uses a Next.js API Proxy to securely handle Amadeus Authentication and normalize the data structure before it reaches the frontend.

```mermaid
graph TD
    User[User] -->|Search (Origin, Dest, Date)| NextAPI[Next.js API Route /api/search]
    NextAPI -->|Client Credentials Auth| AmadeusAuth[Amadeus Auth Server]
    AmadeusAuth -->|Access Token| NextAPI
    NextAPI -->|GET /shopping/flight-offers| Amadeus[Amadeus API]
    Amadeus -->|Raw Nested JSON| NextAPI
    NextAPI -->|Normalization Logic| NextAPI
    NextAPI -->|Flat Flight[] List| Store[Zustand Store (Frontend)]
    Store -->|Derived State| UI[Results List & Graph]
```

### Data Flow & Normalization

Amadeus returns a complex nested structure with separate dictionaries for airline names. We normalize this on the server side into a flat `Flight` object:

- **Raw**: Nested segments, carrier codes (e.g., "UA"), duration in ISO format (PT5H).
- **Normalized**: Flat structure, resolved airline names ("United Airlines"), formatted duration ("5h 30m").

## Getting Started

### Prerequisites

- Node.js 18+
- Amadeus API Keys (Test Environment). Get them [here](https://developers.amadeus.com/register).

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd flight-search-mvp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env.local` file in the root directory:
   ```env
   AMADEUS_CLIENT_ID=your_client_id
   AMADEUS_CLIENT_SECRET=your_client_secret
   AMADEUS_ENV=test
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## License

MIT