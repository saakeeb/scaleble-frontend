import { Dashboard } from '@/components/dashboard/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Task Manager',
  description: 'Manage and monitor all your tasks in one place',
};

export default function DashboardPage() {
  return <Dashboard />;
}
