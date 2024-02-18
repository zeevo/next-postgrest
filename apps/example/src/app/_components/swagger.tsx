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
