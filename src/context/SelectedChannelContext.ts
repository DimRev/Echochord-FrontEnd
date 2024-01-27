import { createContext } from "react";
import { TextChannel, VoiceChannel } from "../services/api/server.service";

export type SelectedChannelContextType = {
  selectedTextChannel: TextChannel | null
  selectedVoiceChannel: VoiceChannel | null
  setSelectedTextChannel: React.Dispatch<React.SetStateAction<TextChannel | null>>
  setSelectedVoiceChannel: React.Dispatch<React.SetStateAction<VoiceChannel | null>>
}

export const SelectedChannelContext = createContext<SelectedChannelContextType | undefined>(undefined)