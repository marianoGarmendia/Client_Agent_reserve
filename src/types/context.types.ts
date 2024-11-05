import { ReactNode } from "react";

export interface ChatContextProviderProps {
  children: ReactNode;
  name: string;
}

export interface ChatContextType {
  chunkText: string;
  setChunkText: React.Dispatch<React.SetStateAction<string>>;
  streamIsDone: boolean;
  setStreamIsDone: React.Dispatch<React.SetStateAction<boolean>>;
  messageUser: string;
  setMessageUser: React.Dispatch<React.SetStateAction<string>>;
  argsToolCall: object;
  setArgsToolCall: React.Dispatch<React.SetStateAction<object>>;
  confirmarReserva: boolean;
  setConfirmarReserva: React.Dispatch<React.SetStateAction<boolean>>;
  threadId: string;
  setThreadId: React.Dispatch<React.SetStateAction<string>>;
  message: object[];
  setMessage: React.Dispatch<React.SetStateAction<object[]>>;
}
