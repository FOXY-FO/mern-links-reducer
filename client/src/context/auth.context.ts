import { createContext } from "react"

export const AuthContext = createContext({
  token: null as null | string,
  userId: null as null | number,
  login: (jwtToken: any, id: number) => {},
  logout: () => {},
  isAuthenticated: false,
})
