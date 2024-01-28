import { createContext } from "react";
import { User } from "../services/api/user.service";

export type LoggedinUserContextType = {
  loggedinUser: User | null,
  setLoggedinUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const LoggedinUserContext = createContext<LoggedinUserContextType | undefined>(undefined)