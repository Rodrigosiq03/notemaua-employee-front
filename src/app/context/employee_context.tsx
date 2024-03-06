/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ResgistryEmployee, containerEmployee } from "../../@clean/shared/infra/containers/employee_container"; 
import { LoginUsecase } from "../../@clean/modules/employee/usecases/login_usecase";
import { ForgotPasswordUsecase } from "../../@clean/modules/employee/usecases/forgot_password_usecase";
import { ConfirmForgotPasswordUsecase } from "../../@clean/modules/employee/usecases/confirm_password_usecase";
import { createContext, PropsWithChildren, useState } from "react";

export type EmployeeContextType = {
  login: (email: string, password: string) => Promise<string | undefined>
  forgotPassword: (email: string) => Promise<string | undefined>
  confirmForgotPassword: (email: string, newPassword: string) => Promise<string | undefined>
  isLogged: boolean
  setIsLogged: (isLogged: boolean) => void
}

const defaultEmployeeContext: EmployeeContextType = {
  login: async (email: string, password: string) => {
    return ''
  },

  forgotPassword: async (email: string) => {
    return ''
  },

  confirmForgotPassword: async (email: string, newPassword: string) => {
    return ''
  },

  isLogged: false,

  setIsLogged: (value: boolean) => void 0
}

export const EmployeeContext = createContext(defaultEmployeeContext)

const loginUsecase = containerEmployee.get<LoginUsecase>(ResgistryEmployee.LoginUseCase)

const forgotPasswordUsecase = containerEmployee.get<ForgotPasswordUsecase>(ResgistryEmployee.ForgotPasswordUseCase)

const confirmForgotPasswordUsecase = containerEmployee.get<ConfirmForgotPasswordUsecase>(ResgistryEmployee.ConfirmForgotPasswordUseCase)


export function EmployeeContextProvider({ children }: PropsWithChildren) {
  const [isLogged, setIsLogged] = useState(false)

  async function login(email: string, password: string) {
    try {
      const token = await loginUsecase.execute(email, password)
      localStorage.setItem('token', token)

      return token
    } catch (error: any) {
      console.error('Something went wrong with login: ',error)
    }
  }

  async function forgotPassword(email: string) {
    try {
      const message = await forgotPasswordUsecase.execute(email)

      return message
    } catch (error: any) {
      console.error('Something went wrong with forgotPassword: ',error)
      return 'E-mail não cadastrado'
    }
  }

  async function confirmForgotPassword(email: string, newPassword: string) {
    try {
      const createdAt = JSON.parse(localStorage.getItem('createdAt') || '')

      const message = await confirmForgotPasswordUsecase.execute(email, newPassword, createdAt)

      return message
    } catch (error: any) {
      console.error('Something went wrong with confirmForgotPassword: ',error)
    }
  }

  
  return (
    <EmployeeContext.Provider value={{ login, forgotPassword, confirmForgotPassword, isLogged, setIsLogged }}>
      {children}
    </EmployeeContext.Provider>
  )

}



  
