import { IWithdrawRepository } from "../domain/repositories/withdraw_repository_interface"

export class CreateLaptopUsecase {
  constructor(private repo: IWithdrawRepository) {}

  async execute(notebookSerialNumber: string) {
    const laptop = await this.repo.createLaptop(notebookSerialNumber)
    return laptop
  }
}