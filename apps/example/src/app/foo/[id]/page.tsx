import { getPathname } from "next-impl-getters/get-pathname";

export default function Page({ searchParams, params }) {
  const pathname = getPathname();
  return (
    <ul>
      <li>{pathname}</li>
      <li>{JSON.stringify(params)}</li>
      <li>{JSON.stringify(searchParams)}</li>
    </ul>
  );
}
