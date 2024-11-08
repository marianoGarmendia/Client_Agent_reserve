import { useContext } from "react";
import PropTypes from "prop-types";
import { ChatContext } from "../Context/ChatContext";

function ReserveConfirm({ reservationInfo }) {
  const { dia, dni, activity, hora } = reservationInfo;
  const chatContext = useContext(ChatContext);
  if (!chatContext) {
    throw new Error("ChatContext is null");
  }
  const { setStreamIsDone, setConfirmarReserva, threadId, setChunkText } =
    chatContext;

  const handleConfirm = async ({ send }) => {
    setConfirmarReserva(false);
    try {
      const response = await fetch(
        `https://api-reserve-agent.onrender.com/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            threadId: threadId,
            send,
            args: {
              dia,
              dni,
              hora,
              activity,
            },
          }),
        }
      );

      const reader = response.body?.getReader();
      let done, value;

      while (!done) {
        const result = await reader?.read();
        done = result?.done;
        value = result?.value;
        const chunk = new TextDecoder().decode(value);

        // Actualizar la interfaz con cada chunk recibido
        if (chunk !== "[DONE]" && chunk !== "" && chunk !== "undefined") {
          setChunkText((prevChunk) => `${prevChunk}${chunk}`);
        }
      }
      if (done) {
        setStreamIsDone(true);
      }
    } catch (error) {
      console.log("Error en la petición: " + error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 rounded-md w-fit m-auto my-4 bg-[#eee] text-[#171717] p-4">
      <span className="font-bold">¿Desea confirmar la reserva?</span>
      <ul className="flex flex-col gap-2 ">
        <li>DNI: {dni}</li>
        <li>Actividad: {activity}</li>
        <li>Dia: {dia}</li>
        <li>Turno: {hora}</li>
      </ul>
      <div className="flex gap-2">
        <button
          className="p-4 rounded-md text-[#eee] bg-[#171717]"
          onClick={() => handleConfirm({ send: true })}
        >
          Si
        </button>
        <button
          className="p-4 rounded-md text-[#eee] bg-[#171717]"
          onClick={() => handleConfirm({ send: false })}
        >
          No
        </button>
      </div>
    </div>
  );
}
ReserveConfirm.propTypes = {
  reservationInfo: PropTypes.shape({
    dia: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired,
    activity: PropTypes.string.isRequired,
    hora: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReserveConfirm;
