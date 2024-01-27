import { createContext } from "react";
import { Server } from "../services/api/server.service";

export type SelectedServerContextType = {
  selectedServer: Server | null
  setSelectedServer: React.Dispatch<React.SetStateAction<Server | null>>
}

export const SelectedServerContext = createContext<SelectedServerContextType | undefined>(undefined)