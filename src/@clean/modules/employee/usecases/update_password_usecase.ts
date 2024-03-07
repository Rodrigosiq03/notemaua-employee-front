import { Employee } from "../../../shared/domain/entities/employee"
import { EntityError } from "../../../shared/domain/helpers/errors/domain_errors"
import { NoItemsFound } from "../../../shared/domain/helpers/errors/usecase_errors"
import { IEmployeeRepository } from "../domain/repositories/employee_repository_interface"

export class UpdatePasswordUsecase {
    constructor(private repo: IEmployeeRepository) {}
  
    async execute(email: string, oldPassword: string, newPassword: string) {
      if (!Employee.validateEmail(email)) {
        throw new EntityError('email')
      }
      if (!Employee.validatePassword(oldPassword)) {
        throw new EntityError('oldPassword')
      }
      if (!Employee.validatePassword(newPassword)) {
        throw new EntityError('newPassword')
      }
  
      const updatedUser = await this.repo.updatePassword(
        email,
        oldPassword,
        newPassword,
      )
  
      if (!updatedUser) {
        throw new NoItemsFound('User')
      }
  
      return updatedUser
    }
  }