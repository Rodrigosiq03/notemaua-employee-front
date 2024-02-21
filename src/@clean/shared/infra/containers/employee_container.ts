import 'reflect-metadata'
import { Container } from 'inversify' 
import { httpEmployee } from '../http' 
import { EmployeeRepositoryMock } from '../repositories/employee_repository_mock' 
import { EmployeeRepositoryHttp } from '../repositories/employee_repository_http'
import { LoginUsecase } from '../../../modules/employee/usecases/login_usecase'
import { ForgotPasswordUsecase } from '../../../modules/employee/usecases/forgot_password_usecase' 
import { ConfirmForgotPasswordUsecase } from '../../../modules/employee/usecases/confirm_password_usecase'
import { STAGE } from '../../domain/enums/stage_enum'


export const ResgistryEmployee = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),
  EmployeeRepositoryMock: Symbol.for('EmployeeRepositoryMock'),
  EmployeeRepositoryHttp: Symbol.for('EmployeeRepositoryHttp'),
  LoginUseCase: Symbol.for('LoginUseCase'),
  ForgotPasswordUseCase: Symbol.for('ForgotPasswordUseCase'),
  ConfirmForgotPasswordUseCase: Symbol.for('ConfirmForgotPasswordUseCase')
}

export const containerEmployee = new Container()

containerEmployee.bind(ResgistryEmployee.AxiosAdapter).toConstantValue(httpEmployee)

containerEmployee.bind(ResgistryEmployee.EmployeeRepositoryMock)
  .to(EmployeeRepositoryMock)
containerEmployee.bind(ResgistryEmployee.EmployeeRepositoryHttp)
  .toDynamicValue((context) => {
    return new EmployeeRepositoryHttp(context.container.get(ResgistryEmployee.AxiosAdapter))
  })

containerEmployee.bind(ResgistryEmployee.LoginUseCase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === STAGE.TEST) {
      return new LoginUsecase(context.container.get(ResgistryEmployee.EmployeeRepositoryMock))
    } else if (import.meta.env.VITE_STAGE === STAGE.DEV || import.meta.env.VITE_STAGE === STAGE.PROD) {
      return new LoginUsecase(context.container.get(ResgistryEmployee.EmployeeRepositoryHttp))
    } else {
      return new LoginUsecase(context.container.get(ResgistryEmployee.EmployeeRepositoryMock))
    }
  })

containerEmployee.bind(ResgistryEmployee.ForgotPasswordUseCase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === STAGE.TEST) {
      return new ForgotPasswordUsecase(context.container.get(ResgistryEmployee.EmployeeRepositoryMock))
     } else if (import.meta.env.VITE_STAGE === STAGE.DEV || import.meta.env.VITE_STAGE === STAGE.PROD) {
      return new ForgotPasswordUsecase(context.container.get(ResgistryEmployee.EmployeeRepositoryHttp))
    } else {
      return new ForgotPasswordUsecase(context.container.get(ResgistryEmployee.EmployeeRepositoryMock))
    }
  })

containerEmployee.bind(ResgistryEmployee.ConfirmForgotPasswordUseCase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === STAGE.TEST) {
      return new ConfirmForgotPasswordUsecase(context.container.get(ResgistryEmployee.EmployeeRepositoryMock))
    } else if (import.meta.env.VITE_STAGE === STAGE.DEV || import.meta.env.VITE_STAGE === STAGE.PROD) {
      return new ConfirmForgotPasswordUsecase(context.container.get(ResgistryEmployee.EmployeeRepositoryHttp))
    } else {
      return new ConfirmForgotPasswordUsecase(context.container.get(ResgistryEmployee.EmployeeRepositoryMock))
    }
  })