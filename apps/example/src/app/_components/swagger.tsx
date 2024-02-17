"use client";

import "swagger-ui-react/swagger-ui.css";

import dynamic from "next/dynamic";

const DynamicSwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => <p>Loading API Docs...</p>,
});

export function Swagger({ spec }: { spec: Record<string, any> }) {
  return <DynamicSwaggerUI spec={spec} />;
}
