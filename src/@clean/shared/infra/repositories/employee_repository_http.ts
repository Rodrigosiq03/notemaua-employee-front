/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from "axios";
import { IEmployeeRepository } from "../../../modules/employee/domain/repositories/employee_repository_interface";
import { JsonEmployeeProps } from "../../domain/entities/employee";
import { decorate, injectable } from "inversify";

type ForgotPasswordResponse = {
  message: string
}

type ConfirmForgotPasswordResponse = {
  message: string
}

export class EmployeeRepositoryHttp implements IEmployeeRepository {
  constructor(private readonly httpEmployee: AxiosInstance) {}

  async login(email: string, password: string): Promise<string> {
    try {
      const response = await this.httpEmployee.post<JsonEmployeeProps>('/login-employee', { email, password })
      if (response.status === 200) {
        return response.data.token
      }
      return ''
    } catch(error: any) {
      throw new Error(error)
    }
  }
  async forgotPassword(email: string): Promise<string> {
    try {
      const response = await this.httpEmployee.post<ForgotPasswordResponse>('/forgot-password-employee', { email })

      localStorage.setItem('createdAt', JSON.stringify(new Date().getTime()))

      return response.data.message
    } catch(error: any) {
      throw new Error(error)
    }
  }
  async confirmForgotPassword(email: string, newPassword: string, createdAt: number): Promise<string> {
    try {
      const response = await this.httpEmployee.post<ConfirmForgotPasswordResponse>('/confirm-forgot-password-employee', { email, newPassword, createdAt })

      return response.data.message
    } catch(error: any) {
      throw new Error(error)
    }
  }
  
}

decorate(injectable(), EmployeeRepositoryHttp)