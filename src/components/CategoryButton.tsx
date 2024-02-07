import style from '../components/categoryButton-style.module.css';

import { useState, useContext } from 'react';
import IconComponent from './IconComponent';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../MyContext';

interface ICategoryBox {
  key: any;
  id: any;
  name: string;
  icon?: string;
  iconSize?: any;
  children?: any;
}

export default function CategoryButton({
  id,
  name,
  icon,
  iconSize,
  children = null,
}: ICategoryBox) {
  const navigate = useNavigate();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [triangleTopDown, setIstriangleTopDown] = useState(style.triangleDown);

  const { setCurrentPage, handleCatOpen } = useContext(MyContext);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
    isDropDownOpen
      ? setIstriangleTopDown(style.triangleDown)
      : setIstriangleTopDown(style.triangleUp);
  };

  return (
    <>
      <button
        className={`group flex items-center capitalize w-full text-left text-gray-one text-md px-6 py-5 border-b border-solid border-stroke-gray hover:bg-blue-one ${
          children.data.length === 0 ? '' : triangleTopDown
        }`}
        onClick={() => {
          if (children.data.length === 0) {
            navigate(`/categories/${id}`);
            setCurrentPage(1);
            handleCatOpen();
          } else {
            toggleDropDown();
          }
        }}
        key={id}
      >
        {icon && (
          <span className="text-blue-one flex justify-center group-hover:text-white">
            <IconComponent icon={icon} size={iconSize} />
          </span>
        )}
        <h4 className="text-gray-900 pl-2 pr-[15px]  group-hover:text-white">
          {name}
        </h4>
      </button>
      {children.data.length > 0 && (
        <div
          className={`flex flex-col ${
            isDropDownOpen
              ? 'opacity-100 max-h-screen overflow-visible'
              : 'opacity-0 max-h-0 overflow-hidden'
          } w-full -z-[1]`}
        >
          <button
            className="group flex pl-10 items-center capitalize w-full text-left text-gray-one text-base px-6 py-2 border-b border-solid border-stroke-gray hover:bg-blue-one"
            onClick={() => {
              navigate(`/categories/${id}`);
              setCurrentPage(1);
              handleCatOpen();
            }}
            key={id}
          >
            <h4 className="text-gray-900 pl-2 group-hover:text-white">
              Ver todos produtos
            </h4>
          </button>
          {children.data?.map((child: any) => (
            <button
              className="group flex pl-10 items-center capitalize w-full text-left text-gray-one text-base px-6 py-2 border-b border-solid border-stroke-gray hover:bg-blue-one"
              onClick={() => {
                navigate(`/categories/${child.id}`);
                setCurrentPage(1);
                handleCatOpen();
              }}
              key={child.id}
            >
              <h4 className="text-gray-900 pl-2  group-hover:text-white">
                {child.attributes.categoryName}
              </h4>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
