const TOKEN_KEY = process.env.TOKEN_KEY || 'jwt';

export abstract class Session {
  public static isAuthenticated() {
    return sessionStorage.getItem(TOKEN_KEY) != null;
  }

  public static getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public static clearToken() {
    return sessionStorage.removeItem(TOKEN_KEY);
  }
}
