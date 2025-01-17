/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAuthRepository } from "../../../modules/auth/domain/repositories/auth_repository_interface";

export class AuthRepositoryMock implements IAuthRepository {
  async createUserOAuth(accessToken: string): Promise<string> {
    return 'token'
  }
}