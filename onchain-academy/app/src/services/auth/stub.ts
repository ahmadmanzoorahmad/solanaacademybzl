import type { AuthService, AuthUser, AuthSession } from './types';

export class StubAuthService implements AuthService {
  private currentUser: AuthUser | null = null;

  async getCurrentUser(): Promise<AuthUser | null> {
    return this.currentUser;
  }

  async signIn(walletAddress: string, _signature: Uint8Array): Promise<AuthSession> {
    const user: AuthUser = {
      id: `user-${walletAddress.slice(0, 8)}`,
      walletAddress,
      displayName: `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      createdAt: new Date().toISOString(),
    };
    this.currentUser = user;
    return {
      token: `stub-token-${Date.now()}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      user,
    };
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
  }

  async verifySession(_token: string): Promise<boolean> {
    return this.currentUser !== null;
  }
}
