import { ReactNode, createContext, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

type AuthContextDataProps = {
  user: UserDTO;
  signIn: ( email: string, password: string ) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [ user, setUser ] = useState<UserDTO>({} as UserDTO);

  console.log("Usuario logado =>", user);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      console.log("Usuario: ", data.user)
      if(data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
    
  } 

  return(
    <AuthContext.Provider value={{ user , signIn }}>
    {children}
    </AuthContext.Provider>
  )
}