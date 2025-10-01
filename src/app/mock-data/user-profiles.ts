import { UserProfile } from '../core/services/auth-service';

export const USER_PROFILES: UserProfile[] = [
  {
    id: 1,
    name: 'Test Admin',
    email: 'admin@example.com',
    role: 'admin',
    lastLoginDate: '2025-10-01T10:00:00Z',
    createdDate: '2025-01-01T09:00:00Z',
    modifiedDate: '2025-09-01T08:00:00Z',
  },
];
