# next-postgrest

Use [Next.js](https://nextjs.org/) with [PostgREST](https://postgrest.org/en/v12/) effortlessly.

# Getting Started

## Install

```
npm install next-postgrest
```

## Use in a Route Handler

```js
// app/api/[[...rest]]/route.ts

import { NextPostgrest } from "next-postgrest";

export const { GET, POST, PUT, DELETE, PATCH } = NextPostgrest({
  url: "http://postgrest:3333",
  basePath: "/api",
  before({ pathname, searchParams, view, request }) {
    // Validate something
    if (Object.keys(searchParams).includes("myField")) {
      return new Response(JSON.stringify({ message: "bad request" }), {
        status: 400,
      });
    }
  },
});
```

## Query your Next.js API

```bash
curl http://localhost:3000/api/todos
```

## Adding a Swagger UI

You can use `swagger-ui-react` to create API Docs automatically.

1. Create a Swagger Client Component

```ts
"use client";

import dynamic from "next/dynamic";

import "swagger-ui-react/swagger-ui.css";

const DynamicSwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => <p>Loading API Docs...</p>,
});

export function Swagger({ spec }: { spec: Record<string, any> }) {
  return <DynamicSwaggerUI spec={spec} />;
}
```

2. Use `NextPostgrestSwagger` in a React Server Component

```ts
import { NextPostgrestSwagger } from "next-postgrest";
import { Swagger } from "./_components/swagger";

export default async function Page() {
  const spec = await NextPostgrestSwagger({
    url: "http://localhost:3333", // your PostgREST endpoint
    host: "localhost:3000", // your site
    basePath: "/api", // path to your NextPostgrest route handler
  });

  return <Swagger spec={spec} />;
}
```

3. Visit your API Docs at http://localhost:3000/api-docs

## Short circuiting with `before`

You can use `before` to inspect the incoming request and return a new `Response`.

```ts
// app/api/[[...rest]]/route.ts

import { NextPostgrest } from "next-postgrest";

export const { GET, POST, PUT, DELETE, PATCH } = NextPostgrest({
  url: "http://postgrest:3333",
  basePath: "/api",
  before({ pathname, searchParams, view, request }) {
    // Validate something
    if (Object.keys(searchParams).includes("myField")) {
      return new Response(JSON.stringify({ message: "bad request" }), {
        status: 400,
      });
    }
  },
});
```
