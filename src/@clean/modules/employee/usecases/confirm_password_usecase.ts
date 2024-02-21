import { Employee } from "../../../shared/domain/entities/employee"
import { EntityError } from "../../../shared/domain/helpers/errors/domain_errors"
import { IEmployeeRepository } from "../domain/repositories/employee_repository_interface"

export class ConfirmForgotPasswordUsecase {
  constructor(private repo: IEmployeeRepository) {}

  async execute(email: string, newPassword: string, createdAt: number) {
    if (!Employee.validateEmail(email)) {
      throw new EntityError('email')
    }
    if (!Employee.validatePassword(newPassword)) {
      throw new EntityError('newPassword')
    }

    const timestampNow = new Date().getTime()

    if (timestampNow - createdAt > 600000) {
      throw new EntityError('token')
    }

    const updatedUser = await this.repo.confirmForgotPassword(email, newPassword, createdAt)

    return updatedUser
  }
}