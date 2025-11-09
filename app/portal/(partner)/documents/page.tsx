export default function PartnerDocumentsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Documents</h2>
      <p className="text-muted-foreground">
        Upload and manage partner documents. Connect Supabase Storage and RBAC to enable secure uploads.
      </p>
      <div className="rounded-xl border p-6">
        <p className="text-sm text-muted-foreground">
          Storage and RLS policies should be configured in Supabase. This page is a scaffold awaiting credentials.
        </p>
      </div>
    </div>
  );
}


