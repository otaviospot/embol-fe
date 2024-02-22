import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import Loading from "../components/Loading";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Product from "../components/Product";
import SectionTitle from "../components/SectionTitle";
import CategoryBox from "../components/CategoryBox";
import { MyContext } from "../MyContext";
import { apiGetHome } from "../services/apiService";

export default function Home() {
  const { allCategories, loading, setLoading, FILES_URL } =
    useContext(MyContext);

  const [homeContent, setHomeContent] = useState<any>([]);

  /* Fetch Back End Single Type */

  useEffect(() => {
    async function getHomeContent() {
      setLoading(true);
      try {
        const backEndHome = await apiGetHome();

        setHomeContent(backEndHome);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getHomeContent();
  }, []);

  /* Slick Carousel Settings */
  const slickSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  /* Slick Carousel Handlers */
  const handleNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const handlePrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const sliderRef: any = useRef();

  return (
    <section className="flex flex-col items-start bg-[#F5F5F5]">
      <div className="h-60 md:h-auto w-full relative">
        {!loading ? (
          homeContent.data?.attributes?.home_slider.data?.map(
            (homeSlider: any) => (
              <Slider ref={sliderRef} {...slickSettings}>
                <div className="h-60 md:h-auto w-full overflow-hidden flex justify-center items-center">
                  <img
                    className="object-cover w-full h-full md:h-auto"
                    alt="Top"
                    src={`${FILES_URL}${homeSlider.attributes.url}`}
                  ></img>
                </div>
              </Slider>
            )
          )
        ) : (
          <Loading loading={loading} />
        )}
      </div>
      <div className="flex flex-col p-5 px-1 md:p-10 box-border items-center w-full">
        <SectionTitle>Navegue por Categoria</SectionTitle>
        <div className="flex flex-row items-stretch flex-wrap w-full">
          {!loading ? (
            allCategories.data?.map((category: any) => {
              if (
                !category.attributes.categorias_pais.data ||
                category.attributes.categorias_pais.data?.length === 0
              ) {
                return (
                  <CategoryBox
                    key={category.id}
                    id={category.id}
                    name={category.attributes.categoryName}
                    icon={category.attributes.iconcat}
                  />
                );
              }
              return null;
            })
          ) : (
            <Loading loading={loading} />
          )}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-5 justify-center p-5">
        {!loading ? (
          homeContent.data?.attributes?.small_banners.map(
            (smallBanner: any) => (
              <div className="w-full md:w-1/3">
                <Link to={smallBanner.single_small_banner_url}>
                  <img
                    src={`${FILES_URL}${smallBanner.single_small_banner.data?.attributes?.url}`}
                    alt="banner"
                  />
                </Link>
              </div>
            )
          )
        ) : (
          <Loading loading={loading} />
        )}
      </div>
      <div className="flex flex-col py-5 px-1 md:py-10 md:px-10 box-border items-center w-full">
        <SectionTitle>Produtos em Destaque</SectionTitle>

        <div className="w-full flex flex-row flex-wrap">
          {!loading ? (
            homeContent.data?.attributes?.produtos.data?.map((product: any) => (
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
        </div>
      </div>
    </section>
  );
}
