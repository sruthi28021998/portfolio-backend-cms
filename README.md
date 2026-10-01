# Portfolio Backend CMS

A custom-built REST API and content management system backend, powering a personal portfolio website. No third-party CMS platforms (Strapi, Sanity, etc.) were used — authentication, content models, and APIs are all built from scratch.

## Tech Stack
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT authentication (access + refresh tokens)
- bcryptjs for password hashing
- Multer for image uploads
- Nodemailer for contact form emails

## Features
- JWT-based admin authentication (login, refresh, register)
- Full CRUD APIs for 7 content types: About, Skills, Projects, Blogs, Experience, Testimonials, Services
- Image upload endpoint with local file storage
- Contact form submission + email notification
- CORS configured for multiple allowed origins

## Project Structure

config/ → MongoDB connection
controllers/ → auth logic + generic CRUD controller factory
middleware/ → JWT auth guard (protect routes)
models/ → Mongoose schemas (User, About, Skill, Project, Blog, Experience, Testimonial, Service, Message, Media)
routes/ → route definitions for auth, content, upload, contact
utils/ → email sending helper
uploads/ → uploaded media files (gitignored)
server.js → app entry point


## Setup

```bash
npm install
cp .env
```

Fill in `.env` with real values:

PORT=5000
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<random generated secret>
JWT_REFRESH_SECRET=<different random generated secret>
EMAIL_USER=<your gmail>
EMAIL_PASS=<gmail app password>
CLIENT_URL=http://localhost:5173,http://localhost:3000


Run the server:
```bash
npm run dev
```

You should see:
MongoDB connected
Server running on port 5000


## Create the admin account (run once)
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","password":"yourpassword"}'
```

**Important:** `/auth/register` has no access restriction. Remove or protect this route before deploying publicly, once your admin account is created.

## API Reference

| Route | Methods | Auth required |
|---|---|---|
| `/auth/login` | POST | No |
| `/auth/refresh` | POST | No |
| `/auth/register` | POST | No (disable after first use) |
| `/api/about` | GET, PUT | PUT only |
| `/api/skills` | GET, POST, PUT, DELETE | Write only |
| `/api/projects` | GET, POST, PUT, DELETE | Write only |
| `/api/blogs` | GET, POST, PUT, DELETE | Write only |
| `/api/experience` | GET, POST, PUT, DELETE | Write only |
| `/api/testimonials` | GET, POST, PUT, DELETE | Write only |
| `/api/services` | GET, POST, PUT, DELETE | Write only |
| `/upload/image` | POST | Yes |
| `/contact` | POST (public), GET (protected) | Mixed |

## Deployment
Deployed on [Render](https://render.com). Environment variables are configured directly in the Render dashboard — the `.env` file is never uploaded.

Live URL: `https://portfolio-backend-cms.onrender.com` *(update with your actual URL)*

## Related Repos
- [portfolio-admin-panel](https://github.com/<your-username>/portfolio-admin-panel) — CMS admin dashboard
- [portfolio-frontend](https://github.com/<your-username>/portfolio-frontend) — public portfolio site