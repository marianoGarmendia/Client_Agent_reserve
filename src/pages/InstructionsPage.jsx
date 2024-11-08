import { Link } from "react-router-dom";
import MailSVG from "../SVG/MailSVG";
import Linkedin from "../SVG/Linkedin";
import Wsp from "../SVG/Wsp";

function InstructionsPage() {
  return (
    <div className="flex flex-col items-center justify-around h-full w-full p-4   gap-4 text-pretty">
      <h1 className="font-bold my-2 text-[18px] text-center">
        Agente de reservación de turnos para centro fitness
      </h1>
      <Link to="/" className="px-2 underline  hover:text-cyan-600">
        Agente {">"}
      </Link>
      <h2>React js - Langgraph - Node js - Firestore</h2>
      <article className="flex flex-col gap-2 items-center w-full p-2 rounded-r-md bg-[#21222d] text-center">
        <h2 className="font-bold my-2 text-[18px]">¿Cómo funciona? 🧠</h2>
        <p>
          A través de lenguaje natural podés pedirle al Agente que querés
          reservar un turno
        </p>
      </article>
      <article className="flex flex-col gap-2 items-center w-full  rounded-md  px-4 py-2 bg-[#21222d] text-center">
        <h2 className="font-bold my-2 text-[18px]">Actividades ⭐</h2>
        <span>Podés reservar para las siguientes actividades</span>
        <ul className="flex flex-col items-start">
          <li>Crossfit</li>
          <li>High Intensity</li>
          <li>Functional</li>
          <li>Woman Strong</li>
          <li>Fit box</li>
          <li>Entre otras...</li>
        </ul>
      </article>
      <article className="flex flex-col w-full gap-2 items-center  rounded-md  px-4 py-2 bg-[#21222d] text-center">
        <h2 className="font-bold my-2 text-[18px]">Horarios 🕑</h2>
        <span>La grilla horaria es de:</span>
        <ul className="flex flex-col items-start">
          <li>Lunes a Sábados</li>
          <li>7:00 a 21:00 hs</li>
        </ul>
      </article>
      <article className="flex flex-col gap-2 items-center w-full  rounded-md  px-4 py-4  bg-[#21222d] text-center">
        <h2 className="font-bold my-2 text-[18px]">
          Empieza una conversación con el agente y pedile que querés reservar un
          turno
        </h2>
        <p className="md:w-1/2">
          Si querés saber más sobre agentes, como construir uno, o querés sumar
          en tu equipo a un Dev que integre nuevas tecnologías GenAi en las
          aplicaciones, escribime y charlemos! 😊
        </p>
        <ul className="flex flex-col items-start gap-2 bg-[#212121] p-4 rounded-md">
          <li className="flex gap-2">
            <MailSVG /> contacto@marianodev.site
          </li>
          <li className="flex gap-2">
            <Linkedin />
            <a
              target="blank"
              href="https://www.linkedin.com/in/mariano-garmendia-dev/"
            >
              Linkedin
            </a>
          </li>
          <li className="flex gap-2">
            <Wsp />
            <a target="blank" href="https://wa.me/+5492214371684">
              {" "}
              Wsp
            </a>
          </li>
        </ul>
      </article>
    </div>
  );
}

export default InstructionsPage;
