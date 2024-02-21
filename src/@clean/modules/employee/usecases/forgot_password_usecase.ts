import { Employee } from "../../../shared/domain/entities/employee"
import { EntityError } from "../../../shared/domain/helpers/errors/domain_errors"
import { IEmployeeRepository } from "../domain/repositories/employee_repository_interface"

export class ForgotPasswordUsecase {
  constructor(private repo: IEmployeeRepository) {}

  async execute(email: string) {
    if (!Employee.validateEmail(email)) {
      throw new EntityError('email')
    }
    
    const message = this.repo.forgotPassword(email)

    return message
  }
}