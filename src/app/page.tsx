import { Home } from '@/components/home/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Streamline your workflow with our task management solution',
};

export default function HomePage() {
  return <Home />;
}
