import { decorate, injectable } from "inversify";
import { IEmployeeRepository } from "../../../modules/employee/domain/repositories/employee_repository_interface";
import { Employee } from "../../domain/entities/employee";
import { NoItemsFound } from "../../domain/helpers/errors/usecase_errors";

export class EmployeeRepositoryMock implements IEmployeeRepository {
  private employees: Employee[] = [
    new Employee({
      email: 'admin@maua.br',
      name: 'Admin',
      password: '$2a$08$v9krjLq9tIl7MBQqoVIE8.pXqEXLMONGG5hcBWpds2LL.sjwWC24O'
    }),
    new Employee({
      email: 'admin2@maua.br',
      name: 'Admin2',
      password: 'Admin2_123$'
    })
  ]

  getEmployee(email: string): Employee {
    const employee = this.employees.find(employee => employee.email === email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    return employee
  }

  async login(email: string): Promise<string> {
    const employee = this.getEmployee(email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    const token: string = 'token'

    return Promise.resolve(token)
  }
  
  async forgotPassword(email: string): Promise<string> {
    const employee = this.getEmployee(email)
  
    if (!employee) {
      throw new NoItemsFound('email')
    }

    const message = 'Email sent'
  
    return Promise.resolve(message)
    
  }

  async confirmForgotPassword(email: string, newPassword: string): Promise<string> {
    const employee = this.getEmployee(email)

    if (!employee) {
      throw new NoItemsFound('email')
    }

    employee.setPassword = newPassword

    const message = 'Password updated'

    return Promise.resolve(message)
  }

}

decorate(injectable(), EmployeeRepositoryMock)