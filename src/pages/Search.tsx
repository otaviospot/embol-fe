import { useContext, useEffect } from "react";
import Loading from "../components/Loading";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { apiSeachProds } from "../services/apiService";

import MainProductList from "../components/MainProductList";
import Product from "../components/Product";
import { MyContext } from "../MyContext";

import Pagination from "../components/Pagination";

export default function Search() {
  const {
    searchResultsPage,
    setSearchResultsPage,
    loading,
    setLoading,
    qtyPerPage,
    currentPage,
    setCurrentPage,
    totalProducts,
  } = useContext(MyContext);

  const [searchParams] = useSearchParams();
  const singleParam = searchParams.get("s");

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setLoading(true);
    console.log(singleParam);
    setSearchResultsPage([]);
    const getSearchProducts = async (
      param: string,
      page: number,
      limit: number
    ) => {
      try {
        const backEndQueryProducts = await apiSeachProds(
          param ?? "",
          page,
          limit
        );

        setSearchResultsPage(backEndQueryProducts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getSearchProducts(singleParam ?? "", currentPage, qtyPerPage);

    window.scrollTo(0, 0);
  }, [currentPage, qtyPerPage, setSearchResultsPage, singleParam]);

  return (
    <section className="flex flex-row items-start bg-[#F5F5F5] min-h-100v-h">
      <div className="flex w-full flex-auto flex-col p-5 pb-14 bg-[#F5F5F5]">
        {!loading ? (
          <h1 className="text-2xl text-center w-full font-bold text-blue-one p-5">
            Pesquisa: {!loading ? singleParam && singleParam : "Carregando..."}
          </h1>
        ) : (
          <></>
        )}
        <MainProductList>
          {!loading ? (
            (searchResultsPage.data?.length === 0 ||
              searchResultsPage.length === 0) && (
              <div className="flex items-center justify-center flex-col h-60v p-5 pb-14 gap-2.5 flex-auto">
                <h1 className="text-2xl font-bold text-blue-one">
                  Nenhum resultado encontrado
                </h1>
                <Link
                  className="border bg-[transparent] border-solid p-2.5 border-blue-one text-blue-one hover:bg-blue-one hover:text-white"
                  to={`/products`}
                >
                  Veja Todos os Produtos
                </Link>
              </div>
            )
          ) : (
            <></>
          )}

          {!loading ? (
            searchResultsPage.data
              ?.sort((a: any, b: any) =>
                a.attributes.name_product.localeCompare(
                  b.attributes.name_product
                )
              )
              .map((product: any) => (
                <Product
                  key={product.id}
                  id={product.id}
                  name={product.attributes.name_product}
                  image={
                    product.attributes.default_image.data?.attributes.formats
                      .small.url
                  }
                />
              ))
          ) : (
            <Loading loading={loading} />
          )}
        </MainProductList>
        {!loading ? (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalProducts / qtyPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
