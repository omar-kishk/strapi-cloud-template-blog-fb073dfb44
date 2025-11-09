import type { ReactNode } from "react";

export default function PartnerPortalLayout({ children }: { children: ReactNode }) {
  return (
    <section className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Partner Portal</h1>
      {children}
    </section>
  );
}


