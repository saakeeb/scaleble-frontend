import { ProtectedRoute } from '@/components/auth/protected-route';
import { Header } from '@/components/header/header';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ProtectedRoute>
        <main className="flex-1 container py-6 mx-auto px-4">{children}</main>
      </ProtectedRoute>
    </div>
  );
}
