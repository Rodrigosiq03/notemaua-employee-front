/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from "axios";
import { IAuthRepository } from "../../../modules/auth/domain/repositories/auth_repository_interface";

export class AuthRepositoryHttp implements IAuthRepository {
  constructor(private readonly httpAuth: AxiosInstance) {}

  async createUserOAuth(accessToken: string): Promise<string> {
      try {
        const response = await this.httpAuth.post<{ token: string }>('/create-user-oauth', { accessToken })
        return response.data.token
      } catch(error: any) {
        throw new Error(error)
      }
  }
}