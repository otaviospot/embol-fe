import { useContext, useEffect, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

import { useParams, useNavigate } from 'react-router-dom';

import MainProductList from '../components/MainProductList';
import Product from '../components/Product';
import { MyContext } from '../MyContext';

import {
  apiFilterProductsByCategory,
  apiGetSingleCategory,
} from '../services/apiService';

import CategoryButton from '../components/CategoryButton';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';

export default function Products() {
  const {
    allProducts,
    setAllProducts,
    allCategories,
    handleShowAllProducts,
    loading,
    setLoading,
    totalProducts,
    setTotalProducts,
    qtyPerPage,
    currentPage,
    setCurrentPage,
    isCatOpen,
    handleCatOpen,
  } = useContext(MyContext);

  const [categoryContent, setCategoryContent] = useState<any>([]);

  const navigate = useNavigate();

  /* Get category id from URL */
  const { catId } = useParams();

  console.log('catid: ' + catId);

  /* Fetch Back End Single Category Data */
  useEffect(() => {
    const getSingleCat = async (page: number, limit: number) => {
      setLoading(true);
      try {
        const singleCatContent = await apiFilterProductsByCategory(
          catId,
          page,
          limit
        );
        setCategoryContent(await apiGetSingleCategory(catId));
        setAllProducts(singleCatContent);
        setTotalProducts(singleCatContent.meta.pagination.total);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (catId) {
      getSingleCat(currentPage, qtyPerPage);
    } else {
      handleShowAllProducts(currentPage, qtyPerPage);
    }
  }, [catId, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <section className="flex flex-row items-start bg-[#F5F5F5] md:min-h-100v-h">
      <div
        className={`fixed w-full ${
          isCatOpen ? '-translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-[366px] transition-all ease-in-out bottom-[64px] md:bottom-0 h-100v-hm md:h-100v-h flex flex-col flex-0-auto z-10 md:z-[5] items-start border-r border-solid border-stroke-gray overflow-auto bg-white`}
      >
        <h2 className="text-xl w-full items-center flex justify-between font-bold text-blue-one flex-grow-0 px-6 py-5 border-b border-solid border-stroke-gray">
          Categorias
          <button className="md:hidden" onClick={handleCatOpen}>
            <AiOutlineClose />
          </button>
        </h2>
        <button
          className="capitalize w-full text-left text-gray-one text-lg px-6 py-5 border-b border-solid border-stroke-gray hover:bg-blue-one hover:text-white"
          onClick={() => {
            navigate(`/products/`);
            setCurrentPage(1);
          }}
        >
          Todos os Produtos
        </button>
        {allCategories.data?.map((category: any) => {
          if (
            !category.attributes.categorias_pais.data ||
            category.attributes.categorias_pais.data?.length === 0
          ) {
            return (
              <CategoryButton
                id={category.id}
                key={category.id}
                name={category.attributes.categoryName}
                icon={category.attributes.iconcat}
                children={category.attributes.category_children}
                iconSize={32}
              />
            );
          }
          return null;
        })}
      </div>
      <div className="flex w-full flex-auto flex-col p-0 pb-14 md:pl-[366px] bg-[#F5F5F5]">
        <h1 className="text-2xl font-bold text-blue-one p-5">
          {!loading
            ? catId && categoryContent.data?.attributes.categoryName
            : 'Carregando...'}
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
