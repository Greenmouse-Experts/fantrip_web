// src/components/SEO.tsx
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://fantrip.app"; // Change this to your real domain

export default function SEO({ title }: { title?: string }) {
  const { pathname } = useLocation();

  return (
    <Helmet>
      {title && <title>{title}</title>}
      <link rel="canonical" href={`${BASE_URL}${pathname}`} />
    </Helmet>
  );
}
