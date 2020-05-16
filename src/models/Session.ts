import { User } from './User';

const TOKEN_KEY = process.env.TOKEN_KEY || 'jwt';
const USER_KEY = process.env.USER_KEY || 'user';

export abstract class Session {
  public static isAuthenticated(): boolean {
    return sessionStorage.getItem(TOKEN_KEY) != null;
  }

  public static getToken(): [User, string] | [null, null] {
    const userData = sessionStorage.getItem(USER_KEY);
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token || !userData) {
      return [null, null];
    }
    const user = new User({ ...JSON.parse(userData) });
    return [user, token];
  }

  public static setToken(user: User, token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify({ ...user }));
  }

  public static clearToken(): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  }
}
