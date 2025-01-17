import 'reflect-metadata'
import { Container } from 'inversify' 
import { httpEmployee } from '../http' 
import { AuthRepositoryMock } from '../repositories/auth_repository_mock' 
import { AuthRepositoryHttp } from '../repositories/auth_repository_http'
import { STAGE } from '../../domain/enums/stage_enum'
import { CreateUserOAuthUsecase } from '../../../modules/auth/usecases/create_user_oauth_usecase'


export const RegistryAuth = {
  AxiosAdapter: Symbol.for('AxiosAdapter'),
  AuthRepositoryMock: Symbol.for('AuthRepositoryMock'),
  AuthRepositoryHttp: Symbol.for('AuthRepositoryHttp'),
  CreateUserOAuthUseCase: Symbol.for('CreateUserOAuthUseCase')
}

export const containerAuth = new Container()

containerAuth.bind(RegistryAuth.AxiosAdapter).toConstantValue(httpEmployee)

containerAuth.bind(RegistryAuth.AuthRepositoryMock)
  .to(AuthRepositoryMock)
containerAuth.bind(RegistryAuth.AuthRepositoryHttp)
  .toDynamicValue((context) => {
    return new AuthRepositoryHttp(context.container.get(RegistryAuth.AxiosAdapter))
  })

containerAuth.bind(RegistryAuth.CreateUserOAuthUseCase)
  .toDynamicValue((context) => {
    if (import.meta.env.VITE_STAGE === STAGE.TEST) {
      return new CreateUserOAuthUsecase(context.container.get(RegistryAuth.AuthRepositoryMock))
    } else if (import.meta.env.VITE_STAGE === STAGE.DEV || import.meta.env.VITE_STAGE === STAGE.PROD) {
      return new CreateUserOAuthUsecase(context.container.get(RegistryAuth.AuthRepositoryHttp))
    } else {
      return new CreateUserOAuthUsecase(context.container.get(RegistryAuth.AuthRepositoryMock))
    }
  })

