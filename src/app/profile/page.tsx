import { Profile } from "@/components/profile/profile";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | Task Manager',
  description: 'Describe your profile and manage your account settings',
};

export default function ProfilePage() {
  return <Profile />;
}
