import { Withdraw } from "../../../shared/domain/entities/withdraw"
import { EntityError } from "../../../shared/domain/helpers/errors/domain_errors"
import { IWithdrawRepository } from "../domain/repositories/withdraw_repository_interface"

export class UpdateWithdrawUsecase {
  constructor(private repo: IWithdrawRepository) {}

  async execute(notebookSerialNumber: string, isChecked: boolean) {
    if (!Withdraw.validateNotebookSerialNumber(notebookSerialNumber)) {
      throw new EntityError('notebookSerialNumber')
    }

    if (typeof isChecked !== 'boolean' || isChecked === undefined) {
      throw new EntityError('isChecked')
    }

    const withdraw = await this.repo.updateWithdrawState(notebookSerialNumber, isChecked)

    return withdraw
  }
}