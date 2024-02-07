import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MyContext } from '../MyContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactMarkdown from 'react-markdown';
import Loading from '../components/Loading';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { apiGetSingleProduct } from '../services/apiService';
import CartSection from '../components/CartSection';

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
    description: '',
    name: '',
    default_image: {
      data: {
        attributes: {
          formats: {
            large: {
              url: '',
            },
          },
        },
      },
    },
    id: '',
    sku: '',
  });
  /* Get productId from URL */
  const { productId } = useParams();

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
      <section className="flex flex-col md:flex-row">
        {!loading ? (
          <>
            <div className="w-full md:w-1/2 flex-grow-0 flex relative items-center pt-5 md:pb-10">
              <div className="w-full">
                <div className="md:h-90v !flex justify-center center">
                  <img
                    src={`${FILES_URL}${singleProduct.data?.attributes?.default_image?.data?.attributes?.url}`}
                    alt={singleProduct.data?.attributes?.name_product}
                    className="w-full md:w-auto h-auto md:max-h-full"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex-grow flex flex-col border-solid border-l border-gray-400 p-5">
              <h1 className="text-3xl font-bold">
                {singleProduct.data?.attributes?.name_product}
              </h1>
              <span className="text-sm font-bold">
                sku: {singleProduct.data?.attributes?.sku}
              </span>

              <div className="flex flex-col gap-3 mt-5">
                <h2 className="text-xl font-semibold">Descrição:</h2>
                <ReactMarkdown>
                  {singleProduct.data?.attributes?.product_description &&
                    singleProduct.data?.attributes?.product_description !==
                      'null' &&
                    singleProduct.data?.attributes?.product_description}
                </ReactMarkdown>

                {singleProduct.data?.attributes?.menor_unidade &&
                  singleProduct.data?.attributes?.menor_unidade !== 'null' && (
                    <>
                      <h2 className="text-md font-semibold">Menor Unidade:</h2>
                      <p>{singleProduct.data.attributes.menor_unidade}</p>
                    </>
                  )}

                {singleProduct.data?.attributes?.unidade_intermediaria &&
                  singleProduct.data?.attributes?.unidade_intermediaria !==
                    'null' && (
                    <>
                      <h2 className="text-md font-semibold">
                        Unidade Intermediária:
                      </h2>
                      <p>
                        {singleProduct.data?.attributes?.unidade_intermediaria}
                      </p>
                    </>
                  )}
                {singleProduct.data?.attributes?.maior_unidade &&
                  singleProduct.data?.attributes?.maior_unidade !== 'null' && (
                    <>
                      <h2 className="text-md font-semibold">Maior Unidade:</h2>
                      <p>{singleProduct.data?.attributes?.maior_unidade}</p>
                    </>
                  )}
                {singleProduct.data?.attributes?.peso_bruto &&
                  singleProduct.data?.attributes?.peso_bruto !== 'null' && (
                    <>
                      <h2 className="text-md font-semibold">Peso Bruto:</h2>
                      <p>{singleProduct.data?.attributes?.peso_bruto}</p>
                    </>
                  )}
                {singleProduct.data?.attributes?.fabricante &&
                  singleProduct.data?.attributes?.fabricante !== 'null' && (
                    <>
                      <h2 className="text-md font-semibold">Fabricante:</h2>
                      <p>{singleProduct.data?.attributes?.fabricante}</p>
                    </>
                  )}
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
