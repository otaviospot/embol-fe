import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../MyContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactMarkdown from "react-markdown";

import { BarLoader } from "react-spinners";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { apiGetSingleProduct } from "../services/apiService";
import CartSection from "../components/CartSection";

/* Interface for single Product object */

interface ISingleProduct {
  data: any;
  attributes: any;
  name: string;
  description: string;
  image_gallery: {
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
    image_gallery: {
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

  /* Context */
  const { loading, setLoading } = useContext(MyContext);

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
      <section className="flex flex-row">
        {!loading ? (
          <>
            <div className="w-1/2 flex-grow-0 flex relative items-center pt-5 pb-10">
              <button
                onClick={handlePrevSlide}
                className="absolute left-0 z-50"
              >
                <AiOutlineLeft className="w-6 h-6 fill-red-600" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-0 z-50"
              >
                <AiOutlineRight className="w-6 h-6 fill-red-600" />
              </button>
              <div className="w-full">
                <Slider ref={sliderRef} {...slickSettings}>
                  {singleProduct.data?.attributes?.image_gallery?.data?.map(
                    (image: any) => (
                      <div
                        className="h-90v !flex justify-center center"
                        key={image.id}
                      >
                        <img
                          src={`https://embol-yzffe.ondigitalocean.app${image.attributes.url}`}
                          alt={image.attributes?.name}
                          className="w-auto h-auto max-h-full"
                        />
                      </div>
                    )
                  )}
                </Slider>
              </div>
            </div>
            <div className="w-1/2 flex-grow flex flex-col border-solid border-l border-gray-400 p-5">
              <h1 className="text-3xl font-bold">
                {singleProduct.data?.attributes?.name_product}
              </h1>
              <span className="text-sm font-bold">
                sku: {singleProduct.data?.attributes?.sku}
              </span>

              <div className="flex flex-col gap-3 mt-5">
                <h2 className="text-md font-semibold">Descrição:</h2>
                <ReactMarkdown>
                  {singleProduct.data?.attributes?.product_description}
                </ReactMarkdown>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center h-60v justify-center p-5 pb-14 gap-2.5 flex-auto">
            <BarLoader loading={loading} color="#ef4444" />
          </div>
        )}
      </section>
    </>
  );
}
