import { IWithdrawRepository } from "../domain/repositories/withdraw_repository_interface";
import { Withdraw } from "../../../shared/domain/entities/withdraw";

export class GetAllWithdrawUsecase {
  constructor(private repo: IWithdrawRepository) {}

  async execute(): Promise<Withdraw[]> {
    const allWithdraws = await this.repo.getAllWithdraws();
    return allWithdraws;
  }
}
