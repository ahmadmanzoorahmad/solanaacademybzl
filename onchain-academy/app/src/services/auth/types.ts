export interface AuthService {
  getCurrentUser(): Promise<AuthUser | null>;
  signIn(walletAddress: string, signature: Uint8Array): Promise<AuthSession>;
  signOut(): Promise<void>;
  verifySession(token: string): Promise<boolean>;
}

export interface AuthUser {
  id: string;
  walletAddress: string;
  displayName: string;
  avatar: string;
  createdAt: string;
}

export interface AuthSession {
  token: string;
  expiresAt: string;
  user: AuthUser;
}
