/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegistryAuth, containerAuth } from "../../@clean/shared/infra/containers/auth_container"; 
import { CreateUserOAuthUsecase } from "../../@clean/modules/auth/usecases/create_user_oauth_usecase";
import { createContext, PropsWithChildren, useState } from "react";

export type AuthContextType = {
  createUserOAuth: (accessToken: string) => Promise<string | undefined>
  isLogged: boolean
  setIsLogged: (isLogged: boolean) => void
}

const defaultAuthContext: AuthContextType = {
  createUserOAuth: async (accessToken: string) => {
    return ''
  },

  isLogged: false,

  setIsLogged: (value: boolean) => void 0
}

export const AuthContext = createContext(defaultAuthContext)


const createUserOAuthUsecase = containerAuth.get<CreateUserOAuthUsecase>(RegistryAuth.CreateUserOAuthUseCase)

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [isLogged, setIsLogged] = useState(false)

  async function createUserOAuth(accessToken: string): Promise<string | undefined> {
    try {
      const token = await createUserOAuthUsecase.execute(accessToken)
      return token
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }


  
  return (
    <AuthContext.Provider value={{ createUserOAuth, isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  )

}



  
