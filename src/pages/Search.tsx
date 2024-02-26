import { useContext, useEffect } from 'react';
import Loading from '../components/Loading';
import { useNavigate, Link } from 'react-router-dom';

import MainProductList from '../components/MainProductList';
import Product from '../components/Product';
import { MyContext } from '../MyContext';

import Pagination from '../components/Pagination';

export default function Search() {
  const {
    searchResultsPage,
    loading,
    qtyPerPage,
    currentPage,
    setCurrentPage,
    totalProducts,
    handleSearchProducts,
  } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <section className="flex flex-row items-start bg-[#F5F5F5] min-h-100v-h">
      <div className="flex w-full flex-auto flex-col p-5 pb-14 bg-[#F5F5F5]">
        <MainProductList>
          {(searchResultsPage.data?.length === 0 ||
            searchResultsPage.length === 0) &&
            loading === false && (
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
            )}

          {!loading ? (
            searchResultsPage.data?.map((product: any) => (
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
