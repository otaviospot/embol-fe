import { useContext, useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import MainProductList from "../components/MainProductList";
import Product from "../components/Product";
import { MyContext } from "../MyContext";

import {
  apiFilterProductsByCategory,
  apiGetSingleCategory,
} from "../services/apiService";

import CategoryButton from "../components/CategoryButton";
import Loading from "../components/Loading";

export default function Products() {
  const {
    allProducts,
    setAllProducts,
    allCategories,
    handleShowAllProducts,
    loading,
    setLoading,
  } = useContext(MyContext);

  const [categoryContent, setCategoryContent] = useState<any>([]);

  const navigate = useNavigate();

  /* Get category id from URL */
  const { catId } = useParams();

  console.log("catid: " + catId);

  /* Fetch Back End Single Category Data */
  useEffect(() => {
    async function getSingleCat() {
      setLoading(true);
      try {
        const backEndSingleCatProds = await apiFilterProductsByCategory(catId);
        const backEndSingleCat = await apiGetSingleCategory(catId);

        setCategoryContent(backEndSingleCat);

        setAllProducts(backEndSingleCatProds);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (catId) {
      getSingleCat();
      console.log("catid2: " + catId);
    } else {
      handleShowAllProducts();
    }
  }, [catId]);

  return (
    <section className="flex flex-row items-start bg-[#F5F5F5] h-100v-h">
      <div className="fixed w-[366px] h-100v-h flex flex-col flex-0-auto items-start border-r border-solid border-stroke-gray overflow-auto bg-white">
        <h2 className="text-xl w-full font-bold text-blue-one flex-grow-0 px-6 py-5 border-b border-solid border-stroke-gray">
          Categorias
        </h2>
        <button
          className="capitalize w-full text-left text-gray-one text-lg px-6 py-5 border-b border-solid border-stroke-gray hover:bg-blue-one hover:text-white"
          onClick={() => navigate(`/products/`)}
        >
          Todos os Produtos
        </button>
        {allCategories.data?.map((category: any) => (
          <CategoryButton
            id={category.id}
            key={category.id}
            name={category.attributes.categoryName}
            icon={category.attributes.iconcat}
            iconSize={32}
          />
        ))}
      </div>
      <div className="flex flex-auto flex-col p-5 pb-14 pl-[366px] bg-[#F5F5F5]">
        <h1 className="text-2xl font-bold text-blue-one p-5">
          {!loading
            ? catId && categoryContent.data?.attributes.categoryName
            : "Carregando..."}
        </h1>
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
            <Loading loading={loading} />
          )}
        </MainProductList>
      </div>
    </section>
  );
}
