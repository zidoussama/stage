
# Starter Project Guide

>This project is a modern [Next.js](https://nextjs.org) starter, featuring authentication, GraphQL, and a robust fetch utility layer. It is designed for rapid development and scalability.

---

## 🚀 Getting Started


1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Run the development server:**
   ```bash
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📦 Project Structure

- `src/lib/` — Core utilities (fetch, GraphQL, authentication, etc.)
- `src/hooks/` — Custom React hooks
- `src/app/` — Next.js app directory (pages, layouts, API routes)
- `src/components/` — UI components
- `database/` — Database schema and config

---

## 🔑 Authentication

Authentication is powered by [better-auth](https://github.com/numedia-io/better-auth) and supports email/password, Google, and Facebook logins. The configuration is in `src/lib/auth.ts` and `src/lib/auth-client.ts`.

- **Client usage:**
  - `signIn`, `signUp`, `signOut`, `useSession`, etc. are exported from `src/lib/auth-client.ts`.
  - Sessions are cached and managed automatically.
  - Social providers are configured via environment variables.

---

## 🌐 Fetch Utilities & GraphQL

This project provides several utilities for making API and GraphQL requests:

### 1. `fetchGraphQL<T>(query, payload?, cacheOption?)`
- **File:** `src/lib/fetch.ts`
- Makes a POST request to `/graphql` endpoint.
- Handles variables and cache options (`force-cache`, `no-store`, `no-cache`).
- Returns the `data` property from the GraphQL response.

### 2. `clientFetchGraphQL<T>(query, variables?)`
- **File:** `src/lib/graphql-client.ts`
- Robust error handling for client-side GraphQL requests.
- Throws on HTTP or GraphQL errors, logs details to the console.

### 3. `graphqlRequest<T>(query, payload?)`
- **File:** `src/lib/graphql.ts`
- Uses [`graphql-request`](https://github.com/prisma-labs/graphql-request) for a typed, promise-based API.
- Handles errors and logs them.

### 4. `betterFetch`
- **File:** Used in `src/middleware.ts`
- Wrapper for fetch with enhanced features (see [@better-fetch/fetch](https://github.com/numedia-io/better-fetch)).

---

## 🛠️ Example: Fetching Data

```typescript
import { fetchGraphQL } from "@/lib/fetch"

const query = `query { products { id name price } }`
const data = await fetchGraphQL(query)
```

Or using the client utility:

```typescript
import { clientFetchGraphQL } from "@/lib/graphql-client"

const data = await clientFetchGraphQL(query, { limit: 10 })
```

---

## 🧑‍💻 Tips

- Environment variables are required for API URLs and auth providers. See `.env.example` for details.
- All fetch utilities are typed for TypeScript safety.
- Authentication and session management are handled automatically.

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [better-auth](https://github.com/numedia-io/better-auth)
- [graphql-request](https://github.com/prisma-labs/graphql-request)

---

## 🚀 Deployment

Deploy easily on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) or your preferred platform.
