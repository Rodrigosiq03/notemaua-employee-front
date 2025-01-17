export interface IAuthRepository {
  createUserOAuth(accessToken: string): Promise<string>
}