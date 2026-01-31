# Backend (Production-ready)

Express backend with **MariaDB** and **Sequelize**.

## Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express 5
- **Database:** MariaDB
- **ORM:** Sequelize
- **Security:** Helmet, CORS
- **Logging:** Morgan

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and set your MariaDB credentials:

   ```bash
   cp .env.example .env
   ```

3. **Database**

   Create the database in MariaDB:

   ```sql
   CREATE DATABASE backend_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

4. **Migrations**

   ```bash
   npm run db:migrate
   ```

5. **Seed (optional)**

   ```bash
   npm run db:seed
   ```

## Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `npm start`       | Start server (production)      |
| `npm run dev`     | Start with watch (development) |
| `npm run db:migrate`   | Run migrations                 |
| `npm run db:migrate:undo` | Undo last migration        |
| `npm run db:seed`      | Run seeders                  |
| `npm run db:seed:undo` | Undo last seed              |

## API

| Method | Path        | Description        |
|--------|-------------|--------------------|
| GET    | `/`         | API info           |
| GET    | `/api/health` | Liveness (DB check) |
| GET    | `/api/ready`  | Readiness          |
| GET    | `/api/users`  | List users (paginated) |
| GET    | `/api/users/:id` | Get user by ID  |
| POST   | `/api/users`  | Create user       |
| PATCH  | `/api/users/:id` | Update user   |
| DELETE | `/api/users/:id` | Delete user   |

**List users query:** `?page=1&limit=20&status=active`

## Project structure

```
src/
├── config/          # App and DB config
├── controllers/     # Route handlers
├── database/        # Sequelize instance, migrations, seeders
├── middleware/      # Error handler, 404
├── models/          # Sequelize models
├── routes/          # API routes
├── app.js           # Express app
└── index.js         # Entry, DB connect, graceful shutdown
```

## Production

- Set `NODE_ENV=production`
- Use a process manager (e.g. PM2)
- Configure reverse proxy (nginx) and TLS
- Restrict `CORS_ORIGIN` to your frontend domain(s)
