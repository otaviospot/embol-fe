import { Link } from "react-router-dom";
import logo from "../assets/images/logo-embol.webp";
import SeachBox from "./SeachBox";

export default function Header() {
  return (
    <header className="fixed w-full top-0 bg-white p-5 h-20 flex flex-row shadow-md items-center justify-between z-10">
      <div className="flex flex-0-auto items-center">
        <Link className="pr-5 border-r border-stroke-gray" to="/">
          <img alt="Embolmais logo" src={logo} />
        </Link>
        <span className="text-2xl font-sans font-bold pl-5 text-blue-one text">
          Catálogo Digital
        </span>
      </div>

      <div className="flex items-center flex-1 justify-end gap-5">
        <nav className="flex flex-0-auto">
          <ul className="flex flex-row items-center justify-end gap-5">
            <li className="text-blue-one hover:text-black">
              <Link to="/products">Produtos</Link>
            </li>
            <li className="text-blue-one hover:text-black">
              <Link to="/quem-somos">Quem Somos</Link>
            </li>
            <li className="text-blue-one hover:text-black">
              <Link to="/contato">Contato</Link>
            </li>
          </ul>
        </nav>

        <SeachBox />
      </div>
    </header>
  );
}
