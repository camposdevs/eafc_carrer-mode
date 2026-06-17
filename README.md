# EA FC Career Tracker

Projeto separado em frontend e backend.

```txt
client/  -> React + Vite + MUI + React Router + Axios + React Query + Recharts
server/  -> Node.js + Express + Supabase + JWT + Sportmonks Service
```

## Rodar o backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Backend local:

```txt
http://localhost:3333
http://localhost:3333/api/health
```

## Rodar o frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Frontend local:

```txt
http://localhost:5173
```

## Variáveis do server

Edite `server/.env`:

```env
PORT=3333
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=troque_essa_chave
SUPABASE_URL=sua_url_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
SPORTMONKS_API_TOKEN=sua_chave_sportmonks
```

## Variáveis do client

Edite `client/.env`:

```env
VITE_API_URL=http://localhost:3333/api
```

## Deploy futuro

- Frontend: Vercel, usando a pasta `client/`.
- Backend: Render, usando a pasta `server/`.
- Banco: Supabase PostgreSQL.
