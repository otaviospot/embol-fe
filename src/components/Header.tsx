import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo-embol.webp';
import SeachBox from './SeachBox';
import { MyContext } from '../MyContext';

import {
  AiOutlineAppstore,
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlineUnorderedList,
} from 'react-icons/ai';

export default function Header() {
  const location = useLocation();
  const { handleCatOpen } = useContext(MyContext);
  const isProdutosPage =
    location.pathname === '/products' ||
    location.pathname.startsWith('/categories');

  return (
    <>
      <header className="relative md:fixed w-full top-0 bg-white p-5 h-20 flex flex-row shadow-md items-center justify-between z-10">
        <div className="flex w-full justify-center md:justify-start md:w-auto flex-0-auto items-center">
          <Link className="md:pr-5 md:border-r border-stroke-gray" to="/">
            <img alt="Embolmais logo" src={logo} />
          </Link>
          <span className="text-2xl font-sans hidden md:flex font-bold pl-5 text-blue-one text">
            Catálogo Digital
          </span>
        </div>

        <div className="flex items-center flex-1 justify-end gap-5">
          <nav className="flex-0-auto hidden md:flex">
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
      <nav className="flex fixed bottom-0 w-full z-20 md:hidden bg-white shadow-sm">
        <button
          onClick={handleCatOpen}
          className={`w-1/4 py-3 flex-col items-center ${
            isProdutosPage ? 'flex' : 'hidden'
          }`}
        >
          <span className="text-xl">
            <AiOutlineUnorderedList />
          </span>
          <span className="text-center text-sm text-blue-one hover:text-black">
            Categorias
          </span>
        </button>
        <Link
          to="/products"
          className={`${
            isProdutosPage ? 'w-1/4' : 'w-1/3'
          } py-3 flex flex-col items-center`}
        >
          <span className="text-xl">
            <AiOutlineAppstore />
          </span>
          <span className="text-center text-sm text-blue-one hover:text-black">
            Produtos
          </span>
        </Link>
        <Link
          to="/quem-somos"
          className={`${
            isProdutosPage ? 'w-1/4' : 'w-1/3'
          } py-3 flex flex-col items-center`}
        >
          <span className="text-xl">
            <AiOutlineInfoCircle />
          </span>
          <span className="text-center text-sm text-blue-one hover:text-black">
            Quem Somos
          </span>
        </Link>
        <Link
          to="/contato"
          className={`${
            isProdutosPage ? 'w-1/4' : 'w-1/3'
          } py-3 flex flex-col items-center`}
        >
          <span className="text-xl">
            <AiOutlineMail />
          </span>
          <span className="text-center text-sm text-blue-one hover:text-black">
            Contato
          </span>
        </Link>
      </nav>
    </>
  );
}
