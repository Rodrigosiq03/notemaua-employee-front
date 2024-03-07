import { EntityError } from '../../../shared/domain/helpers/errors/domain_errors'
import { Employee } from '../../../shared/domain/entities/employee'
import { IEmployeeRepository } from '../domain/repositories/employee_repository_interface'

export class LoginUsecase {
  constructor(private repo: IEmployeeRepository) {}

  async execute(email: string, password: string) {
    if (!Employee.validateEmail(email)) {
      throw new EntityError('email')
    }
    if (!Employee.validatePassword(password)) {
      throw new EntityError('password')
    }

    const token = await this.repo.login(email, password)

    return token
  }
}