import { createContext } from "react";
import { Server } from "../services/api/server.service";

export const ServersContexts = createContext<Server[] | null>(null)