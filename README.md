# VoucGen

VouchGen: Generate custom digital vouchers instantly. Users select a voucher type (e.g., Promo Edukasi, Diskon Game), and the system auto-creates a unique code (e.g., EDU-A7aC1), overlays it onto a predefined PNG/SVG template using Sharp, and lets users preview/download the result.

## Tech Stack

- **Frontend**: Next.js 14 (React 18)
- **Backend**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Image Processing**: Sharp
- **API**: REST API

## Features

- ✅ Form input for voucher type selection
- ✅ Unique code generation with database validation
- ✅ Automatic image rendering with Sharp (PNG/SVG overlay)
- ✅ Voucher preview functionality
- ✅ Download generated vouchers
- ✅ Basic voucher storage in PostgreSQL
- ✅ List all generated vouchers

## Project Structure

```
VoucGen/
├── backend/          # Express.js API server
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── utils/    # Utilities (code generator, image generator)
│   │   └── index.js  # Server entry point
│   ├── prisma/       # Database schema
│   ├── uploads/      # Generated voucher images
│   └── templates/    # Voucher templates (auto-generated)
└── frontend/         # Next.js application
    ├── app/          # Next.js app router
    ├── components/   # React components
    └── public/       # Static assets
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
The `.env` file should contain:
```
DATABASE_URL="your_postgresql_connection_string"
PORT=3001
```

4. Generate Prisma client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### POST /api/vouchers
Create a new voucher
- **Request Body**: `{ "type": "Promo Edukasi" | "Diskon Game" }`
- **Response**: Voucher object with unique code and image path

### GET /api/vouchers
Get all vouchers
- **Response**: Array of voucher objects

### GET /api/vouchers/:id
Get a specific voucher by ID
- **Response**: Single voucher object

## Voucher Types

- **Promo Edukasi**: Educational promotion vouchers (prefix: EDU)
- **Diskon Game**: Game discount vouchers (prefix: DIS)

## Code Generation

Voucher codes are generated in the format: `PREFIX-XXXXX`
- PREFIX: Derived from voucher type (3 characters)
- XXXXX: Random alphanumeric string (5 characters)
- Example: `EDU-A7aC1`, `DIS-Kf9p2`

Each code is validated against the database to ensure uniqueness.

## Image Generation

- Templates are automatically created if not present
- Voucher codes are overlaid on templates using Sharp
- Generated images are stored in the `backend/uploads` directory
- Images can be previewed and downloaded from the frontend

## Development

- Backend uses nodemon for auto-reload during development
- Frontend uses Next.js Fast Refresh
- Changes to Prisma schema require running `npm run prisma:generate`

## License

ISC
