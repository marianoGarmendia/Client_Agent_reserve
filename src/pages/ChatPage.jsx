import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import Logo from "../components/Logos";
import ReserveConfirm from "../components/ReserveConfirm";
import SendSVG from "../SVG/SendSVG";
import langchainLogo from "../assets/langchain-logo.png";
import reactLogo from "../assets/react.svg";

import { ChatContext } from "../Context/ChatContext";

const BASE_URL = "https://api-reserve-agent.onrender.com";

function ChatPage() {
  const {
    message,
    setMessage,
    chunkText,
    setMessageUser,
    messageUser,
    threadId,
    setThreadId,
    setConfirmarReserva,
    setArgsToolCall,
    setChunkText,
    setStreamIsDone,
    streamIsDone,
  } = useContext(ChatContext);

  const chatContainer = useRef();

  const handleStream = async (e) => {
    e.preventDefault();

    if (messageUser === "") return;

    const newMessageUser = {
      role: "USER",
      content: messageUser,
    };
    setMessageUser("");
    setChunkText("");
    setMessage((prevMsg) => [...prevMsg, newMessageUser]);
    try {
      const response = await fetch(`${BASE_URL}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessageUser.content,
          threadId: threadId,
        }),
      });
      if (response.status == 200) {
        if (!threadId) {
          const thread_id = response.headers.get("Thread_id");

          setThreadId(thread_id);
        }
        const reader = response.body.getReader();
        let done, value;

        while (!done) {
          ({ done, value } = await reader.read());
          const chunk = new TextDecoder().decode(value);

          // Actualizar la interfaz con cada chunk recibido
          if (chunk !== "[DONE]" && chunk !== "" && chunk !== "undefined") {
            if (chunk.startsWith("{") && chunk.endsWith("}")) {
              const argsToolCallChunk = JSON.parse(chunk);
              setArgsToolCall(argsToolCallChunk);
              setConfirmarReserva(true);

              const AImessage = {
                role: "Tool_call",
                content: (
                  <ReserveConfirm
                    key={uuidv4()}
                    reservationInfo={argsToolCallChunk}
                  ></ReserveConfirm>
                ),
              };
              setMessage((prevMsg) => [...prevMsg, AImessage]);

              return console.log("Confirmar reserva");
            } else {
              setChunkText((prevChunk) => `${prevChunk}${chunk}`);
            }
          }
        }
        if (done) {
          setStreamIsDone(true);
        }
      }
    } catch (error) {
      console.log("Error en la petición: " + error);
    }
  };

  function scrollToBottom() {
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  useEffect(() => {
    if (!streamIsDone) return;
    if (chunkText === "") return;
    if (chunkText.startsWith("{") && chunkText.endsWith("}")) return;
    const AImessage = {
      role: "AI",
      content: chunkText,
    };
    setMessage((prevMsg) => {
      return [...prevMsg, AImessage];
    });
    scrollToBottom();
  }, [streamIsDone, chunkText, setMessage]);

  return (
    <div className="flex w-full flex-col items-center justify-stretch py-2 h-full">
      <Link
        className="absolute left-10 top-4 hover:text-cyan-600"
        to="/instructions"
      >
        {"< "}Info
      </Link>
      <div className="flex flex-col items-center ">
        <div className="flex gap-4 py-2">
          <Logo image={langchainLogo} logo="light" />
          <Logo image={reactLogo} logo="tailwind" />
        </div>
        <h1 className="my-6 text-xl">Reservation Agent</h1>
      </div>
      <form
        onSubmit={handleStream}
        className="h-full w-full md:w-2/3 rounded-md bg-[#21222d] flex flex-col justify-between p-2"
      >
        <div
          ref={chatContainer}
          className="flex-grow  flex flex-col gap-2  w-full overflow-y-scroll scroll_chat box_chat py-2 "
        >
          {message &&
            message.length > 0 &&
            message.map((msg, index) => {
              const className = {
                USER: "flex-row-reverse self-end",
                AI: "p-2 rounded-md bg-[#2f2f2f]",
                tool_call: "",
              };
              if (msg.role === "Tool_call") {
                return msg.content;
              } else {
                return (
                  <div
                    key={index}
                    className={twMerge(
                      "flex gap-2 w-fit p-2 ",
                      className[msg.role]
                    )}
                  >
                    <span className="rounded-full h-fit p-[2px] bg-[#eee]">
                      {msg.role === "AI" ? "🤖" : "🐧"}
                    </span>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                );
              }
            })}
        </div>
        <div className="flex items-center bg-[#282828]  border-[#eee]/60 border-[1px] rounded-md p-2">
          <textarea
            rows={1}
            className="bg-[#282828] resize-none flex items-center flex-1 max-h-40   p-2 w-full placeholder:text-opacity-25 inter-300 placeholder:text-[#eee] focus:outline-none"
            type="text"
            placeholder="Quiero reservar un turno..."
            onChange={(e) => {
              setMessageUser(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleStream(e);
              }
            }}
            name="messageUser"
            value={messageUser}
          />
          <SendSVG />
        </div>
      </form>
    </div>
  );
}

export default ChatPage;
