# AgroSite Backend (Express + MongoDB)

## Stack
- Express.js
- MongoDB (via Mongoose)
- Nodemon for development

## Setup
1. Install dependencies:
   npm install
2. Create environment file:
   copy .env.example .env
3. Update MONGODB_URI in .env if needed
4. Run development server:
   npm run dev

## Scripts
- npm run dev: starts server with nodemon
- npm start: starts server with node

## API
- GET /health
- GET /api/products
- POST /api/products
- PATCH /api/products/:id
- DELETE /api/products/:id
