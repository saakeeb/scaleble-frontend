import { User } from '@/types/auth';

const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
  },
];

export const authenticateUser = async (
  email: string,
  password: string
): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem('auth_user');
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const storeUser = (user: User): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_user', JSON.stringify(user));
};

export const removeUser = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_user');
};
