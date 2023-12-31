import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo-embol.webp";

export default function Footer() {
  const location = useLocation();

  return (
    <div
      className={`flex flex-col px-5 py-16 bg-white w-full ${
        location.pathname === "/products" ||
        location.pathname.startsWith("/categories/")
          ? "pl-[386px]"
          : ""
      }`}
    >
      <div id="footer-top" className="flex justify-between w-full pb-10">
        <div id="logo-footer" className="">
          <Link className="pr-5" to="/">
            <img alt="Embolmais logo" src={logo} />
          </Link>
        </div>
        <div id="footer-menus" className="flex gap-10">
          <nav className="fotter-nav flex flex-col">
            <h4 className="text-gray-one text-lg font-bold mb-5">Menu</h4>
            <ul className="flex flex-col gap-2">
              <li className="text-gray-one hover:text-black">
                <Link to="/">Início</Link>
              </li>
              <li className="text-gray-one hover:text-black">
                <Link to="/products">Produtos</Link>
              </li>
              <li className="text-gray-one hover:text-black">
                <Link to="/quem-somos">Quem Somos</Link>
              </li>
            </ul>
          </nav>
          <nav className="fotter-nav flex flex-col">
            <h4 className="text-gray-one text-lg font-bold mb-5">
              Institucional
            </h4>
            <ul className="flex flex-col gap-2">
              <li className="text-gray-one hover:text-black">
                <Link to="/">Trabalhe conosco</Link>
              </li>
              <li className="text-gray-one hover:text-black">
                <Link to="/">Cidades Atendidas</Link>
              </li>
              <li className="text-gray-one hover:text-black">
                <Link to="/contato">Fale Conosco</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div
        id="footer-bottom"
        className="flex w-full pt-10 border-t border-stroke-gray text-xs text-gray-one justify-between"
      >
        <span>© Embol Mais - All rights reserved</span>
        <span>Created and developed with ❤ by Newbasca </span>
      </div>
    </div>
  );
}
