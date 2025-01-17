import { IAuthRepository } from "../domain/repositories/auth_repository_interface";

export class CreateUserOAuthUsecase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(accessToken: string): Promise<string> {
    return this.authRepository.createUserOAuth(accessToken)
  }
}