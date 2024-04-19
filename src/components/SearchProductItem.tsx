import { useContext } from "react";
import { MyContext } from "../MyContext";
import { Link } from "react-router-dom";
import placeholder from "../assets/images/img_placeholder.webp";

interface IProduct {
  key: any;
  name: string;
  image?: string;
  id: any;
}

export default function SearchProductItem({ name, image, id }: IProduct) {
  const { FILES_URL } = useContext(MyContext);
  return (
    <div className={`productItem w-full h-auto relative flex p-2.5`}>
      <div className="productItemContainer bg-white w-full relative justify-between self-stretch flex flex-col items-center p-5 border border-solid border-stroke-gray rounded-md hover:shadow-xl hover:border-blue-one">
        <Link to={`/products/${id}`}>
          <div className="flex items-center justify-between gap-2.5 relative">
            <div className="producThumb">
              {image ? (
                <img
                  src={`${FILES_URL}${image}`}
                  alt={name}
                  className="w-full max-w-[40px]"
                />
              ) : (
                <img
                  src={placeholder}
                  alt={name}
                  className="w-full max-w-[40px]"
                />
              )}
            </div>
            <h3 className="text-left text-xs text-gray-one">
              <Link to={`/products/${id}`}>{name}</Link>
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
