import { createContext } from "react";
import { Server } from "../services/api/server.service";

export type ServersContextType = {
  servers: Server[] | null
  setServers: React.Dispatch<React.SetStateAction<Server[] | null>>
}

export const ServersContext = createContext<ServersContextType | undefined>(undefined)