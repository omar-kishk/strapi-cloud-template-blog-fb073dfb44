import Link from 'next/link';

export default function PartnerDashboardPage() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        This is a basic partner dashboard. Authentication can be enabled with Clerk by adding keys in
        <code className="mx-1">.env.local</code> and wrapping routes with guards.
      </p>
      <ul className="list-disc ps-6">
        <li>
          <Link className="text-primary underline" href="/portal/partner/documents">
            Manage Documents
          </Link>
        </li>
        <li>View onboarding status</li>
      </ul>
    </div>
  );
}


