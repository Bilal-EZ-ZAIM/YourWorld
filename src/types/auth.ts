export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}