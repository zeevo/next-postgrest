# next-postgrest

Use [Next.js](https://nextjs.org/) with [PostgREST](https://postgrest.org/en/v12/) effortlessly.

# Getting Started

## Install

```
npm install next-postgrest
```

## Use in a Route Handler

```js
// src/app/rest/[[...rest]]/route.ts

import { NextPostgrest } from "next-postgrest";

export const { GET, POST, PUT, DELETE, PATCH } = NextPostgrest({
  url: "http://localhost:3333",
  prefix: "/api",
});
```
