import { Link, useLocation } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';
import logo from '../assets/images/logo-embol.webp';

export default function Footer() {
  const location = useLocation();

  return (
    <div
      className={`flex flex-col px-5 py-16 bg-white w-full ${
        location.pathname === '/products' ||
        location.pathname.startsWith('/categories/')
          ? 'md:pl-[386px]'
          : ''
      }`}
    >
      <div
        id="footer-top"
        className="flex flex-col md:flex-row justify-between w-full pb-10"
      >
        <div id="logo-footer" className="flex flex-col">
          <Link className="pr-5" to="/">
            <img alt="Embolmais logo" src={logo} />
          </Link>
          <div className="flex text-[20px] gap-2.5 pt-3 w-full justify-center">
            <a
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-blue-one"
              href="https://www.instagram.com/embolmais/"
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-blue-one"
              href="https://www.embol.com.br/"
            >
              <TbWorldWww />
            </a>
          </div>
        </div>
        <div id="footer-menus" className="flex flex-col md:flex-row gap-10">
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
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://embol.vagas.solides.com.br/"
                >
                  Trabalhe conosco
                </a>
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
        className="flex w-full flex-col md:flex-row pt-10 border-t border-stroke-gray text-xs text-gray-one justify-between"
      >
        <span className="flex justify-center md:justify-start">
          © Embol Mais - All rights reserved
        </span>
        <span className="flex justify-center md:justify-end">
          Created and developed with ❤ by Newbasca{' '}
        </span>
      </div>
    </div>
  );
}
