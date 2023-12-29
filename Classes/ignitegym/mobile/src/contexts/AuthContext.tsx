import { createContext } from "react";

import { UserDTO } from "@dtos/UserDTO";

type AuthContextDataProps = {
  user: UserDTO
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);