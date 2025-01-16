import { IWithdrawRepository } from "../domain/repositories/withdraw_repository_interface"

export class DeleteLaptopUsecase {
  constructor(private repo: IWithdrawRepository) {}

  async execute(notebookSerialNumber: string) {
    const laptop = await this.repo.deleteLaptop(notebookSerialNumber)
    return laptop
  }
}