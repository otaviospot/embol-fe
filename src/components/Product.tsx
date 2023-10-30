import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../MyContext";

interface IProduct {
  key: any;
  name: string;
  image?: string;
  id: any;
  handleAddToCart?: any;
}

export default function Product({
  name,
  image,
  id,
  handleAddToCart,
}: IProduct) {
  const { setOpenCart } = useContext(MyContext);

  return (
    <div className={`productItem w-1/4 h-auto relative flex p-2.5`}>
      <div className="productItemContainer w-full relative justify-between self-stretch flex flex-col items-center p-5 border border-solid border-gray-400 rounded-md hover:shadow-xl hover:border-red-400">
        <Link to={`products/${id}`}>
          <div className="flex flex-col items-center">
            <div className="producThumb">
              <img src={`http://localhost:1337${image}`} alt={name} />
            </div>
            <h3>
              <Link onClick={() => setOpenCart(false)} to={`products/${id}`}>
                {name}
              </Link>
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
