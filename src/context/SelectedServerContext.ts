import { createContext } from "react";
import { Server } from "../services/api/server.service";

export const SelectedServerContext = createContext<Server | null>(null)