export interface IAuthService {
  init(): Promise<void>;
  getAccessToken(): Promise<string | null>;
  initLogin(redirectUri: string): Promise<boolean>;
  authCheck(redirectUri: string): Promise<boolean>;
}
