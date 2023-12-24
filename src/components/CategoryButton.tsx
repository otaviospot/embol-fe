import IconComponent from "./IconComponent";
import { useNavigate } from "react-router-dom";

interface ICategoryBox {
  key: any;
  id: any;
  name: string;
  icon?: string;
  iconSize?: any;
}

export default function CategoryButton({
  id,
  name,
  icon,
  iconSize,
}: ICategoryBox) {
  const navigate = useNavigate();

  return (
    <button
      className="group flex items-center capitalize w-full text-left text-gray-one text-lg px-6 py-5 border-b border-solid border-stroke-gray hover:bg-blue-one"
      onClick={() => {
        navigate(`/categories/${id}`);
      }}
      key={id}
    >
      {icon && (
        <span className="text-blue-one flex justify-center group-hover:text-white">
          <IconComponent icon={icon} size={iconSize} />
        </span>
      )}
      <h4 className="text-gray-900 pl-2  group-hover:text-white">{name}</h4>
    </button>
  );
}
