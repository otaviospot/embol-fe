import { Link } from "react-router-dom";

interface IProduct {
  key: any;
  name: string;
  image?: string;
  id: any;
}

export default function Product({ name, image, id }: IProduct) {
  return (
    <div className={`productItem w-1/5 h-auto relative flex p-2.5`}>
      <div className="productItemContainer w-full relative justify-between self-stretch flex flex-col items-center p-5 border border-solid border-stroke-gray rounded-md hover:shadow-xl hover:border-[color-blue-one]">
        <Link to={`products/${id}`}>
          <div className="flex flex-col items-center relative">
            <div className="producThumb">
              <img
                src={`https://embol-yzffe.ondigitalocean.app${image}`}
                alt={name}
              />
            </div>
            <h3 className="text-center text-sm pt-1">
              <Link to={`products/${id}`}>{name}</Link>
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
