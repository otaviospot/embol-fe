import { Link } from "react-router-dom";
import logo from "../assets/images/logo-embol.webp";

export default function Header() {
  return (
    <header className="fixed w-full top-0 bg-white p-5 h-20 flex flex-row shadow-md items-center justify-start z-10">
      <Link className="pr-5 border-r border-stroke-gray" to="/">
        <img alt="Embolmais logo" src={logo} />
      </Link>
      <span className="text-2xl font-sans font-bold pl-5 text-blue-one text">
        Catálogo Digital
      </span>
    </header>
  );
}
