import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ChatContext = createContext(null);

export function ChatContextProvider({ children }) {
  const [chunkText, setChunkText] = useState("");
  const [streamIsDone, setStreamIsDone] = useState(false);
  const [messageUser, setMessageUser] = useState("");
  const [argsToolCall, setArgsToolCall] = useState({});
  const [confirmarReserva, setConfirmarReserva] = useState(false);
  const [threadId, setThreadId] = useState("");
  const [message, setMessage] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        message,
        setMessage,
        chunkText,
        setChunkText,
        streamIsDone,
        setStreamIsDone,
        messageUser,
        setMessageUser,
        argsToolCall,
        setArgsToolCall,
        confirmarReserva,
        setConfirmarReserva,
        threadId,
        setThreadId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
