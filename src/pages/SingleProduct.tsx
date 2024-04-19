import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactMarkdown from "react-markdown";
import Loading from "../components/Loading";
import placeholder from "../assets/images/img_placeholder.webp";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { PiVideoFill } from "react-icons/pi";

import { apiGetSingleProduct } from "../services/apiService";
import CartSection from "../components/CartSection";
import DescriptionItem from "../components/DescriptionItem";

/* Interface for single Product object */

interface ISingleProduct {
  data: any;
  attributes: any;
  name: string;
  description: string;
  default_image: {
    data: {
      attributes: {
        formats: {
          large: {
            url: string;
          };
        };
      };
    };
  };
  id: any;
  sku: string;
}

export default function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState<ISingleProduct>({
    data: {},
    attributes: {},
    description: "",
    name: "",
    default_image: {
      data: {
        attributes: {
          formats: {
            large: {
              url: "",
            },
          },
        },
      },
    },
    id: "",
    sku: "",
  });
  /* Get productId from URL */
  const { productId } = useParams();

  const navigate = useNavigate();

  /* Context */
  const { loading, setLoading, FILES_URL } = useContext(MyContext);

  /* State for loading */
  const floatingCart: boolean = true;
  useEffect(() => {
    setLoading(true);
  }, [setLoading]);

  /* Fetch Back End Single Product Data */
  useEffect(() => {
    async function getSingleProduct() {
      try {
        const backEndSingleProduct = await apiGetSingleProduct(productId);
        console.log(loading);
        setSingleProduct(backEndSingleProduct);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getSingleProduct();
  }, [loading, productId, setLoading]);

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
    <>
      <CartSection floatingCart={floatingCart} />
      <section className="flex flex-col md:flex-row relative border-solid border-b border-gray">
        <button
          className="bg-white absolute flex items-center gap-2.5 left-[20px] top-[20px] z-10"
          onClick={() => navigate(-1)}
        >
          <AiOutlineLeft className="text-blue-one" />
          <span className="text-blue-one">Voltar</span>
        </button>
        {!loading ? (
          <>
            <div className="w-full md:w-1/2 flex-grow-0 flex relative items-center pt-10 md:pt-5 md:pb-10">
              <div className="w-full">
                <div className="flex justify-center items-center center">
                  {singleProduct.data?.attributes?.default_image?.data
                    ?.attributes?.url ? (
                    <img
                      src={`${FILES_URL}${singleProduct.data?.attributes?.default_image?.data?.attributes?.url}`}
                      alt={singleProduct.data?.attributes?.name_produc}
                      className="w-full max-w-[600px]"
                    />
                  ) : (
                    <img
                      src={placeholder}
                      alt={singleProduct.data?.attributes?.name_produc}
                      className="w-full max-w-[600px]"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex-grow flex flex-col border-solid border-l border-gray p-5 md:p-10">
              <h1 className="text-3xl font-bold text-blue-one mb-[5px]">
                {singleProduct.data?.attributes?.name_product}
              </h1>
              {singleProduct.data?.attributes?.ncm &&
                singleProduct.data?.attributes?.ncm !== "null" && (
                  <span className="text-sm font-bold">
                    ncm:
                    {singleProduct.data?.attributes?.ncm &&
                      singleProduct.data?.attributes?.ncm}
                  </span>
                )}
              {singleProduct.data?.attributes?.ncm &&
                singleProduct.data?.attributes?.ncm !== "null" && (
                  <span className="text-sm font-bold">
                    Código Interno:
                    {singleProduct.data?.attributes?.productId &&
                      singleProduct.data?.attributes?.productId}
                  </span>
                )}
              <div className="flex flex-col gap-3 mt-5">
                <h2 className="text-xl font-semibold">Descrição:</h2>
                <ReactMarkdown>
                  {singleProduct.data?.attributes?.product_description &&
                    singleProduct.data?.attributes?.product_description !==
                      "null" &&
                    singleProduct.data?.attributes?.product_description}
                </ReactMarkdown>
                {singleProduct.data?.attributes?.externallink_prod &&
                  singleProduct.data?.attributes?.externallink_prod !==
                    "null" && (
                    <div>
                      <a
                        href={singleProduct.data?.attributes?.externallink_prod}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2.5"
                      >
                        <PiVideoFill className="text-[50px] text-blue-one" />
                        <span>Assista ao vídeo do produto</span>
                      </a>
                    </div>
                  )}

                <div className="flex flex-row flex-wrap w-full items-stretch">
                  {singleProduct.data?.attributes?.menor_unidade &&
                    singleProduct.data?.attributes?.menor_unidade !==
                      "null" && (
                      <DescriptionItem
                        label={`Menor Unidade:`}
                        text={singleProduct.data.attributes.menor_unidade}
                        sku={singleProduct.data.attributes.sku_menor_unidade}
                      />
                    )}

                  {singleProduct.data?.attributes?.medida_menor_unidade &&
                    singleProduct.data?.attributes?.medida_menor_unidade !==
                      "null" && (
                      <DescriptionItem
                        label={`Medida da Menor Unidade:`}
                        text={
                          singleProduct.data.attributes.medida_menor_unidade
                        }
                      />
                    )}

                  {singleProduct.data?.attributes?.unidade_intermediaria &&
                    singleProduct.data?.attributes?.unidade_intermediaria !==
                      "null" && (
                      <DescriptionItem
                        label={`Unidade Intermediária:`}
                        text={
                          singleProduct.data?.attributes?.unidade_intermediaria
                        }
                        sku={
                          singleProduct.data.attributes
                            .sku_unidade_intermediaria
                        }
                      />
                    )}

                  {singleProduct.data?.attributes
                    ?.medida_unidade_intermediaria &&
                    singleProduct.data?.attributes
                      ?.medida_unidade_intermediaria !== "null" && (
                      <DescriptionItem
                        label={`Medida da Unidade Intermediária:`}
                        text={
                          singleProduct.data.attributes
                            .medida_unidade_intermediaria
                        }
                      />
                    )}
                  {singleProduct.data?.attributes?.maior_unidade &&
                    singleProduct.data?.attributes?.maior_unidade !==
                      "null" && (
                      <DescriptionItem
                        label={`Maior Unidade:`}
                        text={singleProduct.data?.attributes?.maior_unidade}
                        sku={singleProduct.data.attributes.sku_maior_unidade}
                      />
                    )}
                  {singleProduct.data?.attributes?.medida_maior_unidade &&
                    singleProduct.data?.attributes?.medida_maior_unidade !==
                      "null" && (
                      <DescriptionItem
                        label={`Medida da Maior Unidade:`}
                        text={
                          singleProduct.data?.attributes?.medida_maior_unidade
                        }
                      />
                    )}
                  {singleProduct.data?.attributes?.peso_bruto &&
                    singleProduct.data?.attributes?.peso_bruto !== "null" && (
                      <DescriptionItem
                        label={`Peso Bruto:`}
                        text={singleProduct.data?.attributes?.peso_bruto}
                        isPeso={true}
                      />
                    )}
                  {singleProduct.data?.attributes?.fabricante &&
                    singleProduct.data?.attributes?.fabricante !== "null" && (
                      <DescriptionItem
                        label={`Fabricante:`}
                        text={singleProduct.data?.attributes?.fabricante}
                      />
                    )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loading loading={loading} />
        )}
      </section>
    </>
  );
}
