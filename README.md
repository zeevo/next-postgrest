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
  prefix: "/api",
});
```

## Query your Next.JS API

```bash
curl http://localhost:3000/api/todos
```

## Adding a Swagger UI

You can use `swagger-ui-react` to create API Docs automatically.

1. Create a Swagger Client Component

```js
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

2. Use it in a React Server Component

```js
// app/api-docs/page.tsx
import { Swagger } from "./_components/swagger";

export default async function Page() {
  // Fetch spec from PostgREST endpoint
  const spec = await fetch("http://postgrest:3333");

  const json = await spec.json();

  return (
    <Swagger
      spec={{
        ...json,
        host: "localhost:3000",
        basePath: "/api",
        paths: { ...json.paths, "/": undefined },
      }}
    />
  );
}
```

3. Visit your API Docs at http://localhost:3000/api-docs
