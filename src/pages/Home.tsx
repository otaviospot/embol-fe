import { useContext } from "react";

import { BarLoader } from "react-spinners";

import MainProductList from "../components/MainProductList";
import Product from "../components/Product";
import { MyContext } from "../MyContext";

export default function Home() {
  const {
    allProducts,
    allCategories,
    handleFilterProductsByCategories,
    handleShowAllProducts,
    loading,
  } = useContext(MyContext);

  return (
    <section className="flex flex-row">
      <div className=" w-[366px] flex flex-col flex-0-auto items-start border-r border-solid border-stroke-gray">
        <h2 className="text-xl w-full font-bold text-blue-one mb-3 flex-grow-0 px-6 py-5 border-b border-solid border-stroke-gray">
          Categorias
        </h2>
        <button
          className="capitalize w-full text-left text-gray-one text-lg px-6 py-5 border-b border-solid border-stroke-gray"
          onClick={() => handleShowAllProducts()}
        >
          Todos os Produtos
        </button>
        {allCategories.data?.map((category: any) => (
          <button
            className="capitalize w-full text-left text-gray-one text-lg px-6 py-5 border-b border-solid border-stroke-gray"
            onClick={() =>
              handleFilterProductsByCategories(
                category.attributes?.categoryName
              )
            }
            key={category.id}
          >
            {category.attributes.categoryName}
          </button>
        ))}
      </div>
      <MainProductList>
        {!loading ? (
          allProducts.data?.map((product: any) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.attributes.name_product}
              image={
                product.attributes.default_image.data?.attributes.formats
                  .thumbnail.url
              }
            />
          ))
        ) : (
          <div className="flex items-center h-60v justify-center p-5 pb-14 gap-2.5 flex-auto">
            <BarLoader loading={loading} color="#ef4444" />
          </div>
        )}
      </MainProductList>
    </section>
  );
}
