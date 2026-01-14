'use client';

import { useAuth } from '@/components/auth/auth-provider';
import { Profile } from '@/components/profile/profile';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return null; 
  }

  return <Profile user={user} />;
}