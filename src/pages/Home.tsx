import { useContext } from "react";

import { BarLoader } from "react-spinners";

import MainProductList from "../components/MainProductList";
import Product from "../components/Product";
import { MyContext } from "../MyContext";

export default function Home() {
  const {
    allProducts,
    handleAddToCart,
    allCategories,
    handleFilterProductsByCategories,
    handleShowAllProducts,
    loading,
  } = useContext(MyContext);

  return (
    <section className="flex flex-row">
      <div className="w-52 p-5 flex flex-col flex-0-auto items-start border-r border-solid border-gray-400">
        <h2 className="text-xl font-bold text-red-700 mb-3 flex-grow-0">
          Categorias
        </h2>
        <button
          className="capitalize text-left"
          onClick={() => handleShowAllProducts()}
        >
          Todos os Produtos
        </button>
        {allCategories.data?.map((category: any) => (
          <button
            className="capitalize text-left"
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
              handleAddToCart={handleAddToCart}
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
