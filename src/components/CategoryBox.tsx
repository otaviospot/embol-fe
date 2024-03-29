import { Link } from 'react-router-dom';
import IconComponent from './IconComponent';

interface ICategoryBox {
  key: any;
  id: any;
  name: string;
  icon?: string;
}

export default function CategoryBox({ id, name, icon }: ICategoryBox) {
  return (
    <div
      key={id}
      className="p-2 w-1/2 md:w-1/6 flex-col self-stretch flex items-center justify-center"
    >
      <div className="group grow main-cat-box bg-white w-full flex-col rounded-2xl flex items-center justify-center p-5 border border-stroke-gray transition-all hover:bg-blue-one">
        <Link
          className="w-full flex flex-col items-center"
          to={`categories/${id}`}
        >
          {icon && (
            <span className="text-blue-one transition-all w-1/2 md:w-full flex justify-center items-center group-hover:text-white">
              <IconComponent icon={icon} size={'80%'} />
            </span>
          )}

          <h4 className="text-center transition-all group-hover:text-white mt-5 text-[15px]">
            {name}
          </h4>
        </Link>
      </div>
    </div>
  );
}
